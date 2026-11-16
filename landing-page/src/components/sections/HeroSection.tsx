import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';
import { ArrowRight, Play, Sparkles, Check, Laptop, Smartphone, Eye, LayoutDashboard, Sliders } from 'lucide-react';

interface HeroSectionProps {
  onOpenVideoModal: () => void;
}

interface HeroSectionState {
  activeScreenTab: 'workspace' | 'standalone' | 'dashboard';
}

export class HeroSection extends Component<HeroSectionProps, HeroSectionState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: HeroSectionState = {
    activeScreenTab: 'workspace',
  };

  private setActiveScreenTab = (tab: 'workspace' | 'standalone' | 'dashboard'): void => {
    this.setState({ activeScreenTab: tab });
  };

  render(): ReactNode {
    const { language, t } = this.context;
    const { onOpenVideoModal } = this.props;
    const { activeScreenTab } = this.state;

    const screens = {
      workspace: {
        img: '/screenshots/hero-live-preview.png',
        alt: 'Skipli Canvas Live Workspace View',
        captionVi: 'Màn hình làm việc trực tiếp: Trò chuyện AI bên trái và Canvas xem trước tương tác bên phải',
        captionEn: 'Live Workspace: Interactive AI prompt chat on the left & instant live canvas preview on the right',
      },
      standalone: {
        img: '/screenshots/feature-standalone.png',
        alt: 'Full Responsive Standalone Preview',
        captionVi: 'Chế độ xem toàn màn hình: Kiểm tra website chuẩn responsive trên cả Desktop và Mobile',
        captionEn: 'Full Standalone Mode: Test responsive layouts across desktop, tablet, and mobile devices',
      },
      dashboard: {
        img: '/screenshots/feature-dashboard.png',
        alt: 'Project Management Home Dashboard',
        captionVi: 'Giao diện Dashboard: Quản lý danh sách các dự án website đã tạo một cách ngăn nắp',
        captionEn: 'Home Dashboard: Effortlessly manage, duplicate, and organize all your created web projects',
      },
    };

    return (
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-transparent">
        {/* Background Soft Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#EAE7DC]/35 via-[#F5F3EC]/20 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Editorial Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8E6DF] shadow-2xs mb-6 select-none animate-fadeInUp">
            <Sparkles className="w-3.5 h-3.5 text-[#141413] stroke-[1.5]" />
            <span className="text-xs font-mono font-medium text-[#6B6960]">
              {t.hero.badge}
            </span>
          </div>

          {/* Anthropic / Claude Editorial Serif Headline */}
          <h1 className="max-w-4xl mx-auto font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08] mb-6 animate-fadeInUp">
            <span>{t.hero.headlinePart1}</span>
            <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#141413]/90"> {t.hero.headlinePart2}</span>
          </h1>

          {/* Refined, grounded subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#6B6960] font-sans leading-relaxed mb-8 animate-fadeInUp">
            {t.hero.subheadline}
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6 select-none animate-fadeInUp">
            <a
              href={APP_CONFIG.authUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#141413] text-[#FAF9F5] text-sm font-semibold hover:bg-[#2A2A28] active:scale-98 transition-all shadow-soft group"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={onOpenVideoModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E8E6DF] text-[#141413] text-sm font-medium hover:bg-[#F5F4EE] hover:border-[#D5D3CA] active:scale-98 transition-all shadow-2xs cursor-pointer group"
            >
              <Play className="w-3.5 h-3.5 fill-[#141413] stroke-none transition-transform duration-200 group-hover:scale-110" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* 3 Trust Proof Points */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-mono text-[#6B6960] mb-12 select-none">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>{language === 'vi' ? 'Tiết kiệm với 20 credits dùng thử' : '20 free trial credits included'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>{language === 'vi' ? 'Mã nguồn sạch 100% HTML & Tailwind' : '100% clean HTML & Tailwind CSS'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>{language === 'vi' ? 'Không yêu cầu thẻ tín dụng' : 'No credit card required'}</span>
            </span>
          </div>

          {/* REAL PRODUCT SCREENSHOT SHOWCASE */}
          <div className="relative max-w-5xl mx-auto pt-2">
            {/* Switcher Tab */}
            <div className="mb-4 inline-flex items-center p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E6DF] shadow-soft gap-1 text-xs font-medium text-[#6B6960] select-none">
              <button
                type="button"
                onClick={() => this.setActiveScreenTab('workspace')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeScreenTab === 'workspace'
                    ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                    : 'hover:text-[#141413] hover:bg-[#F5F4EE]'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Không Gian AI Canvas' : 'Live AI Workspace'}</span>
              </button>

              <button
                type="button"
                onClick={() => this.setActiveScreenTab('standalone')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeScreenTab === 'standalone'
                    ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                    : 'hover:text-[#141413] hover:bg-[#F5F4EE]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Xem Trước Toàn Màn Hình' : 'Standalone Preview'}</span>
              </button>

              <button
                type="button"
                onClick={() => this.setActiveScreenTab('dashboard')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeScreenTab === 'dashboard'
                    ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                    : 'hover:text-[#141413] hover:bg-[#F5F4EE]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Quản Lý Dự Án' : 'Project Dashboard'}</span>
              </button>
            </div>

            {/* Main Showcase App Window Frame */}
            <div className="relative rounded-2xl border border-[#DCD9CF] bg-white shadow-window overflow-hidden transition-all duration-300 group">
              {/* Window Top Header Bar */}
              <div className="h-10 px-4 bg-[#F2F0E8] border-b border-[#E8E6DF] flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
                </div>

                {/* Address bar mockup */}
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E0DED7] rounded-md text-[11px] font-mono text-[#6B6960] max-w-sm w-full mx-4 truncate shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">https://app.skipli-canvas.com/workspace</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B6960]">
                  <span className="hidden sm:inline">Skipli Canvas Engine v1.0</span>
                </div>
              </div>

              {/* Actual Project Screenshot Display */}
              <div className="relative bg-[#0F172A] overflow-hidden">
                <img
                  src={screens[activeScreenTab].img}
                  alt={screens[activeScreenTab].alt}
                  className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-3 bg-white border-t border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#6B6960] select-none text-left">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'vi' ? screens[activeScreenTab].captionVi : screens[activeScreenTab].captionEn}</span>
                </span>
                <a
                  href={APP_CONFIG.authUrl}
                  className="text-[#141413] hover:underline font-semibold shrink-0"
                >
                  {language === 'vi' ? 'Dùng thử ngay →' : 'Try live demo →'}
                </a>
              </div>
            </div>

            {/* 3 Floating 3D Micro Badges */}
            <div className="hidden lg:flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E6DF] shadow-lifted absolute -top-5 -left-8 text-left z-20 animate-ambient-1 select-none pointer-events-none">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#141413]">In-line Click-to-Edit</div>
                <div className="text-[10px] text-[#6B6960] font-mono">
                  {language === 'vi' ? 'Sửa chữ trực tiếp trên web' : 'Direct live copy editing'}
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E6DF] shadow-lifted absolute -bottom-5 -right-8 text-left z-20 animate-ambient-2 select-none pointer-events-none">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#141413]">Responsive Preview</div>
                <div className="text-[10px] text-[#6B6960] font-mono">
                  {language === 'vi' ? 'Chuẩn Mobile & Desktop' : '100% Mobile Ready'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
