import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';

export class Footer extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render(): ReactNode {
    const { t } = this.context;

    return (
      <footer className="border-t border-[#E8E6DF] bg-[#FAF9F5]/90 text-[#6B6960] py-12 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E8E6DF]">
            {/* Logo & Tagline */}
            <div className="space-y-2 select-none">
              <div className="flex items-center gap-2">
                <img
                  src="/Skipli_logo.png"
                  alt="Skipli Logo"
                  className="h-7 w-auto object-contain shrink-0"
                />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-[#0B192C]">
                    Skipli
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono">
                    Canvas
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#8C8A81] max-w-sm">
                {t.footer.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#6B6960]">
              <a href="#how-it-works" className="hover:text-[#141413] transition-colors">
                {t.nav.howItWorks}
              </a>
              <a href="#features" className="hover:text-[#141413] transition-colors">
                {t.nav.features}
              </a>
              <a href="#templates" className="hover:text-[#141413] transition-colors">
                {this.context.language === 'vi' ? 'Mẫu website' : 'Templates'}
              </a>
              <a href="#comparison" className="hover:text-[#141413] transition-colors">
                {t.nav.comparison}
              </a>
              <a href="#pricing" className="hover:text-[#141413] transition-colors">
                {t.nav.pricing}
              </a>
              <a href={APP_CONFIG.authUrl} className="hover:text-[#141413] transition-colors">
                {t.nav.signIn}
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#8C8A81]">
            <span>{t.footer.rights}</span>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#141413] cursor-pointer">{t.footer.terms}</span>
              <span>•</span>
              <span className="hover:text-[#141413] cursor-pointer">{t.footer.privacy}</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
