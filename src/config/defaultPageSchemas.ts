// 默认页面 Schema 配置 (配合积木块系统)
import { type CustomPage, type PageBlock } from '@/types';
import { nanoid } from 'nanoid';

// 创建区块的辅助函数
export function createBlock(
  type: PageBlock['type'],
  content: any = {},
  isVisible = true
): PageBlock {
  return {
    id: `block_${nanoid(8)}`,
    type,
    content,
    isVisible,
  };
}

// 默认页面列表 (固定系统页面)
export const initialPages: CustomPage[] = [
  {
    id: 'home',
    path: '/',
    title: { zh: '首页', en: 'Home' },
    isFixed: true,
    blocks: [],
    seo: {
      title: { zh: '首页 | KELLOGG', en: 'Home | KELLOGG' },
      description: { zh: 'KELLOGG 官方网站 - 极简主义美学', en: 'KELLOGG Official Website - Minimalist Aesthetics' },
    }
  },
  {
    id: 'all-products',
    path: '/products',
    title: { zh: '产品展示', en: 'Products' },
    isFixed: true,
    blocks: [],
    seo: {
      title: { zh: '产品展示 | KELLOGG', en: 'Products | KELLOGG' },
      description: { zh: '浏览我们的最新产品系列', en: 'Browse our latest collections' },
    }
  },
  {
    id: 'about',
    path: '/about',
    title: { zh: '关于我们', en: 'About Us' },
    isFixed: true,
    blocks: [],
    seo: {
      title: { zh: '关于我们 | KELLOGG', en: 'About Us | KELLOGG' },
      description: { zh: '了解 KELLOGG 的品牌故事与核心价值观', en: 'Learn about the brand story and core values of KELLOGG' },
    }
  },
];

// 创建空白动态页面
export function createEmptyPage(id: string, path: string, title?: { zh: string; en: string }): CustomPage {
  const pageTitle = title || { zh: '新页面', en: 'New Page' };
  return {
    id,
    path: path.startsWith('/') ? path : `/${path}`,
    title: pageTitle,
    isFixed: false,
    blocks: [],
    seo: {
      title: { ...pageTitle },
      description: { zh: '', en: '' },
    }
  };
}
