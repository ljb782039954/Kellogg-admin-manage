// 默认页面 Schema 配置

import { type PageSchema, type PageBlock } from '@/types/pageSchema';

// 生成唯一 ID
let idCounter = 0;
function generateId(): string {
  return `block_${Date.now()}_${++idCounter}`;
}

// 创建区块的辅助函数
function createBlock<T extends object>(
  type: PageBlock['type'],
  props: T = {} as T,
  enabled = true
): PageBlock {
  return {
    id: generateId(),
    type,
    enabled,
    props,
  };
}

// 默认首页 Schema
export const defaultHomeSchema: PageSchema = {
  pageId: 'home',
  slug: '/',
  title: { zh: '首页', en: 'Home' },
  description: { zh: '欢迎来到 KELLOGG', en: 'Welcome to KELLOGG' },
  blocks: [
    createBlock('carousel', { autoPlay: true, interval: 5000 }),
    createBlock('categories', { showAll: true }),
    createBlock('newArrivals', {
      title: { zh: '新品上市', en: 'New Arrivals' },
      subtitle: { zh: '发现最新时尚单品', en: 'Discover the latest fashion items' },
      maxItems: 8,
      layout: 'slider',
    }),
    createBlock('brandValues', {
      title: { zh: '我们的品牌理念', en: 'Our Brand Values' },
      subtitle: { zh: '可持续、高品质、以人为本', en: 'Sustainable, High-Quality, People-Centered' },
    }),
    createBlock('featuredProducts', {
      title: { zh: '精选商品', en: 'Featured Products' },
      subtitle: { zh: '为您推荐的优质单品', en: 'Quality items recommended for you' },
      maxItems: 8,
      layout: 'grid',
    }),
    createBlock('statistics', {
      title: { zh: '数据见证实力', en: 'Numbers Speak for Themselves' },
    }),
    createBlock('testimonials', {
      title: { zh: '客户评价', en: 'Customer Reviews' },
      subtitle: { zh: '来自全球客户的真实反馈', en: 'Real feedback from customers worldwide' },
      maxItems: 6,
    }),
  ],
  isFixed: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// 固定页面默认配置
export const fixedPageDefaults: Record<string, Omit<PageSchema, 'blocks'>> = {
  home: {
    pageId: 'home',
    slug: '/',
    title: { zh: '首页', en: 'Home' },
    description: { zh: '欢迎来到 KELLOGG', en: 'Welcome to KELLOGG' },
    isFixed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'all-products': {
    pageId: 'all-products',
    slug: '/products',
    title: { zh: '全部商品', en: 'All Products' },
    description: { zh: '浏览所有商品', en: 'Browse all products' },
    isFixed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'new-arrivals': {
    pageId: 'new-arrivals',
    slug: '/new-arrivals',
    title: { zh: '新品上市', en: 'New Arrivals' },
    description: { zh: '查看最新上架的商品', en: 'Check out our latest products' },
    isFixed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  factory: {
    pageId: 'factory',
    slug: '/factory',
    title: { zh: '工厂介绍', en: 'Our Factory' },
    description: { zh: '了解我们的生产工厂', en: 'Learn about our factory' },
    isFixed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  faq: {
    pageId: 'faq',
    slug: '/faq',
    title: { zh: '常见问题', en: 'FAQ' },
    description: { zh: '常见问题解答', en: 'Frequently Asked Questions' },
    isFixed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// 空白页面 Schema（用于新建动态页面）
export function createEmptyPageSchema(pageId: string, slug: string): PageSchema {
  return {
    pageId,
    slug,
    title: { zh: '新页面', en: 'New Page' },
    description: { zh: '', en: '' },
    blocks: [],
    isFixed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// 获取页面 Schema（从存储或返回默认值）
export function getDefaultSchema(pageId: string): PageSchema {
  if (pageId === 'home') {
    return { ...defaultHomeSchema };
  }

  const fixedDefault = fixedPageDefaults[pageId];
  if (fixedDefault) {
    return { ...fixedDefault, blocks: [] };
  }

  return createEmptyPageSchema(pageId, `/${pageId}`);
}
