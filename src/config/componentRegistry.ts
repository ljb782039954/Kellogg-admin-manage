// 组件注册表 - 定义所有可用的页面组件

import {
  type BlockType,
  type ComponentMeta,
  type ComponentCategory,
} from '@/types/pageSchema';

// 组件注册表
export const componentRegistry: Record<BlockType, ComponentMeta> = {
  carousel: {
    type: 'carousel',
    name: { zh: '轮播图组件', en: 'Carousel' },
    description: { zh: '全屏轮播横幅，展示主打内容', en: 'Full-width carousel banner' },
    icon: 'Image',
    category: 'media',
    hasGlobalData: true,
    singleton: true,
    defaultProps: { autoPlay: true, interval: 5000 },
  },
  categories: {
    type: 'categories',
    name: { zh: '分类导航组件', en: 'Categories' },
    description: { zh: '商品分类快速入口', en: 'Product category navigation' },
    icon: 'LayoutGrid',
    category: 'product',
    hasGlobalData: true,
    singleton: true,
    defaultProps: { showAll: true },
  },
  newArrivals: {
    type: 'newArrivals',
    name: { zh: '新品组件', en: 'New Arrivals' },
    description: { zh: '展示最新上架的商品', en: 'Display latest products' },
    icon: 'Sparkles',
    category: 'product',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {
      title: { zh: '新品上市', en: 'New Arrivals' },
      maxItems: 8,
      layout: 'slider',
    },
  },
  featuredProducts: {
    type: 'featuredProducts',
    name: { zh: '精选商品组件', en: 'Featured Products' },
    description: { zh: '展示推荐的精选商品', en: 'Display featured products' },
    icon: 'Star',
    category: 'product',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {
      title: { zh: '精选商品', en: 'Featured Products' },
      maxItems: 8,
      layout: 'grid',
    },
  },
  productGrid: {
    type: 'productGrid',
    name: { zh: '商品网格组件', en: 'Product Grid' },
    description: { zh: '自定义商品展示区域', en: 'Custom product display section' },
    icon: 'Grid3X3',
    category: 'product',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '商品展示', en: 'Products' },
      maxItems: 12,
      layout: 'grid',
      showMoreLink: true,
    },
  },
  brandValues: {
    type: 'brandValues',
    name: { zh: '品牌价值组件', en: 'Brand Values' },
    description: { zh: '展示品牌理念和核心价值', en: 'Display brand values' },
    icon: 'Award',
    category: 'marketing',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {},
  },
  statistics: {
    type: 'statistics',
    name: { zh: '数据统计组件', en: 'Statistics' },
    description: { zh: '展示数字成就和统计数据', en: 'Display achievement numbers' },
    icon: 'BarChart3',
    category: 'marketing',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {},
  },
  testimonials: {
    type: 'testimonials',
    name: { zh: '客户评价组件', en: 'Testimonials' },
    description: { zh: '展示客户反馈和评价', en: 'Display customer reviews' },
    icon: 'MessageSquareQuote',
    category: 'marketing',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {
      maxItems: 6,
    },
  },
  factoryPreview: {
    type: 'factoryPreview',
    name: { zh: '工厂介绍组件', en: 'Factory Preview' },
    description: { zh: '工厂介绍入口，链接到详情页', en: 'Factory introduction preview' },
    icon: 'Factory',
    category: 'content',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {
      showButton: true,
      buttonText: { zh: '了解更多', en: 'Learn More' },
    },
  },
  faqPreview: {
    type: 'faqPreview',
    name: { zh: 'FAQ 组件', en: 'FAQ' },
    description: { zh: '展示常见问题列表', en: 'FAQ section' },
    icon: 'HelpCircle',
    category: 'content',
    hasGlobalData: true,
    singleton: true,
    defaultProps: {
      maxItems: 5,
      showMoreLink: true,
    },
  },
  textSection: {
    type: 'textSection',
    name: { zh: '文本组件', en: 'Text Section' },
    description: { zh: '自定义标题和文本内容', en: 'Custom text content section' },
    icon: 'Type',
    category: 'content',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '标题', en: 'Title' },
      content: { zh: '在这里输入内容...', en: 'Enter content here...' },
      alignment: 'center',
      paddingY: 'medium',
    },
  },
  imageBanner: {
    type: 'imageBanner',
    name: { zh: '图片横幅组件', en: 'Image Banner' },
    description: { zh: '单张大图展示', en: 'Single image banner' },
    icon: 'ImageIcon',
    category: 'media',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      image: '',
      height: 'medium',
      overlay: false,
    },
  },
  videoSection: {
    type: 'videoSection',
    name: { zh: '视频组件', en: 'Video Section' },
    description: { zh: '嵌入视频内容', en: 'Embedded video content' },
    icon: 'Video',
    category: 'media',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '视频标题', en: 'Video Title' },
      videoUrl: '',
      autoPlay: false,
    },
  },
  imageText: {
    type: 'imageText',
    name: { zh: '图文组件', en: 'Image & Text' },
    description: { zh: '左右布局的图片与文本组合', en: 'Side-by-side image and text layout' },
    icon: 'LayoutPanelLeft',
    category: 'content',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '标题', en: 'Title' },
      content: { zh: '内容描述', en: 'Content description' },
      image: '',
      imagePosition: 'left',
    },
  },
  countdown: {
    type: 'countdown',
    name: { zh: '倒计时促销组件', en: 'Countdown' },
    description: { zh: '限时活动倒计时，营造紧迫感', en: 'Countdown timer for limited-time events' },
    icon: 'Timer',
    category: 'marketing',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '限时特惠', en: 'Limited Time Offer' },
      endTime: '',
      buttonText: { zh: '立即抢购', en: 'Shop Now' },
    },
  },
  partnerLogos: {
    type: 'partnerLogos',
    name: { zh: '合作伙伴组件', en: 'Partner Logos' },
    description: { zh: '展示合作品牌、媒体报道', en: 'Display partner brands and media coverage' },
    icon: 'Handshake',
    category: 'marketing',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '合作伙伴', en: 'Our Partners' },
      logos: [],
      layout: 'row',
      grayscale: true,
    },
  },
  gallery: {
    type: 'gallery',
    name: { zh: '图片画廊组件', en: 'Gallery' },
    description: { zh: '多图展示，支持网格和瀑布流', en: 'Multi-image display with grid or masonry layout' },
    icon: 'GalleryHorizontal',
    category: 'media',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '图片展示', en: 'Gallery' },
      images: [],
      layout: 'grid',
      columns: 3,
    },
  },
  featureList: {
    type: 'featureList',
    name: { zh: '特性列表组件', en: 'Feature List' },
    description: { zh: '带图标的功能/优势列表', en: 'Feature list with icons' },
    icon: 'ListChecks',
    category: 'content',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '我们的优势', en: 'Our Features' },
      features: [],
      layout: 'grid',
      columns: 3,
    },
  },
  ctaBanner: {
    type: 'ctaBanner',
    name: { zh: 'CTA行动号召组件', en: 'CTA Banner' },
    description: { zh: '醒目的号召横幅，提高转化', en: 'Eye-catching call-to-action banner' },
    icon: 'MousePointerClick',
    category: 'marketing',
    hasGlobalData: false,
    singleton: false,
    defaultProps: {
      title: { zh: '立即行动', en: 'Take Action Now' },
      primaryButton: { text: { zh: '开始', en: 'Get Started' }, link: '' },
      alignment: 'center',
    },
  },
};

