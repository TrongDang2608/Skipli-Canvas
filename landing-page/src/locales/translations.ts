export type Language = 'vi' | 'en';

export interface Translations {
  nav: {
    features: string;
    howItWorks: string;
    comparison: string;
    pricing: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    noCardRequired: string;
    promptPlaceholder: string;
    promptTabCafe: string;
    promptTabSaaS: string;
    promptTabStudio: string;
    promptCafeText: string;
    promptSaaSText: string;
    promptStudioText: string;
    canvasLivePreview: string;
    clickToEditBadge: string;
  };
  comparison: {
    sectionTag: string;
    title: string;
    subtitle: string;
    traditionalTitle: string;
    traditionalSubtitle: string;
    skipliTitle: string;
    skipliSubtitle: string;
    point1Traditional: string;
    point1Skipli: string;
    point2Traditional: string;
    point2Skipli: string;
    point3Traditional: string;
    point3Skipli: string;
    point4Traditional: string;
    point4Skipli: string;
  };
  features: {
    sectionTag: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f1Tag: string;
    f2Title: string;
    f2Desc: string;
    f2Tag: string;
    f3Title: string;
    f3Desc: string;
    f3Tag: string;
    f4Title: string;
    f4Desc: string;
    f4Tag: string;
  };
  workflow: {
    sectionTag: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step4Num: string;
    step4Title: string;
    step4Desc: string;
  };
  pricing: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cardBadge: string;
    planName: string;
    planPrice: string;
    planSuffix: string;
    planPeriod: string;
    planDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    feature5: string;
    cta: string;
    disclaimer: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    button: string;
    footnote: string;
  };
  footer: {
    tagline: string;
    product: string;
    documentation: string;
    terms: string;
    privacy: string;
    rights: string;
  };
  modal: {
    title: string;
    placeholderNote: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      features: 'Tính năng',
      howItWorks: 'Quy trình',
      comparison: 'So sánh',
      pricing: 'Trải nghiệm',
      signIn: 'Đăng nhập',
      getStarted: 'Bắt đầu miễn phí',
    },
    hero: {
      badge: 'Công cụ dựng website với trí tuệ nhân tạo',
      headlinePart1: 'Hiện thực hóa ý tưởng website',
      headlinePart2: 'chỉ từ những mô tả tự nhiên',
      subheadline:
        'Hỗ trợ bạn phác thảo, xây dựng và tinh chỉnh giao diện trực quan theo nhu cầu thực tế. Không cần thiết lập phức tạp, tối ưu hóa thời gian và làm chủ mã nguồn.',
      ctaPrimary: 'Trải nghiệm với 20 credits',
      ctaSecondary: 'Xem video giới thiệu',
      noCardRequired: 'Không yêu cầu thẻ tín dụng • Bắt đầu ngay sau khi đăng ký',
      promptPlaceholder: 'Mô tả ý tưởng trang web bạn muốn tạo...',
      promptTabCafe: 'Quán cà phê',
      promptTabSaaS: 'Phần mềm',
      promptTabStudio: 'Studio ảnh',
      promptCafeText: 'Tạo trang web cho tiệm cà phê rang thủ công với danh mục thức uống và khu vực đặt bàn.',
      promptSaaSText: 'Tạo trang giới thiệu giải pháp quản lý công việc với bảng tính năng và biểu giá minh bạch.',
      promptStudioText: 'Tạo trang danh mục tác phẩm cho studio nhiếp ảnh với phong cách tối giản và form liên hệ.',
      canvasLivePreview: 'Khu vực xem trước trực quan',
      clickToEditBadge: 'Nhấp chuột vào để chỉnh sửa nội dung',
    },
    comparison: {
      sectionTag: 'Góc nhìn thực tế',
      title: 'Tối ưu hóa quy trình xây dựng website',
      subtitle:
        'Thay vì mất nhiều thời gian trao đổi qua lại giữa bản thảo và lập trình, bạn có thể kiểm chứng ý tưởng trực tiếp ngay trên màn hình.',
      traditionalTitle: 'Cách làm truyền thống',
      traditionalSubtitle: 'Nhiều bước trung gian và tốn thời gian',
      skipliTitle: 'Với Skipli Canvas',
      skipliSubtitle: 'Rút ngắn thời gian, tập trung vào ý tưởng',
      point1Traditional: 'Mất nhiều ngày để dựng khung trang sơ khởi từ tài liệu thiết kế.',
      point1Skipli: 'Khởi tạo bố cục trang hoàn chỉnh nhanh chóng từ câu mô tả ý tưởng.',
      point2Traditional: 'Thay đổi tiêu đề, màu sắc hoặc hình ảnh phải can thiệp trực tiếp vào mã nguồn.',
      point2Skipli: 'Nhấp đúp chuột vào bất kỳ đoạn chữ nào trên giao diện để sửa trực tiếp.',
      point3Traditional: 'Khó kiểm tra giao diện trên điện thoại và máy tính bảng trong lúc đang dựng.',
      point3Skipli: 'Xem trước lập tức trên các chế độ màn hình khác nhau trong cùng một không gian làm việc.',
      point4Traditional: 'Bị ràng buộc vào nền tảng đóng hoặc tốn phí duy trì mã nguồn định kỳ.',
      point4Skipli: 'Xuất toàn bộ mã nguồn HTML và CSS sạch, sẵn sàng triển khai trên hosting của bạn.',
    },
    features: {
      sectionTag: 'Bộ Công Cụ Trực Quan',
      title: 'Kiểm soát từng chi tiết trực tiếp trên màn hình',
      subtitle: 'Mỗi tính năng được thiết kế thực tế để bạn chỉnh sửa giao diện nhanh chóng mà không cần kiến thức lập trình phức tạp.',
      f1Title: 'Click-to-Edit & Toolbar Nổi',
      f1Desc: 'Nhấp đúp vào bất kỳ dòng tiêu đề hoặc đoạn văn nào trên website để sửa chữ tức thì với thanh công cụ định dạng nổi.',
      f1Tag: 'In-line Editing',
      f2Title: 'Trình Thay Ảnh Thông Minh & Đổi Thứ Tự Thẻ',
      f2Desc: 'Click vào ảnh để tải ảnh mới từ máy tính hoặc dùng Unsplash. Kéo thả và đổi trật tự các khối menu, dịch vụ nhẹ nhàng.',
      f2Tag: 'Smart Media',
      f3Title: 'Điều Hướng Phân Đoạn & Xem Code Nhanh',
      f3Desc: 'Mở Drawer điều hướng để chuyển nhanh đến các phần Hero, Menu, Footer và xem mã nguồn HTML/Tailwind tương ứng.',
      f3Tag: 'Section Navigator',
      f4Title: 'Lịch Sử Phiên Bản & Hoàn Tác Đa Tầng',
      f4Desc: 'Hệ thống tự động lưu từng mốc prompt và chỉnh sửa. Dễ dàng Undo/Redo hoặc khôi phục lại phiên bản ưng ý bất cứ lúc nào.',
      f4Tag: 'Time-Machine History',
    },
    workflow: {
      sectionTag: 'Quy Trình 4 Bước Đơn Giản',
      title: 'Từ câu lệnh sơ khai đến trang web sẵn sàng sử dụng',
      subtitle: 'Một quy trình trực quan, rõ ràng giúp bạn chủ động xây dựng trang web hoàn chỉnh trong vài phút.',
      step1Num: '01',
      step1Title: 'Mô tả ý tưởng & phong cách',
      step1Desc: 'Nhập ngành nghề, màu sắc chủ đạo và các mục mong muốn bằng ngôn ngữ tự nhiên. Trợ lý AI phân tích và lên khung ngay.',
      step2Num: '02',
      step2Title: 'Xem trước thời gian thực (Live Preview)',
      step2Desc: 'Giao diện hiển thị trực tiếp bên cạnh khung chat. Kiểm tra tức thì độ hiển thị chuẩn xác trên máy tính và điện thoại.',
      step3Num: '03',
      step3Title: 'Tinh chỉnh trực quan bằng mắt',
      step3Desc: 'Nhấp chuột sửa trực tiếp văn bản, thay thế hình ảnh từ máy tính hoặc đổi vị trí các khối nội dung theo ý bạn.',
      step4Num: '04',
      step4Title: 'Tải trọn bộ mã nguồn sạch HTML',
      step4Desc: 'Xuất file mã nguồn HTML & Tailwind CSS chuẩn, hoàn toàn độc lập và sẵn sàng để bạn đưa lên bất kỳ hosting nào.',
    },
    pricing: {
      sectionTag: 'Chi phí minh bạch',
      title: 'Bắt đầu với gói trải nghiệm thực tế',
      subtitle: 'Được thiết kế để bạn làm quen và tự mình đánh giá hiệu quả trước khi quyết định mở rộng.',
      cardBadge: 'Dành cho người dùng mới',
      planName: 'Gói Trải Nghiệm',
      planPrice: '0đ',
      planSuffix: '/ khởi đầu',
      planPeriod: '20 Credits ban đầu',
      planDesc: 'Đầy đủ tính năng cốt lõi để bạn khám phá và tạo trang web thử nghiệm hoàn chỉnh.',
      feature1: '20 Credits dùng thử ngay sau khi hoàn tất đăng ký',
      feature2: 'Chỉnh sửa chữ và bố cục thủ công hoàn toàn miễn phí',
      feature3: 'Xem trước trên màn hình máy tính và thiết bị di động',
      feature4: 'Quản lý lịch sử phiên bản và khôi phục khi cần',
      feature5: 'Tải về mã nguồn trang web đã tạo',
      cta: 'Đăng ký nhận 20 credits',
      disclaimer: 'Không yêu cầu nhập thông tin thanh toán khi đăng ký trải nghiệm ban đầu.',
    },
    finalCta: {
      title: 'Bắt đầu xây dựng website của bạn ngay hôm nay',
      subtitle: 'Đăng ký tài khoản trong vài phút và tự mình trải nghiệm quy trình tạo trang web linh hoạt.',
      button: 'Tạo tài khoản dùng thử',
      footnote: 'Miễn phí 20 credits ban đầu • Không cần thẻ tín dụng',
    },
    footer: {
      tagline: 'Không gian làm việc và khởi tạo trang web thông minh.',
      product: 'Sản phẩm',
      documentation: 'Hướng dẫn',
      terms: 'Điều khoản sử dụng',
      privacy: 'Chính sách bảo mật',
      rights: 'Bản quyền thuộc về Skipli Canvas. Đã đăng ký bản quyền.',
    },
    modal: {
      title: 'Video giới thiệu Skipli Canvas',
      placeholderNote: 'Video giới thiệu chi tiết sẽ sớm được cập nhật tại đây. Bạn có thể đăng ký tài khoản để trải nghiệm trực tiếp ngay bây giờ.',
      close: 'Đóng',
    },
  },
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      comparison: 'Comparison',
      pricing: 'Trial',
      signIn: 'Sign In',
      getStarted: 'Get Started Free',
    },
    hero: {
      badge: 'AI-assisted visual website canvas',
      headlinePart1: 'Bring your website ideas to life',
      headlinePart2: 'from simple natural prompts',
      subheadline:
        'Draft, structure, and visually refine production-ready web interfaces. Save hours of manual setup while keeping total control over your code.',
      ctaPrimary: 'Start with 20 trial credits',
      ctaSecondary: 'Watch preview demo',
      noCardRequired: 'No credit card required • Available immediately after sign up',
      promptPlaceholder: 'Describe the website you want to build...',
      promptTabCafe: 'Coffee Shop',
      promptTabSaaS: 'Software SaaS',
      promptTabStudio: 'Photo Studio',
      promptCafeText: 'Build a landing page for an artisan coffee roastery with drink menu and table reservation.',
      promptSaaSText: 'Build a product page for a team task management tool with clear pricing and feature tiers.',
      promptStudioText: 'Build a clean portfolio page for a photography studio with a photo grid and contact inquiry.',
      canvasLivePreview: 'Live Visual Canvas Preview',
      clickToEditBadge: 'Click any text on canvas to edit directly',
    },
    comparison: {
      sectionTag: 'Practical Perspective',
      title: 'Optimizing your website creation workflow',
      subtitle:
        'Instead of spending days going back and forth between design drafts and code, test your ideas directly on a live canvas.',
      traditionalTitle: 'Traditional Approach',
      traditionalSubtitle: 'Multiple handoffs and time-consuming cycles',
      skipliTitle: 'With Skipli Canvas',
      skipliSubtitle: 'Shorter iterations, focused on your ideas',
      point1Traditional: 'Takes days to draft the initial layout from scratch.',
      point1Skipli: 'Generate a well-structured page layout quickly from your prompt.',
      point2Traditional: 'Changing copy or simple styles requires code adjustments and developer reviews.',
      point2Skipli: 'Double-click any heading or paragraph on the canvas to edit copy directly.',
      point3Traditional: 'Challenging to preview mobile and desktop versions simultaneously during drafting.',
      point3Skipli: 'Switch seamlessly between desktop, tablet, and mobile views in one workspace.',
      point4Traditional: 'Locked into proprietary site builders with recurring platform lock-in fees.',
      point4Skipli: 'Export clean HTML and Tailwind CSS ready to deploy on any host of your choice.',
    },
    features: {
      sectionTag: 'Visual Editing Suite',
      title: 'Full direct control over every pixel on screen',
      subtitle: 'Engineered for practical real-world iteration: edit copy, swap media, and fine-tune layout with zero developer bottleneck.',
      f1Title: 'Click-to-Edit & Floating Toolbar',
      f1Desc: 'Double-click any heading or paragraph on the live page to edit copy in real time with the floating formatting palette.',
      f1Tag: 'In-line Editing',
      f2Title: 'Smart Image Replacer & Card Reorder',
      f2Desc: 'Click any image to upload assets from your desktop or browse Unsplash. Reorder pricing and service cards with simple arrows.',
      f2Tag: 'Smart Media',
      f3Title: 'Section Navigator & Instant Code Inspector',
      f3Desc: 'Open the section drawer to quickly jump between Hero, Menu, and Footer blocks while inspecting clean HTML and Tailwind markup.',
      f3Tag: 'Section Navigator',
      f4Title: 'Time-Machine History & Multi-turn Rollback',
      f4Desc: 'Every prompt adjustment is tracked sequentially. Undo, redo, or roll back to any earlier milestone with 0 risk of losing work.',
      f4Tag: 'Time-Machine History',
    },
    workflow: {
      sectionTag: '4-Step Streamlined Flow',
      title: 'From plain natural prompt to deployable code',
      subtitle: 'A transparent, reliable process that empowers you to launch production-grade pages in minutes.',
      step1Num: '01',
      step1Title: 'Describe your vision',
      step1Desc: 'Type your business context, preferred color palette, and desired structure using conversational natural language.',
      step2Num: '02',
      step2Title: 'Live interactive preview',
      step2Desc: 'Your website renders side-by-side with the chat canvas. Verify responsive layouts on desktop and mobile in real time.',
      step3Num: '03',
      step3Title: 'Visual fine-tuning',
      step3Desc: 'Double-click to rewrite headings, swap brand photos directly from your computer, and adjust component hierarchy visually.',
      step4Num: '04',
      step4Title: 'Export clean HTML package',
      step4Desc: 'Download clean, independent HTML and Tailwind CSS files ready for instant deployment on any web hosting provider.',
    },
    pricing: {
      sectionTag: 'Transparent Quota',
      title: 'Start with our free trial experience',
      subtitle: 'Designed to let you evaluate the tool thoroughly on your terms before making any commitments.',
      cardBadge: 'For New Users',
      planName: 'Starter Experience',
      planPrice: '$0',
      planSuffix: '/ starter',
      planPeriod: '20 Initial Credits',
      planDesc: 'Includes all core capabilities so you can create and explore a complete test website.',
      feature1: '20 Credits credited immediately upon account sign up',
      feature2: 'Manual text and layout editing is 100% credit-free',
      feature3: 'Interactive desktop, tablet, and mobile previews',
      feature4: 'Full version history and instant rollback',
      feature5: 'Full export access to your generated code',
      cta: 'Register to claim 20 credits',
      disclaimer: 'No payment details required to explore the starter experience.',
    },
    finalCta: {
      title: 'Start shaping your website today',
      subtitle: 'Create your account in minutes and experience a responsive, visual approach to web building.',
      button: 'Create Free Account',
      footnote: 'Includes 20 starter credits • No credit card required',
    },
    footer: {
      tagline: 'A focused, intelligent workspace for visual website creation.',
      product: 'Product',
      documentation: 'Documentation',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved. Skipli Canvas.',
    },
    modal: {
      title: 'Skipli Canvas Preview Demo',
      placeholderNote: 'A comprehensive walkthrough video will be available here soon. You can sign up now to explore the live experience directly.',
      close: 'Close',
    },
  },
};

