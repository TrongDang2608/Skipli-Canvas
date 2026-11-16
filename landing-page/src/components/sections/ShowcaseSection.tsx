import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { InteractiveMockup } from './InteractiveMockup';
import { Sparkles } from 'lucide-react';

export class ShowcaseSection extends Component {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render(): ReactNode {
    const { language } = this.context;

    return (
      <section id="templates" className="py-24 border-t border-[#E8E6DF]/80 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 reveal-item">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6DF] text-xs font-mono text-[#6B6960] mb-3 shadow-2xs select-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{language === 'vi' ? 'Thành phẩm thực tế' : 'Live Interactive Previews'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              {language === 'vi'
                ? 'Trải nghiệm website được tạo bởi Skipli Canvas'
                : 'Explore websites created with Skipli Canvas'}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#6B6960] leading-relaxed">
              {language === 'vi'
                ? 'Bấm chọn giữa các mẫu giao diện bên dưới để kiểm tra khả năng tương tác, đổi món, đổi chế độ máy tính / điện thoại thời gian thực.'
                : 'Switch between sample templates below to test interactive cards, responsive views, and live layouts in real time.'}
            </p>
          </div>

          {/* The Interactive Mockup Component */}
          <div className="reveal-item">
            <InteractiveMockup />
          </div>
        </div>
      </section>
    );
  }
}
