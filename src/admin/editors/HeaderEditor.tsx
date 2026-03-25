// Header 组件管理编辑器

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, AlertTriangle, Globe, Share2, Menu, Loader2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BilingualInput from '../components/BilingualInput';
import LinkSelector from '../components/LinkSelector';
import { checkPageExists } from '@/lib/linkUtils';
import type { NavLink, HeaderContent, Translation } from '@/types';
import siteSettings from '@/config/siteSettings.json';
import { getPreviewUrl } from '@/lib/utils';

// Header 预览组件
function HeaderPreview({ header, language }: { header: HeaderContent; language: 'zh' | 'en' }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          预览效果
          <Badge variant="outline" className="ml-2">{language === 'zh' ? '中文' : 'English'}</Badge>
        </CardTitle>
        <CardDescription>在浏览器中的实际显示效果</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* 模拟 Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {siteSettings.brand.logo && (
                <img
                  src={getPreviewUrl(siteSettings.brand.logo)}
                  alt="Logo"
                  className="w-8 h-8 object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-xl font-bold text-gray-800">
                {siteSettings.brand.name[language]}
              </span>
            </div>

            {/* 导航菜单 */}
            <nav className="hidden md:flex items-center gap-6">
              {header.navItems.map((item, index) => (
                <span
                  key={index}
                  className={`text-sm font-medium transition-colors ${item.pageDeleted
                    ? 'text-red-500 line-through'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item.name[language]}
                </span>
              ))}
            </nav>

            {/* 右侧操作 */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 border border-gray-200">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200">
                <Globe className="w-4 h-4" />
                {language === 'zh' ? '中文' : 'EN'}
              </button>
              <button className="md:hidden p-2 text-gray-600">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HeaderEditor() {
  const { content, updateHeader, isLoading: contextLoading } = useContent();
  const [localHeader, setLocalHeader] = useState<HeaderContent>(content.header);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDeletedPages, setHasDeletedPages] = useState(false);
  const [previewLang, setPreviewLang] = useState<'zh' | 'en'>('zh');

  // 从 context 同步数据
  useEffect(() => {
    setLocalHeader(content.header);
  }, [content.header]);

  // 检查是否有已删除的页面链接
  useEffect(() => {
    const hasDeleted = localHeader.navItems.some(
      (item) => !checkPageExists(item.href, item.linkType, content.pages)
    );
    setHasDeletedPages(hasDeleted);
  }, [localHeader.navItems, content.pages]);

  // 将旧格式转换为新格式
  useEffect(() => {
    const needsConversion = localHeader.navItems.some((item) => !('linkType' in item));
    if (needsConversion) {
      const convertedItems = localHeader.navItems.map((item) => ({
        ...item,
        linkType: (item.href?.startsWith('http') ? 'external' : 'internal') as 'internal' | 'external',
      }));
      setLocalHeader({ ...localHeader, navItems: convertedItems });
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await updateHeader(localHeader);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setIsSaving(false);
    }
  };

  const addNavItem = () => {
    const newItem: NavLink = {
      id: Date.now().toString(), // TODO: 生成更可靠的 ID
      name: { zh: '新菜单', en: 'New Menu' },
      linkType: 'internal',
      href: '',
    };
    setLocalHeader({
      ...localHeader,
      navItems: [...localHeader.navItems, newItem],
    });
  };

  const updateNavItemName = (index: number, value: Translation) => {
    const newNavItems = [...localHeader.navItems];
    newNavItems[index] = { ...newNavItems[index], name: value };
    setLocalHeader({ ...localHeader, navItems: newNavItems });
  };

  const updateNavItemLink = (index: number, value: NavLink) => {
    const newNavItems = [...localHeader.navItems];
    newNavItems[index] = { ...newNavItems[index], ...value };
    setLocalHeader({ ...localHeader, navItems: newNavItems });
  };

  const removeNavItem = (index: number) => {
    setLocalHeader({
      ...localHeader,
      navItems: localHeader.navItems.filter((_, i) => i !== index),
    });
  };

  if (contextLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-500">加载中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Header 导航管理</h1>
          <p className="text-gray-500 mt-1">编辑网站顶部导航菜单</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          保存更改
        </Button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">×</button>
        </motion.div>
      )}

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 px-4 py-3 rounded-lg"
        >
          保存成功！
        </motion.div>
      )}

      {/* Header 预览 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">组件预览</span>
          <div className="flex gap-1">
            <Button
              variant={previewLang === 'zh' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewLang('zh')}
            >
              中文
            </Button>
            <Button
              variant={previewLang === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewLang('en')}
            >
              English
            </Button>
          </div>
        </div>
        <HeaderPreview header={localHeader} language={previewLang} />
      </div>

      {/* 页面删除警告 */}
      {hasDeletedPages && (
        <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <span>部分导航链接指向的页面已被删除，请更新相关链接。</span>
        </div>
      )}

      {/* 提示信息 */}
      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 text-sm">
        <span className="w-2 h-2 bg-blue-500 rounded-full" />
        品牌 Logo 和名称由「公司信息管理」统一配置。
      </div>

      {/* 导航菜单列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>导航菜单</CardTitle>
              <CardDescription>管理顶部导航栏的菜单项</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addNavItem}>
              <Plus className="w-4 h-4 mr-1" />
              添加菜单
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {localHeader.navItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>暂无导航菜单</p>
              <p className="text-sm mt-1">点击「添加菜单」开始配置</p>
            </div>
          ) : (
            localHeader.navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-lg border ${item.pageDeleted
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-move" />

                  <div className="flex-1 space-y-4">
                    {/* 菜单名称 */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 w-16">菜单名称</span>
                      {item.pageDeleted && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          链接失效
                        </Badge>
                      )}
                    </div>
                    <BilingualInput
                      value={item.name}
                      onChange={(value) => updateNavItemName(index, value)}
                      placeholder={{ zh: '菜单中文名', en: 'Menu English name' }}
                    />

                    {/* 链接配置 */}
                    <div className="pt-2 border-t">
                      <LinkSelector
                        value={item}
                        onChange={(value) => updateNavItemLink(index, value)}
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNavItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
