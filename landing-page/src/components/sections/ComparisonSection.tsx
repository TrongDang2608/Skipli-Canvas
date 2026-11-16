import { Component } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Check, Minus, Clock, Sliders, Smartphone, Code2 } from 'lucide-react';

export class ComparisonSection extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render() {
    const { t } = this.context;

    const comparisonRows = [
      {
        icon: Clock,
        traditional: t.comparison.point1Traditional,
        skipli: t.comparison.point1Skipli,
      },
      {
        icon: Sliders,
        traditional: t.comparison.point2Traditional,
        skipli: t.comparison.point2Skipli,
      },
      {
        icon: Smartphone,
        traditional: t.comparison.point3Traditional,
        skipli: t.comparison.point3Skipli,
      },
      {
        icon: Code2,
        traditional: t.comparison.point4Traditional,
        skipli: t.comparison.point4Skipli,
      },
    ];

    return (
      <section id="comparison" className="py-24 border-t border-[#E8E6DF]/80 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with reveal */}
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-item">
            <span className="text-xs font-mono font-medium text-[#6B6960] tracking-wide uppercase">
              {t.comparison.sectionTag}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              {t.comparison.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B6960] leading-relaxed">
              {t.comparison.subtitle}
            </p>
          </div>

          {/* 2-Column Comparison Table / Cards with reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 reveal-item">
            {/* Column 1: Traditional Way */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5]/90 border border-[#E8E6DF] flex flex-col justify-between hover:border-[#D5D3CA] transition-all duration-300">
              <div>
                <div className="pb-5 border-b border-[#E8E6DF] mb-6">
                  <span className="text-xs font-mono text-[#8C8A81]">Trước đây</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#141413] mt-1 font-normal">
                    {t.comparison.traditionalTitle}
                  </h3>
                  <p className="text-xs text-[#6B6960] mt-1">
                    {t.comparison.traditionalSubtitle}
                  </p>
                </div>

                <ul className="space-y-4">
                  {comparisonRows.map((row, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="p-1 rounded bg-[#EFECE3] text-[#8C8A81] shrink-0 mt-0.5">
                        <Minus className="w-3.5 h-3.5 stroke-[2]" />
                      </span>
                      <span className="text-xs sm:text-sm text-[#6B6960] leading-relaxed">
                        {row.traditional}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Skipli Canvas */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#141413] shadow-lifted relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              {/* Top accent badge */}
              <div className="absolute top-0 right-0 bg-[#141413] text-[#FAF9F5] text-[10px] font-mono font-semibold px-3 py-1 rounded-bl-lg">
                Skipli Canvas
              </div>

              <div>
                <div className="pb-5 border-b border-[#E8E6DF] mb-6">
                  <span className="text-xs font-mono text-[#6B6960]">Quy trình trực quan</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#141413] mt-1 font-normal">
                    {t.comparison.skipliTitle}
                  </h3>
                  <p className="text-xs text-[#6B6960] mt-1">
                    {t.comparison.skipliSubtitle}
                  </p>
                </div>

                <ul className="space-y-4">
                  {comparisonRows.map((row, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="p-1 rounded bg-[#141413] text-[#FAF9F5] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xs sm:text-sm text-[#141413] font-medium leading-relaxed">
                        {row.skipli}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
