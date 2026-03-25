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
  },
  {
    id: 'all-products',
    path: '/products',
    title: { zh: '产品展示', en: 'Products' },
    isFixed: true,
    blocks: [],
  },
  {
    id: 'about',
    path: '/about',
    title: { zh: '关于我们', en: 'About Us' },
    isFixed: true,
    blocks: [],
  },
];

// 创建空白动态页面
export function createEmptyPage(id: string, path: string, title?: { zh: string; en: string }): CustomPage {
  return {
    id,
    path: path.startsWith('/') ? path : `/${path}`,
    title: title || { zh: '新页面', en: 'New Page' },
    isFixed: false,
    blocks: [],
  };
}
