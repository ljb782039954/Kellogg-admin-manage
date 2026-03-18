// placeholder 内容 - 仅用于组件占位展示和编辑器提示
import type { SiteContent, Product, FooterContent } from '../types';

// 占位商品数据
export const placeholderProducts: Product[] = [
  {
    id: 1,
    name: { zh: '商品名称', en: 'Product Name' },
    price: 299,
    originalPrice: 399,
    image: '',
    tag: { zh: '标签', en: 'Tag' },
    category: 'tops',
    rating: 4.5,
    sales: 100,
    releaseDate: '2024-01-01',
  },
];

// 占位轮播图数据
export const placeholderCarousel = {
  slides: [
    {
      image: '',
      title: { zh: '轮播图标题', en: 'Carousel Title' },
      subtitle: { zh: '轮播图副标题描述文字', en: 'Carousel subtitle description' },
      cta: { zh: '按钮文字', en: 'Button Text' },
    },
  ],
};

// 占位品牌价值数据
export const placeholderBrandValues = {
  title: { zh: '品牌价值', en: 'Brand Values' },
  subtitle: { zh: '我们坚持的理念', en: 'What We Stand For' },
  values: [
    {
      icon: 'Award',
      title: { zh: '价值标题', en: 'Value Title' },
      description: { zh: '价值描述内容', en: 'Value description' },
    },
  ],
};

// 占位统计数据
export const placeholderStatistics = {
  title: { zh: '数据统计', en: 'Statistics' },
  stats: [
    { value: '10+', label: { zh: '统计项标签', en: 'Stat Label' } },
  ],
};

// 占位客户评价数据
export const placeholderTestimonials = {
  title: { zh: '客户评价', en: 'Testimonials' },
  subtitle: { zh: '用户反馈', en: 'User Feedback' },
  items: [
    {
      id: 1,
      name: { zh: '用户名称', en: 'User Name' },
      role: { zh: '用户角色', en: 'User Role' },
      content: { zh: '评价内容', en: 'Review content' },
      avatar: '',
    },
  ],
};

// 占位精选商品数据
export const placeholderFeaturedProducts = {
  title: { zh: '精选商品', en: 'Featured' },
  subtitle: { zh: '推荐商品', en: 'Recommended' },
  items: placeholderProducts,
};

// 占位新品数据
export const placeholderNewArrivals = {
  title: { zh: '新品上市', en: 'New Arrivals' },
  subtitle: { zh: '最新款式', en: 'Latest Styles' },
};

// 占位分类数据
export const placeholderCategories = [
  { id: 'all', name: { zh: '全部', en: 'All' } },
  { id: 'tops', name: { zh: '上装', en: 'Tops' } },
  { id: 'bottoms', name: { zh: '下装', en: 'Bottoms' } },
];

// 占位工厂数据
export const placeholderFactory = {
  heroImage: '',
  heroTitle: { zh: '工厂介绍', en: 'Our Factory' },
  heroSubtitle: { zh: '了解我们的生产流程', en: 'Learn about our process' },
  sections: [
    {
      image: '',
      title: { zh: '板块标题', en: 'Section Title' },
      content: { zh: '板块内容描述', en: 'Section content description' },
    },
  ],
};

// 占位 FAQ 数据
export const placeholderFAQ = {
  title: { zh: '常见问题', en: 'FAQ' },
  subtitle: { zh: '帮助中心', en: 'Help Center' },
  items: [
    {
      id: 1,
      question: { zh: '问题示例？', en: 'Sample question?' },
      answer: { zh: '答案示例内容', en: 'Sample answer content' },
    },
  ],
};

// 占位页脚数据
export const placeholderFooter: FooterContent = {
  linkGroups: [
    {
      title: { zh: '链接分组', en: 'Link Group' },
      links: [
        { name: { zh: '链接名称', en: 'Link Name' }, href: '/', linkType: 'internal' },
      ],
    },
  ],
  newsletterPlaceholder: { zh: '输入邮箱', en: 'Enter email' },
  newsletterButton: { zh: '订阅', en: 'Subscribe' },
};

