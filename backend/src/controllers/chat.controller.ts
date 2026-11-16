import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.types';
import { goclawService, ChatCompletionOptions } from '../services/goclaw.service';
import { sessionService } from '../services/session.service';
import { quotaService, HoldCreditResult } from '../services/quota.service';
import { BASE_HOLD_CREDITS } from '../config/pricing.config';
import { isValidDeliverableHtml } from '../utils/html-validator.util';
import { ChatRequestDto } from '../dtos/chat.dto';
import { Session } from '../models/session.model';

export class ChatController {
  public sendChat = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { prompt, sessionId } = req.body as ChatRequestDto;
    const userId = req.user?.id;
    const requestStartTime = Date.now();

    // =========================================================================
    // PHA 1: KIỂM TRA SỐ DƯ & HOLD CREDIT TRƯỚC KHI GỌI AI
    // Chặn đứng tại đây nếu người dùng không đủ hạn ngạch (trả 402 Payment Required)
    // =========================================================================
    let holdResult: HoldCreditResult | null = null;
    let isClientAborted = false;
    let isSettledOrRefunded = false;

    if (userId) {
      try {
        const targetSessionId =
          sessionId && typeof sessionId === 'string' && sessionId.trim()
            ? sessionId.trim()
            : 'pending_session';
        holdResult = await quotaService.holdCredit(
          userId,
          targetSessionId,
          BASE_HOLD_CREDITS
        );
      } catch (holdErr: any) {
        if (holdErr?.message?.includes('INSUFFICIENT_CREDITS')) {
          res.status(402).json({
            success: false,
            error: 'INSUFFICIENT_CREDITS',
            message: 'Insufficient credits. Please top up your credits to continue using AI.',
          });
          return;
        }
        next(holdErr);
        return;
      }
    }

    // Lắng nghe sự kiện ngắt kết nối từ client (bấm Stop, New Project, đóng tab)
    const onCloseHandler = async () => {
      if (!res.writableEnded) {
        isClientAborted = true;
        if (userId && holdResult && !isSettledOrRefunded) {
          isSettledOrRefunded = true;
          try {
            console.warn(`[ChatController] Client ngắt kết nối (Stop / Abort). Hoàn trả 100% credit cho vé hold ${holdResult.holdId}`);
            await quotaService.refundCredit(userId, holdResult.holdId, 'CLIENT_ABORTED_OR_STOPPED');
          } catch (refundErr) {
            console.error('[ChatController] Lỗi khi hoàn credit do client abort:', refundErr);
          }
        }
      }
    };
    req.on('close', onCloseHandler);

