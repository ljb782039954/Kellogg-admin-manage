// 动态页面管理 - 页面列表视图

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import {
  Plus,
  Trash2,
  Edit,
  FileText,
  Lock,
  ExternalLink,
  Search,
} from 'lucide-react';
import { type PageSchema, type PageListItem, isFixedPage } from '@/types/pageSchema';
import { fixedPageDefaults, createEmptyPageSchema } from '@/config/defaultPageSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import BilingualInput from '../components/BilingualInput';

// localStorage 键名
const PAGES_INDEX_KEY = 'pages_index'; // 存储页面 ID 列表
const getPageStorageKey = (pageId: string) => `page_schema_${pageId}`;

export function DynamicPagesManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deletePageId, setDeletePageId] = useState<string | null>(null);

  // 新页面表单状态
  const [newPageTitle, setNewPageTitle] = useState({ zh: '', en: '' });
  const [newPageSlug, setNewPageSlug] = useState('');

  // 加载页面列表
  const loadPages = useCallback(() => {
    const pagesList: PageListItem[] = [];

    // 1. 加载固定页面
    Object.keys(fixedPageDefaults).forEach((pageId) => {
      const storageKey = getPageStorageKey(pageId);
      const stored = localStorage.getItem(storageKey);
      const defaults = fixedPageDefaults[pageId];

      if (stored) {
        try {
          const schema: PageSchema = JSON.parse(stored);
          pagesList.push({
            pageId: schema.pageId,
            slug: schema.slug,
            title: schema.title,
            isFixed: true,
            blocksCount: schema.blocks.length,
            updatedAt: schema.updatedAt,
          });
        } catch {
          // 使用默认值
          pagesList.push({
            pageId: defaults.pageId,
            slug: defaults.slug,
            title: defaults.title,
            isFixed: true,
            blocksCount: 0,
            updatedAt: defaults.updatedAt,
          });
        }
      } else {
        // 固定页面还没有保存过，使用默认值
        pagesList.push({
          pageId: defaults.pageId,
          slug: defaults.slug,
          title: defaults.title,
          isFixed: true,
          blocksCount: 0,
          updatedAt: defaults.updatedAt,
        });
      }
    });

    // 2. 加载动态页面
    const pagesIndex = localStorage.getItem(PAGES_INDEX_KEY);
    if (pagesIndex) {
      try {
        const dynamicPageIds: string[] = JSON.parse(pagesIndex);
        dynamicPageIds.forEach((pageId) => {
          if (!isFixedPage(pageId)) {
            const storageKey = getPageStorageKey(pageId);
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              try {
                const schema: PageSchema = JSON.parse(stored);
                pagesList.push({
                  pageId: schema.pageId,
                  slug: schema.slug,
                  title: schema.title,
                  isFixed: false,
                  blocksCount: schema.blocks.length,
                  updatedAt: schema.updatedAt,
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

    // 按更新时间排序（最新的在前）
    pagesList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    setPages(pagesList);
  }, []);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  // 创建新页面
  const handleCreatePage = useCallback(() => {
    if (!newPageTitle.zh.trim() || !newPageSlug.trim()) {
      toast({
        title: '请填写完整信息',
        description: '页面标题（中文）和 URL 路径不能为空',
        variant: 'destructive',
      });
      return;
    }

    // 检查 slug 是否已存在
    const slugExists = pages.some((p) => p.slug === `/${newPageSlug.replace(/^\//, '')}`);
    if (slugExists) {
      toast({
        title: 'URL 路径已存在',
        description: '请使用其他 URL 路径',
        variant: 'destructive',
      });
      return;
    }

    // 生成唯一 ID
    const pageId = `page_${nanoid(8)}`;
    const slug = `/${newPageSlug.replace(/^\//, '')}`;

    // 创建新页面 Schema
    const newSchema: PageSchema = {
      ...createEmptyPageSchema(pageId, slug),
      title: {
        zh: newPageTitle.zh.trim(),
        en: newPageTitle.en.trim() || newPageTitle.zh.trim(),
      },
    };

    // 保存到 localStorage
    localStorage.setItem(getPageStorageKey(pageId), JSON.stringify(newSchema));

    // 更新页面索引
    const pagesIndex = localStorage.getItem(PAGES_INDEX_KEY);
    const dynamicPageIds: string[] = pagesIndex ? JSON.parse(pagesIndex) : [];
    dynamicPageIds.push(pageId);
    localStorage.setItem(PAGES_INDEX_KEY, JSON.stringify(dynamicPageIds));

    // 重置表单
    setNewPageTitle({ zh: '', en: '' });
    setNewPageSlug('');
    setIsCreateDialogOpen(false);

    // 重新加载列表
    loadPages();

    toast({
      title: '页面创建成功',
      description: `已创建页面「${newPageTitle.zh}」`,
    });

    // 跳转到编辑页面
    navigate(`/pages/${pageId}/edit`);
  }, [newPageTitle, newPageSlug, pages, loadPages, navigate, toast]);

  // 删除页面
  const handleDeletePage = useCallback(() => {
    if (!deletePageId) return;

    // 检查是否是固定页面
    if (isFixedPage(deletePageId)) {
      toast({
        title: '无法删除',
        description: '固定页面不能被删除',
        variant: 'destructive',
      });
      setDeletePageId(null);
      return;
    }

    // 删除页面数据
    localStorage.removeItem(getPageStorageKey(deletePageId));

    // 更新页面索引
    const pagesIndex = localStorage.getItem(PAGES_INDEX_KEY);
    if (pagesIndex) {
      const dynamicPageIds: string[] = JSON.parse(pagesIndex);
      const updatedIds = dynamicPageIds.filter((id) => id !== deletePageId);
      localStorage.setItem(PAGES_INDEX_KEY, JSON.stringify(updatedIds));
    }

    setDeletePageId(null);
    loadPages();

    toast({
      title: '删除成功',
      description: '页面已删除',
    });
  }, [deletePageId, loadPages, toast]);

  // 进入编辑页面
  const handleEditPage = useCallback((pageId: string) => {
    navigate(`/pages/${pageId}/edit`);
  }, [navigate]);

  // 过滤页面列表
  const filteredPages = pages.filter((page) => {
    const query = searchQuery.toLowerCase();
    return (
      page.title.zh.toLowerCase().includes(query) ||
      page.title.en.toLowerCase().includes(query) ||
      page.slug.toLowerCase().includes(query)
    );
  });

  // 分离固定页面和动态页面
  const fixedPages = filteredPages.filter((p) => p.isFixed);
  const dynamicPages = filteredPages.filter((p) => !p.isFixed);

  return (
    <div className="space-y-6">
      {/* 页面标题和操作区 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">页面管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            管理网站页面，添加或编辑页面内容和组件
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          创建新页面
        </Button>
      </div>

      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="搜索页面..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 固定页面列表 */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          固定页面
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          这些是网站的核心页面，不能被删除，但可以编辑页面内容
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fixedPages.map((page) => (
            <PageCard
              key={page.pageId}
              page={page}
              onEdit={() => handleEditPage(page.pageId)}
              onDelete={() => {}} // 固定页面不能删除
            />
          ))}
        </div>
      </div>

      {/* 动态页面列表 */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          动态页面
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          自定义页面，可以自由创建、编辑和删除
        </p>
        {dynamicPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dynamicPages.map((page) => (
              <PageCard
                key={page.pageId}
                page={page}
                onEdit={() => handleEditPage(page.pageId)}
                onDelete={() => setDeletePageId(page.pageId)}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-sm">还没有动态页面</p>
              <p className="text-xs mt-1">点击「创建新页面」按钮开始</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 创建页面弹窗 */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新页面</DialogTitle>
            <DialogDescription>
              创建一个新的动态页面，您可以在页面中添加各种组件
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>页面标题</Label>
              <BilingualInput
                value={newPageTitle}
                onChange={setNewPageTitle}
                placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL 路径</Label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">/</span>
                <Input
                  id="slug"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value.replace(/[^a-z0-9-]/gi, '-').toLowerCase())}
                  placeholder="about-us"
                />
              </div>
              <p className="text-xs text-gray-500">
                只能使用小写字母、数字和连字符
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreatePage}>创建页面</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认弹窗 */}
      <AlertDialog open={!!deletePageId} onOpenChange={() => setDeletePageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将永久删除该页面及其所有内容，无法恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// 页面卡片组件
interface PageCardProps {
  page: PageListItem;
  onEdit: () => void;
  onDelete: () => void;
}

function PageCard({ page, onEdit, onDelete }: PageCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{page.title.zh}</CardTitle>
            {page.title.en && page.title.en !== page.title.zh && (
              <CardDescription className="truncate">{page.title.en}</CardDescription>
            )}
          </div>
          {page.isFixed && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              <Lock className="w-3 h-3 mr-1" />
              固定
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ExternalLink className="w-4 h-4" />
          <span className="truncate">{page.slug}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{page.blocksCount} 个组件</span>
          <span>{formatDate(page.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1" />
            编辑
          </Button>
          {!page.isFixed && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DynamicPagesManager;
