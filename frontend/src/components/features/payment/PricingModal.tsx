// frontend/src/components/features/payment/PricingModal.tsx
import { FC, useState, useEffect } from 'react';
import {
  X,
  Check,
  Zap,
  ShieldCheck,
  CreditCard,
  Loader2,
  Lock,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useCredit } from '../../../hooks/useCredit';
import { cn } from '../../../utils/cn';

export const PricingModal: FC = () => {
  const {
    isPricingModalOpen,
    closePricingModal,
    plans,
    isLoadingPlans,
    startCheckout,
    credits
  } = useCredit();

  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPricingModalOpen && !loadingPlanId) {
        closePricingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPricingModalOpen, loadingPlanId, closePricingModal]);

  if (!isPricingModalOpen) return null;

  // Lọc chỉ hiển thị các gói cho phép mua (bỏ gói starter miễn phí)
  const purchasablePlans = plans
    .filter((p) => p.isPurchasable && p.priceCents > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handleSelectPlan = async (planId: string) => {
    setLoadingPlanId(planId);
    setErrorMessage(null);
    try {
      await startCheckout(planId);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.error || err.message || 'Unable to connect to Stripe checkout. Please try again.'
      );
      setLoadingPlanId(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loadingPlanId) {
          closePricingModal();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B192C] text-slate-900 dark:text-stone-100 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-colors duration-200">
        {/* Glow ambient trên đỉnh modal */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        {/* 1. Header Modal */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-[#12233c] border border-slate-200/90 dark:border-slate-700/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src="/Skipli_logo.png"
                alt="Skipli Logo"
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Top Up AI Credits
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-stone-300 border border-slate-200 dark:border-slate-700">
                  Balance: {credits.toFixed(1)} credits
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                One-time payment via Stripe • No recurring charges • Credits never expire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={loadingPlanId !== null}
              onClick={closePricingModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer disabled:opacity-50"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* 2. Nội dung danh sách gói cước */}
        <div className="relative z-10 p-5 sm:p-7 overflow-y-auto max-h-[75vh]">
          {/* Thông báo lỗi nếu có */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
              <span className="shrink-0 text-base leading-none">⚠️</span>
              <span className="font-medium leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {isLoadingPlans ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2.5 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 stroke-[1.75]" />
              <span className="text-xs font-medium">Connecting to secure pricing plans...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {purchasablePlans.map((plan) => {
                const isProStudio = plan.id === 'pro_studio';
                const isLoadingThis = loadingPlanId === plan.id;
                const unitPrice = (plan.priceUsd / plan.credits).toFixed(3);

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      'relative rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between border',
                      isProStudio
                        ? 'bg-gradient-to-b from-amber-500/10 via-amber-500/[0.03] to-transparent dark:from-[#D4AF37]/15 dark:via-[#D4AF37]/[0.03] dark:to-transparent border-amber-500/50 dark:border-[#D4AF37]/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20'
                        : 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    )}
                  >
                    {/* Badge góc nổi bật */}
                    {isProStudio && (
                      <div className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xs">
                        <Flame className="w-3 h-3 fill-current text-amber-400" />
                        <span>Best Value • Save 17%</span>
                      </div>
                    )}

                    <div>
                      {/* Tiêu đề gói */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Zap
                            className={cn(
                              'w-4 h-4 stroke-[1.75]',
                              isProStudio ? 'text-amber-500 fill-amber-500/20' : 'text-slate-600 dark:text-stone-300'
                            )}
                          />
                          <h4 className="font-extrabold text-base text-slate-950 dark:text-white">
                            {plan.name}
                          </h4>
                        </div>
                      </div>

                      {/* Mô tả ngắn */}
                      <p className="text-xs text-slate-500 dark:text-stone-400 mb-4 min-h-[34px] leading-relaxed">
                        {plan.description || 'Premium AI credits for professional website generation.'}
                      </p>

                      {/* Giá tiền & số credit */}
                      <div className="p-3.5 rounded-xl bg-white dark:bg-[#070F1E] border border-slate-200/80 dark:border-slate-800/80 mb-5">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white font-mono">
                              ${plan.priceUsd.toFixed(2)}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 uppercase">
                              USD
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-extrabold text-sm text-amber-600 dark:text-[#D4AF37] block">
                              +{plan.credits} Credits
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ~${unitPrice}/credit
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Danh sách quyền lợi chi tiết */}
                      <ul className="space-y-2.5 mb-6 text-xs text-slate-700 dark:text-stone-300 font-medium">
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2]" />
                          <span>Generate ~{plan.credits} websites or prompt refinements</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2]" />
                          <span>Export standalone HTML/CSS/Tailwind source code</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2]" />
                          <span>Instant live preview via secure presigned URL</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2]" />
                          <span className="font-semibold text-slate-900 dark:text-white">Permanent credits (Never expire)</span>
                        </li>
                      </ul>
                    </div>

                    {/* Nút hành động */}
                    <button
                      type="button"
                      disabled={loadingPlanId !== null}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={cn(
                        'w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs select-none',
                        isProStudio
                          ? 'bg-[#1E3E62] hover:bg-[#28507e] text-white border border-blue-400/30 dark:border-[#D4AF37]/50'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      )}
                    >
                      {isLoadingThis ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin stroke-[2]" />
                          <span>Redirecting to Stripe...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 stroke-[1.75]" />
                          <span>Purchase ${plan.priceUsd.toFixed(2)}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Footer bảo chứng bảo mật PCI-DSS */}
        <div className="relative z-10 px-5 sm:px-7 py-4 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 stroke-[1.75]" />
            <span>256-bit SSL Encryption • PCI-DSS Level 1 Certified Secure Payment</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

