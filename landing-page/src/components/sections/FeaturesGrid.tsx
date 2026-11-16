import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Edit3, Image, Layers, Code2, ArrowUpRight } from 'lucide-react';
import { APP_CONFIG } from '../../config';

export class FeaturesGrid extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render(): ReactNode {
    const { language, t } = this.context;

    const features = [
      {
        icon: Edit3,
        tag: t.features.f1Tag,
        title: t.features.f1Title,
        desc: t.features.f1Desc,
        colSpan: 'lg:col-span-7',
        img: '/screenshots/step3-text-edit.png',
        alt: 'Click to edit in-line text toolbar',
        stageLabelVi: 'Thanh công cụ định dạng chữ nổi trực tiếp',
        stageLabelEn: 'In-line Floating Formatting Palette',
      },
      {
        icon: Layers,
        tag: t.features.f3Tag,
        title: t.features.f3Title,
        desc: t.features.f3Desc,
        colSpan: 'lg:col-span-5',
        img: '/screenshots/feature-card-reorder.png',
        alt: 'Section and card reorder arrows',
        stageLabelVi: 'Di chuyển thứ tự các section & thẻ card',
        stageLabelEn: 'Reorder Section & Card Hierarchy',
      },
      {
        icon: Image,
        tag: t.features.f2Tag,
        title: t.features.f2Title,
        desc: t.features.f2Desc,
        colSpan: 'lg:col-span-5',
        img: '/screenshots/step3-image-replace.png',
        alt: 'Smart image replacer modal',
        stageLabelVi: 'Hộp thoại tải ảnh từ máy tính hoặc Unsplash',
        stageLabelEn: 'Media Uploader & Asset Selector',
      },
      {
        icon: Code2,
        tag: t.features.f4Tag,
        title: t.features.f4Title,
        desc: t.features.f4Desc,
        colSpan: 'lg:col-span-7',
        img: '/screenshots/feature-section-nav.png',
        alt: 'Section navigator drawer and source code',
        stageLabelVi: 'Drawer danh mục section và mã nguồn trực tiếp',
        stageLabelEn: 'Section Navigator & Live Markup Code',
      },
    ];

    return (
      <section id="features" className="py-24 border-t border-[#E8E6DF]/80 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with reveal */}
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-item">
            <span className="text-xs font-mono font-medium text-[#6B6960] tracking-wide uppercase">
              {t.features.sectionTag}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              {t.features.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B6960] leading-relaxed">
              {t.features.subtitle}
            </p>
          </div>

          {/* Asymmetrical Bento Grid (7-5 & 5-7 Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`${feature.colSpan} p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#E8E6DF] hover:border-[#141413]/40 hover:shadow-lifted hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group reveal-item overflow-hidden`}
                >
                  {/* Header of Card */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] flex items-center justify-center text-[#141413] transition-colors group-hover:bg-[#141413] group-hover:text-[#FAF9F5]">
                        <Icon className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[11px] font-mono text-[#6B6960] bg-[#FAF9F5] px-2.5 py-0.5 rounded-full border border-[#E8E6DF] font-medium">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#141413] font-normal mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6960] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Adaptive Screenshot Stage */}
                  <div className="rounded-2xl overflow-hidden border border-[#E8E6DF] shadow-2xs group-hover:shadow-soft transition-all bg-[#FAF8F5] mb-4">
                    <div className="h-7 px-3 bg-[#F2EFE8] border-b border-[#E8E6DF] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D6D3C8]" />
                        <span className="w-2 h-2 rounded-full bg-[#D6D3C8]" />
                        <span className="w-2 h-2 rounded-full bg-[#D6D3C8]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#8C8A81] truncate max-w-[220px]">
                        {language === 'vi' ? feature.stageLabelVi : feature.stageLabelEn}
                      </span>
                    </div>

                    <div className="h-64 sm:h-76 w-full p-3 sm:p-4 flex items-center justify-center bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EB] overflow-hidden">
                      <img
                        src={feature.img}
                        alt={feature.alt}
                        className="max-h-full max-w-full object-contain rounded-lg shadow-sm border border-[#E8E6DF]/80 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Footer of Card */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#8C8A81]">
                    <span>Visual Canvas Engine</span>
                    <a
                      href={APP_CONFIG.authUrl}
                      className="inline-flex items-center gap-1 text-[#141413] hover:underline font-sans font-medium"
                    >
                      <span>{language === 'vi' ? 'Trải nghiệm ngay' : 'Try this feature'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