// 占位文本区块数据
export const placeholderTextSection = {
  title: { zh: '文本区块标题', en: 'Text Section Title' },
  content: { zh: '在这里输入您的文本内容...', en: 'Enter your text content here...' },
  alignment: 'center' as const,
  paddingY: 'medium' as const,
};

// 占位图片横幅数据
export const placeholderImageBanner = {
  image: '',
  title: { zh: '图片标题', en: 'Image Title' },
  subtitle: { zh: '图片描述文字', en: 'Image description' },
  height: 'medium' as const,
  overlay: false,
};

// 占位视频区块数据
export const placeholderVideoSection = {
  title: { zh: '视频标题', en: 'Video Title' },
  videoUrl: '',
  autoPlay: false,
};

// 占位商品网格数据
export const placeholderProductGrid = {
  title: { zh: '商品展示', en: 'Products' },
  maxItems: 12,
  layout: 'grid' as const,
  showMoreLink: true,
  category: 'all',
};

// 占位图文组件数据
export const placeholderImageText = {
  title: { zh: '图文标题', en: 'Image Text Title' },
  content: { zh: '在这里输入描述内容...', en: 'Enter description here...' },
  image: '',
  imagePosition: 'left' as const,
  buttonText: { zh: '了解更多', en: 'Learn More' },
  buttonLink: '',
};

// 占位倒计时促销数据
export const placeholderCountdown = {
  title: { zh: '限时特惠', en: 'Limited Time Offer' },
  subtitle: { zh: '活动即将结束', en: 'Sale ending soon' },
  endTime: '',
  buttonText: { zh: '立即抢购', en: 'Shop Now' },
  buttonLink: '',
};

// 占位合作伙伴数据
export const placeholderPartnerLogos = {
  title: { zh: '合作伙伴', en: 'Our Partners' },
  subtitle: { zh: '与知名品牌携手共进', en: 'Working with renowned brands' },
  logos: [],
  layout: 'row' as const,
  grayscale: true,
};

// 占位图片画廊数据
export const placeholderGallery = {
  title: { zh: '图片展示', en: 'Gallery' },
  subtitle: { zh: '浏览更多图片', en: 'Browse more images' },
  images: [],
  layout: 'grid' as const,
  columns: 3 as const,
};

// 占位特性列表数据
export const placeholderFeatureList = {
  title: { zh: '我们的优势', en: 'Our Features' },
  subtitle: { zh: '为您提供最优质的服务', en: 'Providing the best service' },
  features: [],
  layout: 'grid' as const,
  columns: 3 as const,
};

// 占位CTA行动号召数据
export const placeholderCtaBanner = {
  title: { zh: '立即行动', en: 'Take Action Now' },
  subtitle: { zh: '不要错过这个机会', en: "Don't miss this opportunity" },
  primaryButton: { text: { zh: '开始', en: 'Get Started' }, link: '' },
  alignment: 'center' as const,
};

// 完整站点内容占位（用于兼容旧代码）
export const placeholderContent: SiteContent = {
  header: {
    logoText: { zh: 'LOGO', en: 'LOGO' },
    navItems: [
      { name: { zh: '首页', en: 'Home' }, href: '/', linkType: 'internal' },
      { name: { zh: '商品', en: 'Products' }, href: '/products', linkType: 'internal' },
    ],
  },
  home: {
    carousel: placeholderCarousel,
    brandValues: placeholderBrandValues,
    statistics: placeholderStatistics,
    testimonials: placeholderTestimonials,
    featuredProducts: placeholderFeaturedProducts,
  },
  products: {
    title: { zh: '全部商品', en: 'All Products' },
    subtitle: { zh: '浏览商品', en: 'Browse Products' },
    categories: placeholderCategories,
    sortOptions: [
      { id: 'newest', name: { zh: '最新', en: 'Newest' } },
      { id: 'price-asc', name: { zh: '价格升序', en: 'Price Low-High' } },
    ],
    itemsPerPage: 12,
  },
  newArrivals: placeholderNewArrivals,
  factory: placeholderFactory,
  faq: placeholderFAQ,
  footer: placeholderFooter,
};

// Admin 凭证（开发用）
export const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};