// 按分类分组的组件列表
export const componentsByCategory: Record<ComponentCategory, BlockType[]> = {
  product: ['categories', 'newArrivals', 'featuredProducts', 'productGrid'],
  marketing: ['brandValues', 'statistics', 'testimonials', 'countdown', 'partnerLogos', 'ctaBanner'],
  content: ['factoryPreview', 'faqPreview', 'textSection', 'imageText', 'featureList'],
  media: ['carousel', 'imageBanner', 'videoSection', 'gallery'],
};

// 分类显示名称
export const categoryNames: Record<ComponentCategory, { zh: string; en: string }> = {
  product: { zh: '商品展示', en: 'Products' },
  marketing: { zh: '营销推广', en: 'Marketing' },
  content: { zh: '内容区块', en: 'Content' },
  media: { zh: '媒体展示', en: 'Media' },
};

// 获取组件元数据
export function getComponentMeta(type: BlockType): ComponentMeta {
  return componentRegistry[type];
}

// 获取所有组件类型
export function getAllBlockTypes(): BlockType[] {
  return Object.keys(componentRegistry) as BlockType[];
}

// 检查组件是否可以添加（考虑 singleton 限制）
export function canAddBlock(type: BlockType, existingBlocks: { type: BlockType }[]): boolean {
  const meta = componentRegistry[type];
  if (!meta.singleton) return true;
  return !existingBlocks.some(b => b.type === type);
}
