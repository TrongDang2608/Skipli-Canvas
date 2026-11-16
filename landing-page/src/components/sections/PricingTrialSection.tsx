import { Component } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

export class PricingTrialSection extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render() {
    const { t } = this.context;

    const features = [
      t.pricing.feature1,
      t.pricing.feature2,
      t.pricing.feature3,
      t.pricing.feature4,
      t.pricing.feature5,
    ];

    return (
      <section id="pricing" className="py-24 border-t border-[#E8E6DF]/80 bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with reveal */}
          <div className="text-center max-w-2xl mx-auto mb-14 reveal-item">
            <span className="text-xs font-mono font-medium text-[#6B6960] tracking-wide uppercase">
              {t.pricing.sectionTag}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B6960] leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </div>

          {/* Pricing Card with reveal */}
          <div className="relative p-6 sm:p-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#141413] shadow-lifted hover:shadow-window transition-all duration-300 reveal-item">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E8E6DF] gap-4">
              <div>
                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E6DF] text-[#141413] mb-2">
                  {t.pricing.cardBadge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#141413] font-normal">
                  {t.pricing.planName}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6960] mt-1">
                  {t.pricing.planDesc}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="flex items-baseline gap-1 sm:justify-end">
                  <span className="font-serif text-4xl sm:text-5xl font-normal text-[#141413]">
                    {t.pricing.planPrice}
                  </span>
                  <span className="text-xs font-mono text-[#6B6960]">{t.pricing.planSuffix}</span>
                </div>
                <span className="text-xs font-mono font-medium text-[#8C8A81]">
                  {t.pricing.planPeriod}
                </span>
              </div>
            </div>

            {/* Features list */}
            <ul className="py-7 space-y-3.5">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="p-0.5 rounded bg-[#FAF9F5] border border-[#E8E6DF] text-[#141413] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xs sm:text-sm text-[#141413] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-5 border-t border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6B6960]">
                <ShieldCheck className="w-4 h-4 text-[#141413] stroke-[1.5]" />
                <span>{t.pricing.disclaimer}</span>
              </div>

              <a
                href={APP_CONFIG.authUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#141413] text-[#FAF9F5] text-xs font-semibold hover:bg-[#2A2A28] active:scale-98 transition-all shadow-soft group"
              >
                <span>{t.pricing.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
