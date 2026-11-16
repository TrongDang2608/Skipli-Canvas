import { Component } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export class FinalCtaSection extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render() {
    const { language, t } = this.context;

    return (
      <section className="py-24 border-t border-[#E8E6DF]/80 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0B192C] text-white border border-slate-800 text-center relative overflow-hidden shadow-window reveal-item">
            {/* Subtle Ambient Background Flare inside card */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Sub badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-slate-200 mb-6 backdrop-blur-xs select-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{language === 'vi' ? 'Sẵn sàng khởi tạo website?' : 'Ready to shape your site?'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight max-w-2xl mx-auto leading-tight">
              {t.finalCta.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              {t.finalCta.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={APP_CONFIG.authUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#EA580C] text-white text-sm font-semibold hover:bg-[#C2410C] active:scale-98 transition-all shadow-lg group"
              >
                <span>{t.finalCta.button}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* 3 Trust Signals (Phong cách mẫu Skipli) */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'vi' ? '20 Credits ban đầu' : '20 Starter credits'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'vi' ? 'Không cần thẻ tín dụng' : 'No credit card needed'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'vi' ? 'Mã nguồn thuộc về bạn' : '100% Code ownership'}</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
