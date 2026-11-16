// frontend/src/components/features/payment/PaymentSuccessModal.tsx
import { FC, useEffect } from 'react';
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Receipt,
  X
} from 'lucide-react';
import { useCredit } from '../../../hooks/useCredit';

export const PaymentSuccessModal: FC = () => {
  const {
    isSuccessModalOpen,
    closeSuccessModal,
    successDetails,
    credits,
    openHistoryModal
  } = useCredit();

  // Đóng khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSuccessModalOpen) {
        closeSuccessModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSuccessModalOpen, closeSuccessModal]);

  if (!isSuccessModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSuccessModal();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B192C] text-slate-900 dark:text-stone-100 rounded-3xl border border-amber-500/40 dark:border-[#D4AF37]/50 shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center overflow-hidden transition-colors">
        {/* Glow ambient vàng Champagne sang trọng */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-amber-500/15 via-emerald-500/10 to-transparent pointer-events-none" />

        {/* Nút đóng góc phải */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            closeSuccessModal();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer z-30"
          title="Close (Esc)"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Biểu tượng ăn mừng */}
        <div className="relative mb-4 mt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-emerald-400/20 border-2 border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>
        </div>

        {/* Tiêu đề & Lời chúc */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-1.5">
          Payment Successful! 🎉
        </h3>
        <p className="text-xs text-slate-500 dark:text-stone-300 mb-5 leading-relaxed">
          Your credits have been successfully activated on Skipli Canvas via Stripe.
        </p>

        {/* Thẻ tóm tắt biên lai (Receipt Summary Card) */}
        <div className="w-full rounded-2xl bg-slate-50 dark:bg-[#070F1E] border border-slate-200/80 dark:border-slate-800 p-4 mb-6 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-stone-400">Purchased Plan</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {successDetails?.planName || 'AI Credit Pack'}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-200/60 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-stone-400">Credits Added</span>
            <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
              +{successDetails?.creditsAdded || 100} credits
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 text-xs">
            <span className="text-slate-500 dark:text-stone-400">Available Balance</span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-amber-600 dark:text-[#D4AF37] text-base">
              <Zap className="w-4 h-4 fill-current text-amber-500" />
              <span>{credits.toFixed(1)} credits</span>
            </div>
          </div>
        </div>

        {/* Nút hành động chính */}
        <div className="w-full space-y-2.5 relative z-30">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeSuccessModal();
            }}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1E3E62] hover:bg-[#28507e] text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-blue-400/30 dark:border-[#D4AF37]/50 active:scale-[0.98] transition"
          >
            <span>Start Building Website Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeSuccessModal();
              openHistoryModal();
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-[#D4AF37] transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>View Credit Ledger History</span>
          </button>
        </div>

        {/* Footer bảo đảm */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 stroke-[1.75]" />
          <span>A payment receipt has been sent to your account email</span>
        </div>
      </div>
    </div>
  );
};

