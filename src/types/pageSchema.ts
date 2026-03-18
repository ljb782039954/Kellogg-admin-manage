// 页面 Schema 类型定义

import { type Translation } from './index';

// 组件类型枚举
export type BlockType =
  | 'carousel'        // 轮播图
  | 'categories'      // 分类导航
  | 'newArrivals'     // 新品上市
  | 'featuredProducts'// 精选商品
  | 'productGrid'     // 商品网格（自定义筛选）
  | 'brandValues'     // 品牌价值
  | 'statistics'      // 数据统计
  | 'testimonials'    // 客户评价
  | 'factoryPreview'  // 工厂预览
  | 'faqPreview'      // FAQ 预览
  | 'textSection'     // 纯文本区块
  | 'imageBanner'     // 图片横幅
  | 'videoSection'    // 视频展示
  | 'imageText'       // 图文组合
  | 'countdown'       // 倒计时促销
  | 'partnerLogos'    // 合作伙伴/品牌墙
  | 'gallery'         // 图片画廊
  | 'featureList'     // 特性列表
  | 'ctaBanner';      // CTA行动号召

// 单个区块定义
export interface PageBlock<T extends BlockProps = BlockProps> {
  id: string;           // 唯一标识
  type: BlockType;      // 组件类型
  enabled: boolean;     // 是否启用
  props: T;             // 组件属性
}

// ============================================
// 各组件的属性类型
// ============================================

// 无额外属性（使用全局数据）
export interface EmptyBlockProps {}

// 轮播图属性
export interface CarouselBlockProps {
  autoPlay?: boolean;
  interval?: number;  // 自动播放间隔（毫秒）
}

// 分类导航属性
export interface CategoriesBlockProps {
  showAll?: boolean;  // 显示全部分类
  maxItems?: number;  // 最多显示数量
}

// 新品上市属性
export interface NewArrivalsBlockProps {
  title?: Translation;
  subtitle?: Translation;
  maxItems?: number;
  layout?: 'grid' | 'slider';
}

// 精选商品属性
export interface FeaturedProductsBlockProps {
  title?: Translation;
  subtitle?: Translation;
  maxItems?: number;
  layout?: 'grid' | 'slider';
}

// 商品网格属性（自定义筛选）
export interface ProductGridBlockProps {
  title: Translation;
  subtitle?: Translation;
  categoryFilter?: string;   // 按分类筛选
  maxItems?: number;
  showMoreLink?: boolean;
  layout?: 'grid' | 'slider';
}

// 品牌价值属性
export interface BrandValuesBlockProps {
  title?: Translation;
  subtitle?: Translation;
}

// 统计数据属性
export interface StatisticsBlockProps {
  title?: Translation;
  backgroundColor?: string;
}

// 客户评价属性
export interface TestimonialsBlockProps {
  title?: Translation;
  subtitle?: Translation;
  maxItems?: number;
}

// 工厂预览属性
export interface FactoryPreviewBlockProps {
  title?: Translation;
  subtitle?: Translation;
  showButton?: boolean;
  buttonText?: Translation;
}

// FAQ 预览属性
export interface FaqPreviewBlockProps {
  title?: Translation;
  subtitle?: Translation;
  maxItems?: number;
  showMoreLink?: boolean;
}

// 文本区块属性
export interface TextSectionBlockProps {
  title: Translation;
  content: Translation;
  alignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  paddingY?: 'small' | 'medium' | 'large';
}

// 图片横幅属性
export interface ImageBannerBlockProps {
  image: string;
  title?: Translation;
  subtitle?: Translation;
  linkUrl?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
  overlay?: boolean;  // 是否显示遮罩
}

// 视频区块属性
export interface VideoSectionBlockProps {
  title?: Translation;
  subtitle?: Translation;
  videoUrl: string;
  posterImage?: string;
  autoPlay?: boolean;
}

// 图文组合属性
export interface ImageTextBlockProps {
  title: Translation;
  content: Translation;
  image: string;
  imagePosition: 'left' | 'right';  // 图片位置
  buttonText?: Translation;
  buttonLink?: string;
  backgroundColor?: string;
}

// 倒计时促销属性
export interface CountdownBlockProps {
  title: Translation;
  subtitle?: Translation;
  endTime: string;  // ISO 日期时间字符串
  backgroundImage?: string;
  backgroundColor?: string;
  buttonText?: Translation;
  buttonLink?: string;
}

