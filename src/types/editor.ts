// import type { Translation, NavLink } from "./common";

// ============================================
// blocks预定义组件实体类型 (KV 核心数据结构)
// ============================================

// 品牌价值
// export interface BrandValue {
//   id: number;
//   icon: string;
//   title: Translation;
//   description: Translation;
// }
// export interface BrandValuesProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     items?: BrandValue[];
//   } 
// export interface BrandValuesPropsEditorProps {
//   props: BrandValuesProps;
//   onUpdate: (props: BrandValuesProps) => void;
// }

// // 可选图标列表
// export const iconOptions = [
//   { value: 'Leaf', label: '🌿 环保 (Eco)' },
//   { value: 'Heart', label: '❤️ 爱心 (Quality)' },
//   { value: 'Star', label: '⭐ 星星 (Expert)' },
//   { value: 'Shield', label: '🛡️ 盾牌 (Safe)' },
//   { value: 'Award', label: '🏆 奖杯 (Award)' },
//   { value: 'Users', label: '👥 用户 (Partner)' },
//   { value: 'Globe', label: '🌍 地球 (Global)' },
//   { value: 'Zap', label: '⚡ 闪电 (Fast)' },
// ];


// 轮播图
// export interface CarouselValues {
//   id: number;
//   image: string;
//   title: Translation;
//   subtitle?: Translation;
//   cta?: Translation;
//   link: NavLink;
// }
// export interface CarouselProps {
//     autoPlay?: boolean;
//     interval?: number;
//     items?: CarouselValues[];
//   };
// export interface CarouselPropsEditorProps {
//   props: CarouselProps;
//   onUpdate: (props: CarouselProps) => void;
// }


// 分类
// export interface CategoriesProps {
//     showAll?: boolean;
//     maxItems?: number;
//   };
// export interface CategoriesPropsEditorProps {
//   props: CategoriesProps;
//   onUpdate: (props: CategoriesProps) => void;
// }

// 倒计时
// export interface CountdownValues {
//     endTime?: string;
//     backgroundImage?: string;
// }
// export interface CountdownProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     values?: CountdownValues;
//   };
// export interface CountdownPropsEditorProps {
//   props: CountdownProps;
//   onUpdate: (props: CountdownProps) => void;
// }

// CtaBanner

// export interface CtaBannerValues {
//   primaryButton?: NavLink;
//   secondaryButton?: NavLink;
//   backgroundImage?: string;
//   backgroundColor?: string;
//   alignment?: 'left' | 'center' | 'right';
// }
// export interface CtaBannerProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     values?: CtaBannerValues;
//   };
// export interface CtaBannerPropsEditorProps {
//   props: CtaBannerProps;
//   onUpdate: (props: CtaBannerProps) => void;
// }

// 常见问题

// export interface FAQItem {
//   id: number;
//   question: Translation;
//   answer: Translation;
// }

// export interface FAQProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     items?: FAQItem[];
//   };
// export interface FAQPropsEditorPropsEditorProps {
//   props: FAQProps;
//   onUpdate: (props: FAQProps) => void;
// }

// 精选商品
// export interface FeaturedProductsProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     maxItems?: number;
//     // layout?: 'grid' | 'slider';
//   };
// export interface FeaturedProductsPropsEditorProps {
//   props: FeaturedProductsProps;
//   onUpdate: (props: FeaturedProductsProps) => void;
// }


// 特性列表
// 常用图标列表
// export const commonFeatureIcons = [
//   'Truck', 'RotateCcw', 'Shield', 'Headphones', 'CreditCard', 'Gift',
//   'Star', 'Heart', 'Check', 'Award', 'Zap', 'Clock',
//   'ThumbsUp', 'Lock', 'Globe', 'Users', 'Package', 'Sparkles',
// ];

// export interface FeatureListValues {
//   icon: string;
//   title: { zh: string; en: string };
//   description: { zh: string; en: string };
// }
// export interface FeatureListProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     items?: FeatureListValues[];
//     // layout?: 'grid' | 'list';
//     // columns?: 2 | 3 | 4;
//   };
// export interface FeatureListPropsEditorProps {
//   props: FeatureListProps;
//   onUpdate: (props: FeatureListProps) => void;
// }

