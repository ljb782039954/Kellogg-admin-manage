// 链接选择组件 - 支持内部页面链接和外部链接

import { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { LinkType, NavLink, Translation } from '@/types';
import type { PageSchema } from '@/types/pageSchema';
import { fixedPageDefaults } from '@/config/defaultPageSchemas';

// localStorage 键名
const PAGES_INDEX_KEY = 'pages_index';
const getPageStorageKey = (pageId: string) => `page_schema_${pageId}`;

// 页面选项
interface PageOption {
  pageId: string;
  slug: string;
  title: Translation;
  isFixed: boolean;
}

// 获取所有可用页面
function getAllPages(): PageOption[] {
  const pages: PageOption[] = [];

  // 1. 加载固定页面
  Object.keys(fixedPageDefaults).forEach((pageId) => {
    const defaults = fixedPageDefaults[pageId];
    const stored = localStorage.getItem(getPageStorageKey(pageId));
    if (stored) {
      try {
        const schema: PageSchema = JSON.parse(stored);
        pages.push({
          pageId: schema.pageId,
          slug: schema.slug,
          title: schema.title,
          isFixed: true,
        });
      } catch {
        pages.push({
          pageId: defaults.pageId,
          slug: defaults.slug,
          title: defaults.title,
          isFixed: true,
        });
      }
    } else {
      pages.push({
        pageId: defaults.pageId,
        slug: defaults.slug,
        title: defaults.title,
        isFixed: true,
      });
    }
  });

  // 2. 加载动态页面
  const pagesIndex = localStorage.getItem(PAGES_INDEX_KEY);
  if (pagesIndex) {
    try {
      const dynamicPageIds: string[] = JSON.parse(pagesIndex);
      dynamicPageIds.forEach((pageId) => {
        if (!fixedPageDefaults[pageId]) {
          const stored = localStorage.getItem(getPageStorageKey(pageId));
          if (stored) {
            try {
              const schema: PageSchema = JSON.parse(stored);
              pages.push({
                pageId: schema.pageId,
                slug: schema.slug,
                title: schema.title,
                isFixed: false,
              });
            } catch {
              // 忽略解析失败的页面
            }
          }
        }
      });
    } catch {
      // 忽略索引解析失败
    }
  }

  return pages;
}

// 检查页面是否存在
function checkPageExists(href: string, pages: PageOption[]): boolean {
  // 内部链接格式为 pageId 或 slug
  return pages.some((p) => p.pageId === href || p.slug === href);
}

interface LinkSelectorProps {
  value: NavLink;
  onChange: (value: NavLink) => void;
}

export default function LinkSelector({ value, onChange }: LinkSelectorProps) {
  const [pages, setPages] = useState<PageOption[]>([]);
  const [pageDeleted, setPageDeleted] = useState(false);

  // 加载页面列表
  useEffect(() => {
    const loadedPages = getAllPages();
    setPages(loadedPages);

    // 检查当前链接的页面是否已被删除
    if (value.linkType === 'internal' && value.href) {
      const exists = checkPageExists(value.href, loadedPages);
      setPageDeleted(!exists);
      if (!exists && !value.pageDeleted) {
        onChange({ ...value, pageDeleted: true });
      }
    }
  }, [value.href, value.linkType]);

  // 更新链接类型
  const handleTypeChange = (type: LinkType) => {
    onChange({
      ...value,
      linkType: type,
      href: '',
      pageDeleted: false,
    });
    setPageDeleted(false);
  };

  // 更新内部链接
  const handlePageChange = (pageId: string) => {
    const page = pages.find((p) => p.pageId === pageId);
    onChange({
      ...value,
      href: page?.slug || pageId,
      pageDeleted: false,
    });
    setPageDeleted(false);
  };

  // 更新外部链接
  const handleUrlChange = (url: string) => {
    onChange({
      ...value,
      href: url,
      pageDeleted: false,
    });
  };

  return (
    <div className="space-y-3">
      {/* 链接类型选择 */}
      <div className="space-y-2">
        <Label>链接类型</Label>
        <Select value={value.linkType} onValueChange={(v) => handleTypeChange(v as LinkType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internal">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                内部页面
              </div>
            </SelectItem>
            <SelectItem value="external">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                外部链接
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 链接内容 */}
      {value.linkType === 'internal' ? (
        <div className="space-y-2">
          <Label>选择页面</Label>
          <Select
            value={pages.find((p) => p.slug === value.href)?.pageId || value.href || ''}
            onValueChange={handlePageChange}
          >
            <SelectTrigger className={pageDeleted ? 'border-red-500' : ''}>
              <SelectValue placeholder="选择一个页面" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.pageId} value={page.pageId}>
                  <div className="flex items-center gap-2">
                    <span>{page.title.zh}</span>
                    <span className="text-gray-400 text-xs">{page.slug}</span>
                    {page.isFixed && (
                      <Badge variant="secondary" className="text-xs">固定</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 页面已删除警告 */}
          {pageDeleted && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
              <AlertTriangle className="w-4 h-4" />
              <span>该页面已被删除，请更新链接</span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label>外部链接地址</Label>
          <Input
            type="url"
            value={value.href}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com"
          />
          <p className="text-xs text-gray-500">请输入完整的 URL，包括 https://</p>
        </div>
      )}
    </div>
  );
}

// 导出工具函数
export { getAllPages, checkPageExists };
