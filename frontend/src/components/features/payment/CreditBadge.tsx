// frontend/src/components/features/payment/CreditBadge.tsx
import { FC } from 'react';
import { Zap, Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import { useCredit } from '../../../hooks/useCredit';
import { cn } from '../../../utils/cn';

interface CreditBadgeProps {
  className?: string;
  showAddButton?: boolean;
}

export const CreditBadge: FC<CreditBadgeProps> = ({ className, showAddButton = true }) => {
  const { credits, isLoadingBalance, openPricingModal } = useCredit();

  // Xác định 3 trạng thái số dư
  const isOutOfCredits = credits < 1.0;
  const isLowCredits = credits >= 1.0 && credits < 5.0;

  return (
    <button
      type="button"
      onClick={openPricingModal}
      className={cn(
        'group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium select-none cursor-pointer transition-all duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 active:scale-[0.97] touch-manipulation border shadow-2xs',
        // 1. Hết tiền (< 1.0 credit): Cảnh báo đỏ nhạt dịu mắt, tia sét pulse nhẹ
        isOutOfCredits &&
          'bg-rose-50/90 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300/80 dark:border-rose-800/80',
        // 2. Sắp hết tiền (1.0 đến < 5.0 credits): Cảnh báo màu hổ phách Amber ấm áp
        isLowCredits &&
          'bg-amber-50/90 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-700/80',
        // 3. Đầy đủ số dư (>= 5.0 credits): Luxury Champagne Gold chuẩn DNA Skipli Canvas
        !isOutOfCredits &&
          !isLowCredits &&
          'bg-white/80 hover:bg-slate-50 dark:bg-[#0B192C]/90 dark:hover:bg-[#12233c] text-slate-800 dark:text-stone-100 border-slate-200/90 dark:border-slate-800 hover:border-amber-500/40 dark:hover:border-[#D4AF37]/50',
        className
      )}
      title="View credit balance & top up"
    >
      {/* Icon trạng thái */}
      {isLoadingBalance ? (
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600 dark:text-[#D4AF37] shrink-0 stroke-[1.75]" />
      ) : isOutOfCredits ? (
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 stroke-[1.75] animate-pulse" />
      ) : (
        <Zap
          className={cn(
            'w-3.5 h-3.5 shrink-0 stroke-[1.75] transition-transform duration-200 group-hover:scale-110',
            isLowCredits
              ? 'text-amber-600 dark:text-amber-400 fill-amber-500/20'
              : 'text-amber-600 dark:text-[#D4AF37] fill-amber-500/20'
          )}
        />
      )}

      {/* Số dư credits cố định chiều rộng bằng font-mono */}
      <span className="font-mono font-bold tracking-tight text-[11px] sm:text-xs">
        {credits.toFixed(credits % 1 === 0 ? 0 : 1)}
      </span>

      <span className="hidden sm:inline font-sans text-[11px] text-slate-500 dark:text-stone-400 font-medium -ml-0.5">
        credits
      </span>

      {/* Nút cộng nhỏ bên phải */}
      {showAddButton && (
        <span
          className={cn(
            'ml-0.5 p-0.5 rounded-md flex items-center justify-center transition-all duration-150',
            isOutOfCredits
              ? 'bg-rose-200/70 dark:bg-rose-900/40 group-hover:bg-rose-300/80 text-rose-800 dark:text-rose-200'
              : 'bg-amber-500/15 group-hover:bg-amber-500/25 text-amber-800 dark:text-[#D4AF37]'
          )}
        >
          <Plus className="w-2.5 h-2.5 stroke-[2.2]" />
        </span>
      )}
    </button>
  );
};