// 合作伙伴/品牌墙属性
export interface PartnerLogosBlockProps {
  title?: Translation;
  subtitle?: Translation;
  logos: Array<{
    image: string;
    name: string;
    link?: string;
  }>;
  layout?: 'row' | 'grid';  // 单行滚动或网格
  grayscale?: boolean;  // 是否灰度显示
}

// 图片画廊属性
export interface GalleryBlockProps {
  title?: Translation;
  subtitle?: Translation;
  images: Array<{
    image: string;
    caption?: Translation;
  }>;
  layout?: 'grid' | 'masonry';  // 网格或瀑布流
  columns?: 2 | 3 | 4;
}

// 特性列表属性
export interface FeatureListBlockProps {
  title?: Translation;
  subtitle?: Translation;
  features: Array<{
    icon: string;  // lucide 图标名
    title: Translation;
    description: Translation;
  }>;
  layout?: 'grid' | 'list';  // 网格或列表
  columns?: 2 | 3 | 4;
}

// CTA行动号召属性
export interface CtaBannerBlockProps {
  title: Translation;
  subtitle?: Translation;
  primaryButton: {
    text: Translation;
    link: string;
  };
  secondaryButton?: {
    text: Translation;
    link: string;
  };
  backgroundImage?: string;
  backgroundColor?: string;
  alignment?: 'left' | 'center' | 'right';
}

// 联合类型
export type BlockProps =
  | EmptyBlockProps
  | CarouselBlockProps
  | CategoriesBlockProps
  | NewArrivalsBlockProps
  | FeaturedProductsBlockProps
  | ProductGridBlockProps
  | BrandValuesBlockProps
  | StatisticsBlockProps
  | TestimonialsBlockProps
  | FactoryPreviewBlockProps
  | FaqPreviewBlockProps
  | TextSectionBlockProps
  | ImageBannerBlockProps
  | VideoSectionBlockProps
  | ImageTextBlockProps
  | CountdownBlockProps
  | PartnerLogosBlockProps
  | GalleryBlockProps
  | FeatureListBlockProps
  | CtaBannerBlockProps;

// 区块类型到属性类型的映射
export interface BlockPropsMap {
  carousel: CarouselBlockProps;
  categories: CategoriesBlockProps;
  newArrivals: NewArrivalsBlockProps;
  featuredProducts: FeaturedProductsBlockProps;
  productGrid: ProductGridBlockProps;
  brandValues: BrandValuesBlockProps;
  statistics: StatisticsBlockProps;
  testimonials: TestimonialsBlockProps;
  factoryPreview: FactoryPreviewBlockProps;
  faqPreview: FaqPreviewBlockProps;
  textSection: TextSectionBlockProps;
  imageBanner: ImageBannerBlockProps;
  videoSection: VideoSectionBlockProps;
  imageText: ImageTextBlockProps;
  countdown: CountdownBlockProps;
  partnerLogos: PartnerLogosBlockProps;
  gallery: GalleryBlockProps;
  featureList: FeatureListBlockProps;
  ctaBanner: CtaBannerBlockProps;
}

// ============================================
// 页面 Schema
// ============================================

// 固定页面类型（不可删除）
export type FixedPageType = 'home' | 'all-products' | 'new-arrivals' | 'factory' | 'faq';

// 判断是否为固定页面
export function isFixedPage(pageId: string): boolean {
  const fixedPages: string[] = ['home', 'all-products', 'new-arrivals', 'factory', 'faq'];
  return fixedPages.includes(pageId);
}

export interface PageSchema {
  pageId: string;        // 页面标识：'home' | 'about' | 'custom-xxx'
  slug: string;          // URL 路径，如 '/about-us'、'/services'
  title: Translation;    // 页面标题
  description?: Translation; // 页面描述（用于 SEO）
  blocks: PageBlock[];   // 区块列表（有序）
  isFixed: boolean;      // 是否为固定页面（不可删除）
  createdAt: string;     // 创建时间
  updatedAt: string;     // 最后更新时间
}

// 页面列表项（简化版，用于列表展示）
export interface PageListItem {
  pageId: string;
  slug: string;
  title: Translation;
  isFixed: boolean;
  blocksCount: number;
  updatedAt: string;
}

// ============================================
// 组件元数据
// ============================================

export type ComponentCategory = 'product' | 'marketing' | 'content' | 'media';

export interface ComponentMeta {
  type: BlockType;
  name: Translation;
  description: Translation;
  icon: string;  // lucide 图标名称
  category: ComponentCategory;
  hasGlobalData: boolean;  // 是否使用全局数据
  singleton?: boolean;     // 是否只能添加一次
  defaultProps: BlockProps;
}
