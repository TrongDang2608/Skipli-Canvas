// frontend/src/components/features/workspace/StopConfirmModal.tsx
import { FC, useEffect } from 'react';
import { AlertTriangle, X, ShieldCheck, Trash2, ArrowRight } from 'lucide-react';

export type StopActionType = 'stop' | 'new_project' | 'dashboard';

interface StopConfirmModalProps {
  isOpen: boolean;
  actionType: StopActionType;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing?: boolean;
}

export const StopConfirmModal: FC<StopConfirmModalProps> = ({
  isOpen,
  actionType,
  onClose,
  onConfirm,
  isProcessing = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen) return null;

  const getTitle = () => {
    switch (actionType) {
      case 'new_project':
        return 'Cancel & Start New Project?';
      case 'dashboard':
        return 'Cancel & Return to Dashboard?';
      case 'stop':
      default:
        return 'Stop Website Generation?';
    }
  };

  const getConfirmButtonText = () => {
    switch (actionType) {
      case 'new_project':
        return 'Cancel & New Project';
      case 'dashboard':
        return 'Cancel & Return';
      case 'stop':
      default:
        return 'Stop & Refund 1.0 Credit';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B192C] text-slate-900 dark:text-stone-100 rounded-3xl border border-amber-500/40 dark:border-amber-500/30 shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center overflow-hidden transition-colors">
        {/* Glow ambient cam hổ phách cảnh báo */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-transparent pointer-events-none" />

        {/* Nút đóng X góc phải */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer z-20 disabled:opacity-50"
          title="Cancel (Esc)"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Biểu tượng cảnh báo hình tam giác */}
        <div className="relative mb-3.5 mt-1">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
          </div>
        </div>

        {/* Tiêu đề Modal */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
          {getTitle()}
        </h3>

        {/* Lời giải thích chi tiết */}
        <p className="text-xs text-slate-600 dark:text-stone-300 mb-5 leading-relaxed">
          AI is currently generating your website layout. If you stop now:
        </p>

        {/* Khối cảnh báo 2 điểm cốt lõi */}
        <div className="w-full space-y-2.5 mb-6 text-left">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/40 text-xs text-rose-800 dark:text-rose-200">
            <Trash2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">Generation will be cancelled:</strong> Unfinished layout progress will be discarded and not saved to project history.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">100% Credit Refund Guarantee:</strong> The held <strong>1.0 credit</strong> will be automatically refunded to your balance immediately.
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="w-full flex gap-3 relative z-20">
          <button
            type="button"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer disabled:opacity-50"
          >
            Continue Generating
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-amber-600/30 active:scale-95 transition disabled:opacity-50"
          >
            <span>{getConfirmButtonText()}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
