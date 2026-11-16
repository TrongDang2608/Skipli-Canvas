import React, { Component, ReactNode } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import {
  Laptop,
  Smartphone,
  Sparkles,
  MousePointerClick,
  ArrowRight,
  Star,
  Plus,
  GitBranch,
  Terminal,
  Activity,
  Layers,
  Cpu,
  CheckCircle,
  TrendingUp,
  Zap,
  Command,
  Search,
} from 'lucide-react';

interface InteractiveMockupState {
  activeTab: 'cafe' | 'saas' | 'studio';
  viewMode: 'desktop' | 'mobile';
  isChanging: boolean;
}

export class InteractiveMockup extends Component<{}, InteractiveMockupState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: InteractiveMockupState = {
    activeTab: 'cafe',
    viewMode: 'desktop',
    isChanging: false,
  };

  private timer: ReturnType<typeof setTimeout> | null = null;

  componentWillUnmount(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private handleTabChange = (tabId: 'cafe' | 'saas' | 'studio'): void => {
    if (tabId === this.state.activeTab) return;
    this.setState({ isChanging: true });
    this.timer = setTimeout(() => {
      this.setState({
        activeTab: tabId,
        isChanging: false,
      });
    }, 180);
  };

  private setViewMode = (mode: 'desktop' | 'mobile'): void => {
    this.setState({ viewMode: mode });
  };

  render(): ReactNode {
    const { language, t } = this.context;
    const { activeTab, viewMode, isChanging } = this.state;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Prompt Selector Bar */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white/95 backdrop-blur-md border border-[#E8E6DF] rounded-xl shadow-soft">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-mono text-[#6B6960] mr-1 shrink-0 flex items-center gap-1 select-none">
            <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{language === 'vi' ? 'Prompt mẫu:' : 'Sample Prompts:'}</span>
          </span>
          <button
            type="button"
            onClick={() => this.handleTabChange('cafe')}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
              activeTab === 'cafe'
                ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                : 'text-[#6B6960] hover:text-[#141413] bg-[#F5F4EE] hover:bg-[#EAE8DE]'
            }`}
          >
            {language === 'vi' ? 'Tiệm Cà Phê' : 'Artisan Coffee'}
          </button>

          <button
            type="button"
            onClick={() => this.handleTabChange('saas')}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
              activeTab === 'saas'
                ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                : 'text-[#6B6960] hover:text-[#141413] bg-[#F5F4EE] hover:bg-[#EAE8DE]'
            }`}
          >
            {language === 'vi' ? 'Phần Mềm SaaS' : 'SaaS Platform'}
          </button>

          <button
            type="button"
            onClick={() => this.handleTabChange('studio')}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
              activeTab === 'studio'
                ? 'bg-[#141413] text-[#FAF9F5] shadow-xs'
                : 'text-[#6B6960] hover:text-[#141413] bg-[#F5F4EE] hover:bg-[#EAE8DE]'
            }`}
          >
            {language === 'vi' ? 'Studio Nghệ Thuật' : 'Photo Studio'}
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#F5F4EE] p-1 rounded-lg border border-[#E8E6DF] shrink-0 self-end sm:self-auto select-none">
          <button
            type="button"
            onClick={() => this.setViewMode('desktop')}
            title={language === 'vi' ? 'Xem chế độ máy tính' : 'Desktop view'}
            className={`p-1.5 rounded transition-all cursor-pointer ${
              viewMode === 'desktop' ? 'bg-white text-[#141413] shadow-2xs' : 'text-[#6B6960] hover:text-[#141413]'
            }`}
          >
            <Laptop className="w-4 h-4 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => this.setViewMode('mobile')}
            title={language === 'vi' ? 'Xem chế độ điện thoại' : 'Mobile view'}
            className={`p-1.5 rounded transition-all cursor-pointer ${
              viewMode === 'mobile' ? 'bg-white text-[#141413] shadow-2xs' : 'text-[#6B6960] hover:text-[#141413]'
            }`}
          >
            <Smartphone className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Main Mockup Browser Container */}
      <div className="relative rounded-2xl border border-[#DCD9CF] bg-white shadow-window overflow-hidden transition-all duration-300">
        {/* Browser Top Window Bar */}
        <div className="h-10 px-4 bg-[#F2F0E8] border-b border-[#E8E6DF] flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0DED7] border border-[#CCC9BE]" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E0DED7] rounded-md text-[11px] font-mono text-[#6B6960] max-w-sm w-full mx-4 truncate shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">
              https://preview.skipli-canvas.app/{activeTab}
            </span>
          </div>

          {/* Micro Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#6B6960]">
            <MousePointerClick className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Click-to-edit</span>
          </div>
        </div>

        {/* Viewport Frame */}
        <div
          className={`mx-auto transition-all duration-200 ${
            viewMode === 'mobile' ? 'max-w-sm border-x border-[#E8E6DF] shadow-inner' : 'w-full'
          } ${isChanging ? 'opacity-0 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'}`}
        >
          {/* =========================================================================
              MẪU 1: HERITAGE COFFEE (Artisanal Specialty Coffee)
              ========================================================================= */}
          {activeTab === 'cafe' && (
            <div className="p-4 sm:p-7 bg-[#FAF7F2] text-[#2C1810] font-sans transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC9]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#2C1810] text-[#FAF6F0] flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                    H
                  </span>
                  <div>
                    <span className="font-serif text-lg font-bold tracking-tight text-[#2C1810] block leading-none">
                      Heritage Coffee
                    </span>
                    <span className="text-[10px] font-mono text-[#8C6D58] tracking-widest uppercase">
                      {language === 'vi' ? 'Rang xay thủ công' : 'Artisan Roastery'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 text-xs">
                  <span className="hidden sm:inline text-[#6D4C41] hover:text-[#2C1810] cursor-pointer font-medium">
                    {language === 'vi' ? 'Thực đơn' : 'Menu'}
                  </span>
                  <span className="hidden sm:inline text-[#6D4C41] hover:text-[#2C1810] cursor-pointer font-medium">
                    {language === 'vi' ? 'Về chúng tôi' : 'Our Story'}
                  </span>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-full bg-[#2C1810] text-[#FAF6F0] font-medium text-xs hover:bg-[#3E2723] transition-colors shadow-2xs cursor-pointer"
                  >
                    {language === 'vi' ? 'Đặt Bàn' : 'Reserve Table'}
                  </button>
                </div>
              </div>

              {/* Hero Banner: Luxury Visual Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6">
                <div className="md:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D2] border border-[#DFCFC0] text-[11px] font-medium text-[#6D4C41]">
                    <Star className="w-3 h-3 fill-[#C67C4E] stroke-none" />
                    <span>{language === 'vi' ? '100% Arabica Cầu Đất Tuyển Chọn' : 'Single-Origin Micro-lot Selection'}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.14] text-[#2C1810]">
                    {language === 'vi'
                      ? 'Nốt hương mộc mạc cho những giờ làm việc tập trung'
                      : 'Artisan Roasts Crafted for True Connoisseurs'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6D4C41] leading-relaxed">
                    {language === 'vi'
                      ? 'Mỗi mẻ hạt được tuyển lựa kỹ lưỡng và rang mới mỗi sáng, mang đến lớp crema dày ngậy cùng hậu vị ngọt dịu dài lâu.'
                      : 'Fresh single-origin beans roasted daily in small batches, offering rich caramel sweetness and bright citrus aromatics.'}
                  </p>

                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C67C4E] text-white text-xs font-semibold shadow-xs hover:bg-[#B36B3E] transition-all cursor-pointer"
                    >
                      <span>{language === 'vi' ? 'Xem Danh Mục Đồ Uống' : 'Explore Drink Menu'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-[#8D6E63] font-mono">
                      {language === 'vi' ? 'Mở cửa: 07:00 - 22:00' : 'Open: 07:00 AM - 10:00 PM'}
                    </span>
                  </div>
                </div>

                {/* Hero Featured Card with Photo */}
                <div className="md:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DECFC0] shadow-md group relative">
                    <img
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                      alt="Artisan Coffee Roasting"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div>
                        <div className="font-serif font-bold text-sm">Sumatra Mandheling</div>
                        <div className="text-[10px] text-amber-200 font-mono">
                          {language === 'vi' ? 'Rang mẻ nhỏ 07:00 AM' : 'Small Batch Roast 07:00 AM'}
                        </div>
                      </div>
                      <span className="font-mono font-bold bg-[#C67C4E] px-2 py-0.5 rounded text-[11px]">
                        {language === 'vi' ? '48.000đ' : '$4.80'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elevated Menu Cards Grid with Top Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {[
                  {
                    nameVi: 'Espresso Single Origin',
                    nameEn: 'Single Origin Espresso',
                    priceVi: '45.000đ',
                    priceEn: '$4.50',
                    descVi: 'Đậm đà, hương hoa quả nhẹ',
                    descEn: 'Full-bodied with delicate floral notes',
                    tagVi: 'Rang Vừa',
                    tagEn: 'Medium Roast',
                    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=500&q=80',
                  },
                  {
                    nameVi: 'Cold Brew Ủ Lạnh 24h',
                    nameEn: '24h Slow Cold Brew',
                    priceVi: '55.000đ',
                    priceEn: '$5.50',
                    descVi: 'Ngọt dịu, thanh mát tự nhiên',
                    descEn: 'Smooth, naturally sweet finish',
                    tagVi: 'Bán Chạy',
                    tagEn: 'Popular',
                    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80',
                  },
                  {
                    nameVi: 'Hand Pour V60 Thủ Công',
                    nameEn: 'Hand Pour V60',
                    priceVi: '60.000đ',
                    priceEn: '$6.00',
                    descVi: 'Chiết xuất chuẩn từng giọt',
                    descEn: 'Precision manual extraction',
                    tagVi: 'Đặc Tuyển',
                    tagEn: 'Specialty',
                    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white border border-[#E8DEC9] overflow-hidden hover:border-[#C67C4E] transition-all shadow-2xs hover:shadow-soft flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={language === 'vi' ? item.nameVi : item.nameEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#2C1810] shadow-xs">
                        {language === 'vi' ? item.tagVi : item.tagEn}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-serif font-bold text-[#2C1810]">
                        <span className="truncate">{language === 'vi' ? item.nameVi : item.nameEn}</span>
                        <span className="font-mono text-[#C67C4E] font-bold shrink-0 ml-1">
                          {language === 'vi' ? item.priceVi : item.priceEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6D4C41] line-clamp-1 leading-relaxed">
                        {language === 'vi' ? item.descVi : item.descEn}
                      </p>
                      <div className="pt-1 flex items-center justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C67C4E] hover:underline"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>{language === 'vi' ? 'Thêm món' : 'Add to order'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              MẪU 2: TASKFLOW SAAS (Linear / Supabase Inspired Sleek Digital Aesthetic)
              ========================================================================= */}
          {activeTab === 'saas' && (
            <div className="p-4 sm:p-7 bg-[#F8FAFC] text-[#0F172A] font-sans transition-all duration-300">
              {/* Header: Linear Style Sleek Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1E293B] to-[#0F172A] text-white flex items-center justify-center font-bold shadow-xs border border-slate-700/50">
                    <Command className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-bold tracking-tight text-[#0F172A] block leading-none">
                      TaskFlow
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200/80 font-medium">
                      v2.4
                    </span>
                  </div>
                </div>

                {/* Sub Nav Items */}
                <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[#64748B]">
                  <span className="text-[#0F172A] font-semibold cursor-pointer">
                    {language === 'vi' ? 'Tiến độ' : 'Issues'}
                  </span>
                  <span className="hover:text-[#0F172A] cursor-pointer">
                    {language === 'vi' ? 'Chu kỳ' : 'Cycles'}
                  </span>
                  <span className="hover:text-[#0F172A] cursor-pointer">
                    {language === 'vi' ? 'Lộ trình' : 'Roadmap'}
                  </span>
                  <span className="hover:text-[#0F172A] cursor-pointer">
                    {language === 'vi' ? 'Báo cáo' : 'Insights'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {/* Quick Search Pill */}
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#CBD5E1] text-[#64748B] text-[11px] font-mono">
                    <Search className="w-3 h-3 text-[#94A3B8]" />
                    <span>Search</span>
                    <kbd className="px-1 py-0.2 bg-white rounded border border-[#CBD5E1] text-[9px] text-[#475569]">⌘K</kbd>
                  </div>

                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] text-white font-medium text-xs hover:bg-[#1E293B] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? 'Tạo Task' : 'New Issue'}</span>
                  </button>
                </div>
              </div>

              {/* Hero Banner: Engineering Velocity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
                <div className="lg:col-span-6 space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/80 border border-blue-200 text-[11px] font-mono text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>{language === 'vi' ? 'Sprint 42 • Sẵn sàng release vào Thứ 6' : 'Sprint 42 • Target Release Friday'}</span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-[#0F172A]">
                    {language === 'vi'
                      ? 'Kiểm soát tiến độ kỹ thuật với tốc độ và kỷ luật tối đa'
                      : 'Issue tracking built for engineering velocity'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {language === 'vi'
                      ? 'Đồng bộ hóa toàn bộ backlog, quy trình review và số liệu release trên giao diện siêu mượt, không độ trễ.'
                      : 'Streamline backlog triage, automated branch linking, and sprint throughput with zero-latency synchronization.'}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold shadow-xs hover:bg-[#1D4ED8] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{language === 'vi' ? 'Khởi Tạo Workspace Free' : 'Start Free Workspace'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-mono">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{language === 'vi' ? '0s đồng bộ tức thì' : 'Zero-latency sync'}</span>
                    </div>
                  </div>
                </div>

                {/* SaaS Live Interactive App Workspace Box */}
                <div className="lg:col-span-6 relative">
                  <div className="rounded-xl overflow-hidden border border-[#CBD5E1] shadow-lg bg-white text-xs">
                    {/* App Window Top Bar */}
                    <div className="px-3.5 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-semibold text-[#0F172A]">taskflow / core-app</span>
                        <span className="text-[#94A3B8]">/</span>
                        <span className="text-[#64748B]">active-sprint</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>All systems normal</span>
                      </div>
                    </div>

                    {/* App Interactive Content Inside */}
                    <div className="p-3.5 space-y-2 bg-[#FAFBFD]">
                      {/* Active Task 1 */}
                      <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-blue-400 transition-colors flex items-center justify-between text-xs shadow-2xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <div className="truncate">
                            <span className="font-mono text-[10px] text-[#64748B] mr-1.5 font-semibold">SKI-204</span>
                            <span className="font-medium text-[#0F172A]">
                              {language === 'vi' ? 'Atomic transaction trừ credit Firestore' : 'Atomic token deduction in Firestore'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {language === 'vi' ? 'Xong' : 'Done'}
                          </span>
                        </div>
                      </div>

                      {/* Active Task 2 */}
                      <div className="p-2.5 rounded-lg bg-white border border-blue-200/80 hover:border-blue-400 transition-colors flex items-center justify-between text-xs shadow-2xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Activity className="w-4 h-4 text-blue-600 shrink-0 animate-spin" />
                          <div className="truncate">
                            <span className="font-mono text-[10px] text-blue-600 mr-1.5 font-semibold">SKI-209</span>
                            <span className="font-medium text-[#0F172A]">
                              {language === 'vi' ? 'Living ambient background canvas' : 'Living dynamic background canvas'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            {language === 'vi' ? 'Đang chạy' : 'In Review'}
                          </span>
                        </div>
                      </div>

                      {/* Active Task 3 */}
                      <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-blue-400 transition-colors flex items-center justify-between text-xs shadow-2xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <GitBranch className="w-4 h-4 text-amber-500 shrink-0" />
                          <div className="truncate">
                            <span className="font-mono text-[10px] text-[#64748B] mr-1.5 font-semibold">SKI-215</span>
                            <span className="font-medium text-[#0F172A]">
                              {language === 'vi' ? 'Tối ưu hóa pipeline bundling và HMR' : 'HMR pipeline & asset optimization'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200">
                            {language === 'vi' ? 'Chờ test' : 'Testing'}
                          </span>
                        </div>
                      </div>

                      {/* Mini Telemetry Progress Bar */}
                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                        <span>{language === 'vi' ? 'Tiến độ hoàn thành: 88%' : 'Sprint Velocity: 88%'}</span>
                        <span className="text-emerald-600 font-semibold">+14% vs mục tiêu</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="w-[88%] h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redesigned Sleek Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* SaaS Card 1: Interactive Mini Kanban */}
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-500 hover:shadow-soft transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                  {/* Top Mini UI Component: 3 Mini Kanban Columns */}
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-3 space-y-1.5 select-none">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span className="flex items-center gap-1 font-bold text-[#0F172A]">
                        <Layers className="w-3 h-3 text-blue-600" />
                        <span>KANBAN BOARD</span>
                      </span>
                      <span className="text-blue-600 font-semibold">0ms sync</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {/* Col 1 */}
                      <div className="bg-[#EDF2F7] p-1.5 rounded space-y-1">
                        <span className="text-[9px] font-mono text-[#64748B] font-semibold block">TODO</span>
                        <div className="h-5 rounded bg-white border border-[#E2E8F0] p-1 shadow-2xs flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1" />
                          <span className="h-1.5 w-8 bg-slate-200 rounded" />
                        </div>
                      </div>
                      {/* Col 2 */}
                      <div className="bg-blue-50/80 p-1.5 rounded space-y-1 border border-blue-100">
                        <span className="text-[9px] font-mono text-blue-600 font-semibold block">DOING</span>
                        <div className="h-5 rounded bg-white border border-blue-200 p-1 shadow-2xs flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1" />
                          <span className="h-1.5 w-10 bg-blue-200 rounded" />
                        </div>
                      </div>
                      {/* Col 3 */}
                      <div className="bg-emerald-50/80 p-1.5 rounded space-y-1 border border-emerald-100">
                        <span className="text-[9px] font-mono text-emerald-600 font-semibold block">DONE</span>
                        <div className="h-5 rounded bg-white border border-emerald-200 p-1 shadow-2xs flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                          <span className="h-1.5 w-7 bg-emerald-200 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1">
                      <span>{language === 'vi' ? 'Bảng Kanban Trực Quan' : 'Visual Kanban Engine'}</span>
                      <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                        Realtime
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {language === 'vi'
                        ? 'Kéo thả thẻ nhiệm vụ mượt mà, phân loại backlog thông minh không độ trễ.'
                        : 'Drag-and-drop task cards with immediate zero-latency team sync.'}
                    </p>
                  </div>
                </div>

                {/* SaaS Card 2: Interactive Automation Pipeline */}
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-500 hover:shadow-soft transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                  {/* Top Mini UI Component: Logic Flow Nodes */}
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-3 space-y-1.5 select-none font-mono text-[10px]">
                    <div className="flex items-center justify-between text-[#64748B]">
                      <span className="flex items-center gap-1 font-bold text-[#0F172A]">
                        <Cpu className="w-3 h-3 text-blue-600" />
                        <span>WORKFLOW CI/CD</span>
                      </span>
                      <span className="text-emerald-600 font-semibold font-mono">Passed 14s</span>
                    </div>
                    <div className="p-1.5 rounded bg-white border border-[#E2E8F0] text-[#0F172A] flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-1.5 truncate">
                        <GitBranch className="w-3 h-3 text-amber-500" />
                        <span className="truncate">git commit #e4f9c</span>
                      </div>
                      <span className="text-[9px] text-[#94A3B8]">main</span>
                    </div>
                    <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-semibold">
                      <div className="flex items-center gap-1.5 truncate">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span className="truncate">Auto-deploy to Staging</span>
                      </div>
                      <span className="text-[9px] text-emerald-700 font-mono">Live</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1">
                      <span>{language === 'vi' ? 'Tự Động Hóa Quy Trình' : 'Smart Automations'}</span>
                      <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                        Auto-rule
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {language === 'vi'
                        ? 'Thiết lập quy tắc kích hoạt tự động theo từng giai đoạn dự án.'
                        : 'Trigger notifications and stage transitions automatically.'}
                    </p>
                  </div>
                </div>

                {/* SaaS Card 3: Realtime Velocity & Telemetry Chart */}
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-500 hover:shadow-soft transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                  {/* Top Mini UI Component: SVG Burndown Sparkline */}
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-3 space-y-1.5 select-none">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span className="flex items-center gap-1 font-bold text-[#0F172A]">
                        <TrendingUp className="w-3 h-3 text-blue-600" />
                        <span>VELOCITY</span>
                      </span>
                      <span className="text-emerald-600 font-semibold font-mono">+34% vs avg</span>
                    </div>
                    {/* SVG Sparkline Graph */}
                    <div className="h-10 w-full bg-white rounded border border-[#E2E8F0] p-1.5 flex items-end justify-between gap-1 shadow-2xs">
                      <div className="w-[12%] h-[35%] bg-blue-200 rounded-xs" />
                      <div className="w-[12%] h-[45%] bg-blue-300 rounded-xs" />
                      <div className="w-[12%] h-[40%] bg-blue-300 rounded-xs" />
                      <div className="w-[12%] h-[65%] bg-blue-400 rounded-xs" />
                      <div className="w-[12%] h-[75%] bg-blue-500 rounded-xs" />
                      <div className="w-[12%] h-[88%] bg-blue-600 rounded-xs" />
                      <div className="w-[12%] h-[100%] bg-emerald-500 rounded-xs" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1">
                      <span>{language === 'vi' ? 'Báo Cáo Tiến Độ Nhóm' : 'Team Velocity Metrics'}</span>
                      <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                        Telemetry
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {language === 'vi'
                        ? 'Biểu đồ trực quan theo dõi năng suất sprint và thời lượng thực tế.'
                        : 'Live burndown charts and sprint throughput predictability.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MẪU 3: LUMINA STUDIO (High-Fashion Minimalist Editorial)
              ========================================================================= */}
          {activeTab === 'studio' && (
            <div className="p-4 sm:p-7 bg-[#FFFFFF] text-[#111111] font-sans transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg tracking-widest uppercase font-medium text-[#111111]">
                    Lumina Studio
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-[#666666]">
                  <span className="hover:text-[#111111] cursor-pointer">
                    {language === 'vi' ? 'Tác phẩm' : 'Work'}
                  </span>
                  <span className="hover:text-[#111111] cursor-pointer">
                    {language === 'vi' ? 'Triển lãm' : 'Exhibition'}
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs font-mono rounded border border-[#111111] bg-[#111111] text-white hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer"
                  >
                    {language === 'vi' ? 'Liên hệ' : 'Inquire'}
                  </button>
                </div>
              </div>

              {/* Hero Banner: Editorial Split Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6">
                <div className="md:col-span-5 space-y-4">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#888888]">
                    {language === 'vi' ? 'Nhiếp Ảnh & Không Gian Kiến Trúc' : 'Editorial & Architectural Portfolio'}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#111111]">
                    {language === 'vi'
                      ? 'Nghệ thuật lưu giữ ánh sáng và cảm xúc chân thực'
                      : 'Capturing Timeless Spaces and Human Emotions'}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed font-serif italic">
                    {language === 'vi'
                      ? 'Mỗi khung hình là sự kết hợp giữa ánh sáng tự nhiên và chiều sâu kiến trúc, kể nên câu chuyện nguyên bản của từng tác phẩm.'
                      : 'Every frame balances ambient natural lighting with pure compositional restraint, revealing the quiet soul of architecture.'}
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      className="px-4 py-2 border-b border-[#111111] text-xs font-mono tracking-wide uppercase hover:border-b-2 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{language === 'vi' ? 'Xem Bộ Sưu Tập 2026' : 'View Series 2026'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Hero Editorial Photo */}
                <div className="md:col-span-7">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm group">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                      alt="Editorial Portrait Photography"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {[
                  {
                    titleVi: 'Chân Dung Thời Trang',
                    titleEn: 'Fashion Editorial',
                    locationVi: 'Paris, 2026',
                    locationEn: 'Paris, 2026',
                    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    titleVi: 'Không Gian Tối Giản',
                    titleEn: 'Minimalist Spaces',
                    locationVi: 'Tokyo, 2026',
                    locationEn: 'Tokyo, 2026',
                    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    titleVi: 'Tĩnh Vật Nghệ Thuật',
                    titleEn: 'Artistic Still Life',
                    locationVi: 'Milan, 2026',
                    locationEn: 'Milan, 2026',
                    img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=400&q=80',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group overflow-hidden rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.img}
                        alt={language === 'vi' ? item.titleVi : item.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5 flex items-center justify-between text-xs">
                      <span className="font-serif font-medium text-[#111111]">
                        {language === 'vi' ? item.titleVi : item.titleEn}
                      </span>
                      <span className="font-mono text-[10px] text-[#888888]">
                        {language === 'vi' ? item.locationVi : item.locationEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mock Canvas Bottom Info Bar - 100% Bilingual Synchronized */}
          <div className="p-3.5 bg-white border-t border-[#E8E6DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-[#6B6960] select-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Canvas Sync: 100% Responsive HTML & Tailwind CSS</span>
            </div>
            <div className="text-[10px] text-[#8C8A81] truncate max-w-xl text-left sm:text-right">
              {activeTab === 'cafe' && `Prompt: "${t.hero.promptCafeText}"`}
              {activeTab === 'saas' && `Prompt: "${t.hero.promptSaaSText}"`}
              {activeTab === 'studio' && `Prompt: "${t.hero.promptStudioText}"`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

