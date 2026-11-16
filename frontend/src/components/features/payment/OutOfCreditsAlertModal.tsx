// frontend/src/components/features/payment/OutOfCreditsAlertModal.tsx
import { FC, useEffect } from 'react';
import { Zap, X, Sparkles } from 'lucide-react';
import { useCredit } from '../../../hooks/useCredit';

export const OutOfCreditsAlertModal: FC = () => {
  const {
    isOutOfCreditsModalOpen,
    closeOutOfCreditsModal,
    openPricingModal,
    credits
  } = useCredit();

  // Đóng khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOutOfCreditsModalOpen) {
        closeOutOfCreditsModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOutOfCreditsModalOpen, closeOutOfCreditsModal]);

  if (!isOutOfCreditsModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeOutOfCreditsModal();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B192C] text-slate-900 dark:text-stone-100 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center transition-colors">
        {/* Nút đóng góc phải */}
        <button
          type="button"
          onClick={closeOutOfCreditsModal}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* Biểu tượng tia sét cảnh báo nhẹ nhàng */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center mb-4 shadow-xs">
          <Zap className="w-7 h-7 stroke-[1.75] fill-amber-500/20" />
        </div>

        {/* Tiêu đề & nội dung */}
        <h3 className="text-lg font-extrabold text-slate-950 dark:text-white mb-2 tracking-tight">
          You've Run Out of AI Credits
        </h3>

        <p className="text-xs text-slate-600 dark:text-stone-300 mb-5 leading-relaxed">
          Each website generation or AI layout refinement requires at least <strong>1.0 credit</strong>.
          Your current balance is <span className="font-mono font-bold text-rose-500">{credits.toFixed(1)} credits</span>.
        </p>

        {/* Hộp gợi ý ngắn gọn */}
        <div className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-stone-400 text-left mb-6 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[1.75]" />
          <span>
            Top up with <strong>Creator Pack ($9.99)</strong> to instantly get <strong>+100 credits</strong> and build without limits.
          </span>
        </div>

        {/* 2 Nút lựa chọn */}
        <div className="w-full flex gap-3">
          <button
            type="button"
            onClick={closeOutOfCreditsModal}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Maybe Later
          </button>

          <button
            type="button"
            onClick={() => {
              closeOutOfCreditsModal();
              openPricingModal();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1E3E62] hover:bg-[#28507e] text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-blue-400/30 dark:border-[#D4AF37]/50 active:scale-[0.98] transition"
          >
            <Zap className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>Top Up Credits Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
