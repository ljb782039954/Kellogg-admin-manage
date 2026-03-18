// Header 组件管理编辑器

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, AlertTriangle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BilingualInput from '../components/BilingualInput';
import LinkSelector, { getAllPages, checkPageExists } from '../components/LinkSelector';
import type { NavLink, HeaderContent, Translation } from '../../types';

export default function HeaderEditor() {
  const { content, updateHeader } = useContent();
  const [localHeader, setLocalHeader] = useState<HeaderContent>(content.header);
  const [saved, setSaved] = useState(false);
  const [hasDeletedPages, setHasDeletedPages] = useState(false);

  // 检查是否有已删除的页面链接
  useEffect(() => {
    const pages = getAllPages();
    const hasDeleted = localHeader.navItems.some(
      (item) => item.linkType === 'internal' && item.href && !checkPageExists(item.href, pages)
    );
    setHasDeletedPages(hasDeleted);
  }, [localHeader.navItems]);

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

  const handleSave = () => {
    updateHeader(localHeader);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addNavItem = () => {
    const newItem: NavLink = {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Header 导航管理</h1>
          <p className="text-gray-500 mt-1">编辑网站顶部导航菜单</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          保存更改
        </Button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 px-4 py-3 rounded-lg"
        >
          保存成功！
        </motion.div>
      )}

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
                className={`p-4 rounded-lg border ${
                  item.pageDeleted
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