    try {
      let contextOptions: ChatCompletionOptions = {};
      let currentSession: Session | null = null;

      if (userId && sessionId && typeof sessionId === 'string' && sessionId.trim()) {
        try {
          const sessionCtx = await sessionService.getSessionContext(userId, sessionId.trim());
          if (sessionCtx) {
            currentSession = sessionCtx.session;
            contextOptions = {
              history: sessionCtx.history,
              codeUrl: sessionCtx.codeUrl,
              sessionTitle: sessionCtx.session?.title,
            };
          }
        } catch (ctxErr) {
          console.warn('[ChatController] Failed to fetch session context:', ctxErr);
        }
      }

      // =========================================================================
      // PHA 2: GỌI LLM SINH MÃ NGUỒN WEB
      // =========================================================================
      const response = await goclawService.chatCompletion(prompt, contextOptions);
      const rawContent = response.text;
      const extractedHtml = goclawService.extractHtml(rawContent, requestStartTime);
      const fullContent = goclawService.cleanTextResponse(rawContent, prompt);

      // =========================================================================
      // PHA 3: KIỂM ĐỊNH TÍNH TOÀN VẸN HTML (ARTIFACT VALIDATION)
      // Nếu AI sinh HTML rác / lỗi hệ thống -> Chặn đứng ngay và kích hoạt hoàn tiền
      // =========================================================================
      const isSystemError = rawContent.includes('<Error>') && rawContent.includes('<Code>');
      if (isSystemError) {
        throw new Error('AI_FAILED_TO_GENERATE_VALID_HTML: AI returned system error payload');
      }

      if (extractedHtml && !isValidDeliverableHtml(extractedHtml)) {
        throw new Error('AI_FAILED_TO_GENERATE_VALID_HTML: Output HTML is malformed or contains error tags');
      }

      let savedSessionId = sessionId;
      let savedVersion = currentSession?.versionCount
        ? `v1.${currentSession.versionCount}`
        : 'v1.1';
      let presignedUrl: string | undefined;
      let userMessageId: string | undefined;
      let aiMessageId: string | undefined;

      // =========================================================================
      // PHA 4: LƯU S3 DELIVERY PROOF & AUTO-RETRY
      // Nếu client đã ngắt kết nối (Stop / Abort) -> Hủy lưu phiên và không quyết toán
      // =========================================================================
      if (isClientAborted) {
        console.warn(`[ChatController] Bỏ qua Pha 4 & 5 vì client đã hủy (Abort / Stop).`);
        return;
      }

      if (userId) {
        const saved = await sessionService.saveChatTurn(
          userId,
          sessionId || '',
          prompt,
          fullContent,
          extractedHtml
        );
        savedSessionId = saved.session.id;
        savedVersion =
          saved.aiMsg.version ||
          (saved.session.versionCount ? `v1.${saved.session.versionCount}` : 'v1.1');
        presignedUrl = saved.session.presignedUrl;
        userMessageId = saved.userMsg?.id;
        aiMessageId = saved.aiMsg?.id;
      }

      // =========================================================================
      // PHA 5: QUYẾT TOÁN HẠN NGẠCH (DYNAMIC SETTLEMENT HOẶC BẢO TRỢ CAPPED AT 0)
      // Chỉ quyết toán khi sản phẩm website đã được giao hàng thành công trọn vẹn
      // =========================================================================
      let creditsRemaining: number | undefined;
      if (userId && holdResult && !isClientAborted) {
        isSettledOrRefunded = true;
        const tokensUsed =
          response.totalTokens ||
          Math.max(20000, Math.ceil(((rawContent?.length || 0) + (prompt?.length || 0)) / 3.5));
        const settleResult = await quotaService.settleCredit(
          userId,
          holdResult.holdId,
          tokensUsed
        );
        creditsRemaining = settleResult.newBalance;
      }

      res.status(200).json({
        success: true,
        data: {
          sessionId: savedSessionId,
          version: savedVersion,
          fullContent,
          extractedHtml: '',
          presignedUrl: presignedUrl || '',
          userMessageId: userMessageId || '',
          aiMessageId: aiMessageId || '',
          creditsRemaining,
        },
      });
    } catch (error: unknown) {
      // =========================================================================
      // CƠ CHẾ BẢO VỆ NGƯỜI DÙNG: HOÀN TIỀN 100% KHI CÓ BẤT KỲ LỖI NÀO PHÁT SINH
      // =========================================================================
      if (userId && holdResult && !isSettledOrRefunded) {
        isSettledOrRefunded = true;
        try {
          const reason = error instanceof Error ? error.message : 'UNKNOWN_CHAT_PIPELINE_ERROR';
          console.warn(`[ChatController] Kích hoạt hoàn tiền 100% cho vé hold ${holdResult.holdId} do lỗi:`, reason);
          await quotaService.refundCredit(userId, holdResult.holdId, reason);
        } catch (refundErr) {
          console.error('[ChatController] Lỗi khi thực hiện hoàn tiền tự động:', refundErr);
        }
      }

      if (!isClientAborted) {
        next(error);
      }
    } finally {
      req.removeListener('close', onCloseHandler);
    }
  };

  /**
   * Endpoint dừng chat chủ động từ client (gọi khi bấm nút Stop hoặc tạo project mới)
   * POST /api/chat/stop
   */
  public stopChat = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    try {
      const refundResult = await quotaService.refundLatestPendingHold(userId, 'USER_EXPLICIT_STOP_BUTTON');
      res.status(200).json({
        success: true,
        data: {
          refunded: Boolean(refundResult),
          newBalance: refundResult?.newBalance
        }
      });
    } catch (err) {
      next(err);
    }
  };
}

export const chatController = new ChatController();
