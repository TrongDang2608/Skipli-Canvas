import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';

interface NavbarState {
  mobileMenuOpen: boolean;
}

export class Navbar extends Component<{}, NavbarState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: NavbarState = {
    mobileMenuOpen: false,
  };

  private toggleLanguage = (): void => {
    const { language, setLanguage } = this.context;
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  private toggleMobileMenu = (): void => {
    this.setState((prev) => ({ mobileMenuOpen: !prev.mobileMenuOpen }));
  };

  private closeMobileMenu = (): void => {
    this.setState({ mobileMenuOpen: false });
  };

  render(): ReactNode {
    const { language, t } = this.context;
    const { mobileMenuOpen } = this.state;

    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#E8E6DF]/80 bg-[#FAF9F5]/85 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group select-none">
            <img
              src="/Skipli_logo.png"
              alt="Skipli Logo"
              className="h-8 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#0B192C]">
                Skipli
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono">
                Canvas
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B6960]">
            <a
              href="#how-it-works"
              className="hover:text-[#141413] transition-colors duration-150"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#features"
              className="hover:text-[#141413] transition-colors duration-150"
            >
              {t.nav.features}
            </a>
            <a
              href="#templates"
              className="hover:text-[#141413] transition-colors duration-150"
            >
              {language === 'vi' ? 'Mẫu website' : 'Templates'}
            </a>
            <a
              href="#comparison"
              className="hover:text-[#141413] transition-colors duration-150"
            >
              {t.nav.comparison}
            </a>
            <a
              href="#pricing"
              className="hover:text-[#141413] transition-colors duration-150"
            >
              {t.nav.pricing}
            </a>
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={this.toggleLanguage}
              title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-[#6B6960] hover:text-[#141413] bg-white border border-[#E8E6DF] rounded-md hover:border-[#D5D3CA] transition-all cursor-pointer shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Sign In link */}
            <a
              href={APP_CONFIG.authUrl}
              className="text-xs font-medium text-[#6B6960] hover:text-[#141413] px-2.5 py-1.5 transition-colors"
            >
              {t.nav.signIn}
            </a>

            {/* Primary CTA */}
            <a
              href={APP_CONFIG.authUrl}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#141413] text-[#FAF9F5] hover:bg-[#2A2A28] active:scale-98 transition-all shadow-xs"
            >
              <span>{t.nav.getStarted}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={this.toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono font-medium text-[#6B6960] bg-white border border-[#E8E6DF] rounded"
            >
              <Globe className="w-3 h-3 stroke-[1.5]" />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              type="button"
              onClick={this.toggleMobileMenu}
              className="p-2 rounded-lg text-[#6B6960] hover:text-[#141413] hover:bg-[#F2F0E8] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E8E6DF] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3 animate-fadeInUp">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-[#6B6960]">
              <a
                href="#how-it-works"
                onClick={this.closeMobileMenu}
                className="py-1.5 hover:text-[#141413] transition-colors"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#features"
                onClick={this.closeMobileMenu}
                className="py-1.5 hover:text-[#141413] transition-colors"
              >
                {t.nav.features}
              </a>
              <a
                href="#templates"
                onClick={this.closeMobileMenu}
                className="py-1.5 hover:text-[#141413] transition-colors"
              >
                {language === 'vi' ? 'Mẫu website' : 'Templates'}
              </a>
              <a
                href="#comparison"
                onClick={this.closeMobileMenu}
                className="py-1.5 hover:text-[#141413] transition-colors"
              >
                {t.nav.comparison}
              </a>
              <a
                href="#pricing"
                onClick={this.closeMobileMenu}
                className="py-1.5 hover:text-[#141413] transition-colors"
              >
                {t.nav.pricing}
              </a>
            </nav>

            <div className="pt-3 border-t border-[#E8E6DF] flex flex-col gap-2">
              <a
                href={APP_CONFIG.authUrl}
                className="w-full text-center py-2 text-sm font-medium text-[#6B6960] hover:text-[#141413] bg-white border border-[#E8E6DF] rounded-lg"
              >
                {t.nav.signIn}
              </a>
              <a
                href={APP_CONFIG.authUrl}
                className="w-full text-center py-2.5 text-sm font-semibold text-[#FAF9F5] bg-[#141413] hover:bg-[#2A2A28] rounded-lg shadow-xs"
              >
                {t.nav.getStarted}
              </a>
            </div>
          </div>
        )}
      </header>
    );
  }
}
