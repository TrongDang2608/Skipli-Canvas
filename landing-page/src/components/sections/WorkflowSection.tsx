import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Terminal, Eye, PenTool, Download, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../../config';

export class WorkflowSection extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render(): ReactNode {
    const { language, t } = this.context;

    const steps = [
      {
        num: t.workflow.step1Num,
        icon: Terminal,
        title: t.workflow.step1Title,
        desc: t.workflow.step1Desc,
        tagVi: 'Khởi tạo tức thì',
        tagEn: 'Prompt to Structure',
        img: '/screenshots/step1-prompt-build.png',
        alt: 'Step 1: Describe your idea to AI prompt',
      },
      {
        num: t.workflow.step2Num,
        icon: Eye,
        title: t.workflow.step2Title,
        desc: t.workflow.step2Desc,
        tagVi: 'Độ trễ bằng 0',
        tagEn: 'Zero-Latency Preview',
        img: '/screenshots/step2-live-preview.png',
        alt: 'Step 2: Instant live responsive preview',
      },
      {
        num: t.workflow.step3Num,
        icon: PenTool,
        title: t.workflow.step3Title,
        desc: t.workflow.step3Desc,
        tagVi: 'Chỉnh sửa không cần code',
        tagEn: 'In-line Visual Edit',
        img: '/screenshots/step3-text-edit.png',
        alt: 'Step 3: Click to edit text and swap images',
      },
      {
        num: t.workflow.step4Num,
        icon: Download,
        title: t.workflow.step4Title,
        desc: t.workflow.step4Desc,
        tagVi: 'Không khóa nền tảng',
        tagEn: 'Clean Source Export',
        img: '/screenshots/step4-export-html.png',
        alt: 'Step 4: Download clean HTML and Tailwind files',
      },
    ];

    return (
      <section id="how-it-works" className="py-24 border-t border-[#E8E6DF]/80 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with reveal */}
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-item">
            <span className="text-xs font-mono font-medium text-[#6B6960] tracking-wide uppercase">
              {t.workflow.sectionTag}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              {t.workflow.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B6960] leading-relaxed">
              {t.workflow.subtitle}
            </p>
          </div>

          {/* 4 Step Cards with Real Screenshots */}
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-9 rounded-3xl bg-white/90 backdrop-blur-xs border border-[#E8E6DF] hover:border-[#141413]/30 hover:shadow-lifted transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-item ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Content Side */}
                  <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-4xl sm:text-5xl font-light text-[#A8A498]">
                        {step.num}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E8E6DF] text-[#6B6960] font-medium">
                        {language === 'vi' ? step.tagVi : step.tagEn}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] flex items-center justify-center text-[#141413] shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#141413] font-normal leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B6960] leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="pt-2">
                      <a
                        href={APP_CONFIG.authUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] hover:underline"
                      >
                        <span>{language === 'vi' ? 'Trải nghiệm bước này' : 'Explore this step'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Real Screenshot Preview Side with Adaptive Container */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="rounded-2xl overflow-hidden border border-[#DCD9CF] shadow-soft group relative bg-[#FAF9F5]">
                      {/* Top micro bar */}
                      <div className="h-7 px-3 bg-[#F2F0E8] border-b border-[#E8E6DF] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D5D3CA]" />
                        <span className="w-2 h-2 rounded-full bg-[#D5D3CA]" />
                        <span className="w-2 h-2 rounded-full bg-[#D5D3CA]" />
                        <span className="ml-2 text-[10px] font-mono text-[#8C8A81]">Skipli Canvas Step {idx + 1}</span>
                      </div>

                      <div className="relative overflow-hidden h-[260px] sm:h-[360px] p-2.5 sm:p-4 flex items-center justify-center bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EB]">
                        <img
                          src={step.img}
                          alt={step.alt}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-sm border border-[#E8E6DF]/80 transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
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
