// frontend/src/components/features/payment/CreditHistoryModal.tsx
import { FC, useEffect, useState } from 'react';
import {
  X,
  History,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowDownLeft,
  CircleDollarSign,
  Gift,
  RotateCcw,
  Zap,
  Receipt
} from 'lucide-react';
import { useCredit } from '../../../hooks/useCredit';
import { CreditTransaction } from '../../../types/payment.types';

export const CreditHistoryModal: FC = () => {
  const {
    isHistoryModalOpen,
    closeHistoryModal,
    history,
    pagination,
    isLoadingHistory,
    fetchHistory,
    credits
  } = useCredit();

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tự động tải dữ liệu khi mở modal hoặc đổi trang
  useEffect(() => {
    if (isHistoryModalOpen) {
      fetchHistory(currentPage, 8);
    }
  }, [isHistoryModalOpen, currentPage, fetchHistory]);

  // Đóng khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHistoryModalOpen) {
        closeHistoryModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHistoryModalOpen, closeHistoryModal]);

  if (!isHistoryModalOpen) return null;

  const renderTransactionIcon = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'TOPUP':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <ArrowDownLeft className="w-4 h-4 stroke-[2]" />
          </div>
        );
      case 'INITIAL_GRANT':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 dark:text-[#D4AF37] flex items-center justify-center shrink-0 border border-amber-500/20">
            <Gift className="w-4 h-4 stroke-[1.75]" />
          </div>
        );
      case 'AI_REFUND':
        return (
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
            <RotateCcw className="w-4 h-4 stroke-[1.75]" />
          </div>
        );
      case 'AI_GENERATION':
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-stone-300 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
            <CircleDollarSign className="w-4 h-4 stroke-[1.75]" />
          </div>
        );
    }
  };

  const formatTxDescription = (tx: CreditTransaction) => {
    let desc = tx.description || '';
    if (desc) {
      desc = desc
        .replace(/Gói Nạp Credits AI/gi, 'AI Credits Top Up')
        .replace(/Gói Tín Dụng AI/gi, 'AI Credit Pack')
        .replace(/Gói\s+/gi, 'Plan: ')
        .replace(/Khởi tạo tài khoản/gi, 'Welcome bonus credits')
        .replace(/Tặng \d+ credits tân thủ/gi, 'Welcome bonus credits')
        .replace(/Hoàn tiền/gi, 'Refund')
        .replace(/Tạo website/gi, 'Website Generation')
        .replace(/Trừ tạm/gi, 'Credit Hold');
      return desc;
    }
    switch (tx.type) {
      case 'TOPUP':
        return `Credit Top Up (+${tx.amount} credits)`;
      case 'INITIAL_GRANT':
        return 'Welcome Bonus Credits';
      case 'AI_REFUND':
        return 'Generation Refund';
      case 'AI_GENERATION':
      default:
        return 'AI Website Generation';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeHistoryModal();
        }
      }}
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0B192C] text-slate-900 dark:text-stone-100 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 sm:p-7 flex flex-col transition-colors">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 dark:text-[#D4AF37] flex items-center justify-center border border-amber-500/20">
              <Receipt className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
                Credit Transaction History
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400">
                Detailed ledger of credit top-ups and AI generation usage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-800 dark:text-[#D4AF37] border border-amber-500/30 text-xs font-mono font-bold">
              <Zap className="w-3 h-3 fill-current" />
              {credits.toFixed(1)} credits
            </span>

            <button
              type="button"
              onClick={closeHistoryModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* Danh sách giao dịch dạng Sổ cái Financial Ledger */}
        <div className="flex-1 overflow-y-auto min-h-[320px] max-h-[420px] pr-1">
          {isLoadingHistory ? (
            <div className="h-full flex flex-col items-center justify-center py-16 gap-2 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500 stroke-[2]" />
              <span className="text-xs font-medium">Loading transaction ledger...</span>
            </div>
          ) : history.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center gap-2 text-slate-400">
              <History className="w-8 h-8 stroke-[1.5] text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-medium">No transaction records found yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {history.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <div
                    key={tx.id}
                    className="py-3 sm:py-3.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-900/30 px-2 rounded-xl transition"
                  >
                    {/* Cột trái: Icon + Mô tả + Ngày giờ */}
                    <div className="flex items-center gap-3 min-w-0">
                      {renderTransactionIcon(tx.type)}
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 dark:text-stone-100 truncate text-xs sm:text-sm">
                          {formatTxDescription(tx)}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-stone-400 font-mono mt-0.5">
                          {new Date(tx.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Cột phải: Số credits biến động & Số dư sau GD */}
                    <div className="text-right shrink-0">
                      <p
                        className={`font-mono font-extrabold text-xs sm:text-sm ${
                          isPositive
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-600 dark:text-stone-300'
                        }`}
                      >
                        {isPositive ? `+${tx.amount}` : tx.amount} credits
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-stone-400 font-mono mt-0.5">
                        Bal: {tx.balanceAfter.toFixed(1)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Thanh phân trang ở đáy */}
        {pagination && pagination.totalPages > 1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-stone-400 mt-2">
            <span className="font-mono text-[11px]">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} transactions)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1 || isLoadingHistory}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.75]" />
              </button>
              <button
                type="button"
                disabled={currentPage >= pagination.totalPages || isLoadingHistory}
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.75]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