// 画廊

// export interface GalleryValues {
//   src: string;
//   caption?: { zh: string; en: string };
// }

// export interface GalleryProps {
//     title?: { zh: string; en: string };
//     subtitle?: { zh: string; en: string };
//     items?: GalleryValues[];
//     // layout?: 'grid' | 'masonry';
//     // columns?: 2 | 3 | 4;
//   };

// export interface GalleryPropsEditorProps {
//   props: GalleryProps;
//   onUpdate: (props: GalleryProps) => void;
// }

// 单张大图  -------  新增/20260501 
// export interface ImageFullProps {
//     image?: string;
//     description?: Translation;
//     alt?: Translation;
//     width?: 'small' | 'medium' | 'large' | 'full';
//     height?: 'small' | 'medium' | 'large' | 'full';
//     overlay?: boolean;
// };

// export interface ImageFullPropsEditorProps {
//   props: ImageFullProps;
//   onUpdate: (props: ImageFullProps) => void;
// }


// 图片横幅 -------
// export interface ImageBannerProps {
//     image?: string;
//     title?: Translation;
//     subtitle?: Translation;
//     buttonText?: Translation;
//     linkUrl?: string;
//     height?: 'small' | 'medium' | 'large' | 'full';
//     overlay?: boolean;
//   };

// export interface ImageBannerPropsEditorProps {
//   props: ImageBannerProps;
//   onUpdate: (props: ImageBannerProps) => void;
// }

// 图片横幅带 tag -------
// export interface ImageBannerTagProps {
//   image?: string;
//   tag?: Translation;
//   title?: Translation;
//   subtitle?: Translation;
// }


// 图文组件
// export interface ImageTextProps {
//   title?: { zh: string; en: string };
//   content?: { zh: string; en: string };
//   image?: string;
//   imagePosition?: 'left' | 'right';
//   buttonText?: { zh: string; en: string };
//   buttonLink?: string;
// }

// 新品
// export interface NewArrivalsProps {
//   title?: { zh: string; en: string };
//   subtitle?: { zh: string; en: string };
//   maxItems?: number;
//   // layout?: 'grid' | 'slider';
// }


// 合作伙伴

// export interface Partner {
//   logo: string;
//   name: string;
//   color?: string;
//   link?: string;
// }

// export interface PartnerProps {
//   title?: { zh: string; en: string };
//   subtitle?: { zh: string; en: string };
//   items?: Partner[];
//   // layout?: 'row' | 'grid';
// }


// 产品网格
// export interface ProductGridProps {
//   itemsPerPage?: number;
// }


// 统计数据

// export interface Statistic {
//   id: number;
//   value: string;
//   label: Translation;
// }
// export interface StatisticProps {
//   title?: { zh: string; en: string };
//   subtitle?: { zh: string; en: string };
//   items?: Statistic[];
// }

// 客户评价

// export interface Testimonial {
//   id: number;
//   name: Translation;
//   role?: Translation;
//   content: Translation;
//   avatar?: string;
// }
// export interface TestimonialProps {
//   title?: { zh: string; en: string };
//   subtitle?: { zh: string; en: string };
//   maxItems?: number;
//   items?: Testimonial[];
// }

// 文本区块----------------
// export interface TextSectionProps {
//   title?: Translation;
//   content?: Translation;
//   alignment?: 'left' | 'center' | 'right';
//   paddingY?: 'small' | 'medium' | 'large';
//   backgroundColor?: string;
// }

// 视频区块-----------------
// export interface VideoSectionValues {
//   videoUrl?: string;
//   posterImage?: string;
//   autoPlay?: boolean;
//   loop?: boolean;
// }
// export interface VideoSectionProps {
//   title?: Translation;
//   subtitle?: Translation;
//   videoUrl?: string; // Also support flat structure
//   values?: VideoSectionValues;
// }

