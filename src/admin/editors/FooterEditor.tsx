// Footer 组件管理编辑器

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, GripVertical, AlertTriangle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BilingualInput from '../components/BilingualInput';
import LinkSelector, { getAllPages, checkPageExists } from '../components/LinkSelector';
import type { Translation, FooterLinkGroup, FooterLink, FooterContent } from '../../types';

export default function FooterEditor() {
  const { content, updateFooter } = useContent();
  const [localFooter, setLocalFooter] = useState<FooterContent>(content.footer);
  const [saved, setSaved] = useState(false);
  const [hasDeletedPages, setHasDeletedPages] = useState(false);

  // 检查是否有已删除的页面链接
  useEffect(() => {
    const pages = getAllPages();
    const hasDeleted = localFooter.linkGroups.some((group) =>
      group.links.some(
        (link) => link.linkType === 'internal' && link.href && !checkPageExists(link.href, pages)
      )
    );
    setHasDeletedPages(hasDeleted);
  }, [localFooter.linkGroups]);

  // 将旧格式转换为新格式
  useEffect(() => {
    const needsConversion = localFooter.linkGroups.some((group) =>
      group.links.some((link) => !('linkType' in link))
    );
    if (needsConversion) {
      const convertedGroups = localFooter.linkGroups.map((group) => ({
        ...group,
        links: group.links.map((link) => ({
          ...link,
          linkType: (link.href?.startsWith('http') ? 'external' : 'internal') as 'internal' | 'external',
        })),
      }));
      setLocalFooter({ ...localFooter, linkGroups: convertedGroups });
    }
  }, []);

  const handleSave = () => {
    updateFooter(localFooter);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateLinkGroup = <K extends keyof FooterLinkGroup>(
    index: number,
    field: K,
    value: FooterLinkGroup[K]
  ) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const addLinkToGroup = (groupIndex: number) => {
    const newGroups = [...localFooter.linkGroups];
    const newLink: FooterLink = {
      name: { zh: '新链接', en: 'New Link' },
      linkType: 'internal',
      href: '',
    };
    newGroups[groupIndex].links.push(newLink);
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const updateLinkName = (groupIndex: number, linkIndex: number, value: Translation) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[groupIndex].links[linkIndex] = {
      ...newGroups[groupIndex].links[linkIndex],
      name: value,
    };
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const updateLinkData = (groupIndex: number, linkIndex: number, value: FooterLink) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[groupIndex].links[linkIndex] = {
      ...newGroups[groupIndex].links[linkIndex],
      ...value,
    };
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const removeLinkFromGroup = (groupIndex: number, linkIndex: number) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[groupIndex].links = newGroups[groupIndex].links.filter((_, i) => i !== linkIndex);
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const addLinkGroup = () => {
    const newGroup: FooterLinkGroup = {
      title: { zh: '新分组', en: 'New Group' },
      links: [],
    };
    setLocalFooter({
      ...localFooter,
      linkGroups: [...localFooter.linkGroups, newGroup],
    });
  };

  const removeLinkGroup = (index: number) => {
    setLocalFooter({
      ...localFooter,
      linkGroups: localFooter.linkGroups.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Footer 页脚管理</h1>
          <p className="text-gray-500 mt-1">编辑页脚链接分组和订阅设置</p>
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
          <span>部分链接指向的页面已被删除，请更新相关链接。</span>
        </div>
      )}

      {/* 提示信息 */}
      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 text-sm">
        <span className="w-2 h-2 bg-blue-500 rounded-full" />
        公司名称、联系方式、社交媒体链接由「公司信息管理」统一配置。
      </div>

      {/* Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle>邮件订阅</CardTitle>
          <CardDescription>配置订阅框的文案</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <BilingualInput
            label="输入框占位文字"
            value={localFooter.newsletterPlaceholder}
            onChange={(value) => setLocalFooter({ ...localFooter, newsletterPlaceholder: value })}
            placeholder={{ zh: '输入邮箱订阅', en: 'Enter email to subscribe' }}
          />

          <BilingualInput
            label="订阅按钮文字"
            value={localFooter.newsletterButton}
            onChange={(value) => setLocalFooter({ ...localFooter, newsletterButton: value })}
            placeholder={{ zh: '订阅', en: 'Subscribe' }}
          />
        </CardContent>
      </Card>

      {/* Link Groups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">链接分组</h3>
          <Button variant="outline" size="sm" onClick={addLinkGroup}>
            <Plus className="w-4 h-4 mr-1" />
            添加分组
          </Button>
        </div>

        {localFooter.linkGroups.map((group, groupIndex) => {
          const groupHasDeletedLinks = group.links.some(
            (link) => link.pageDeleted || (link.linkType === 'internal' && link.href && !checkPageExists(link.href, getAllPages()))
          );

          return (
            <Card
              key={groupIndex}
              className={groupHasDeletedLinks ? 'border-amber-300' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <CardTitle className="text-base">分组 {groupIndex + 1}</CardTitle>
                    {groupHasDeletedLinks && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        有失效链接
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLinkGroup(groupIndex)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Group Title */}
                <BilingualInput
                  label="分组标题"
                  value={group.title}
                  onChange={(value) => updateLinkGroup(groupIndex, 'title', value)}
                  placeholder={{ zh: '分组标题', en: 'Group Title' }}
                />

                {/* Links */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">链接列表</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addLinkToGroup(groupIndex)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      添加链接
                    </Button>
                  </div>

                  {group.links.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg">
                      暂无链接，点击「添加链接」开始配置
                    </div>
                  ) : (
                    group.links.map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className={`p-4 rounded-lg border ${
                          link.pageDeleted
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-4">
                            {/* 链接名称 */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">链接名称</span>
                              {link.pageDeleted && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  页面已删除
                                </Badge>
                              )}
                            </div>
                            <BilingualInput
                              value={link.name}
                              onChange={(value) => updateLinkName(groupIndex, linkIndex, value)}
                              placeholder={{ zh: '链接中文名', en: 'Link English name' }}
                            />

                            {/* 链接配置 */}
                            <div className="pt-2 border-t">
                              <LinkSelector
                                value={link}
                                onChange={(value) => updateLinkData(groupIndex, linkIndex, value as FooterLink)}
                              />
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLinkFromGroup(groupIndex, linkIndex)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {localFooter.linkGroups.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
              <p className="text-sm">暂无链接分组</p>
              <p className="text-xs mt-1">点击「添加分组」开始配置</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
