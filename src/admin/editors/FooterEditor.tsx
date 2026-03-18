import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import type { Translation, FooterLinkGroup } from '../../types';

export default function FooterEditor() {
  const { content, updateFooter } = useContent();
  const [localFooter, setLocalFooter] = useState(content.footer);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateFooter(localFooter);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateLinkGroup = <K extends keyof FooterLinkGroup>(index: number, field: K, value: FooterLinkGroup[K]) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const addLinkToGroup = (groupIndex: number) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[groupIndex].links.push({
      name: { zh: '新链接', en: 'New Link' },
      href: '#',
    });
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const updateLink = (groupIndex: number, linkIndex: number, field: 'name' | 'href', value: Translation | string) => {
    const newGroups = [...localFooter.linkGroups];
    if (field === 'name') {
      newGroups[groupIndex].links[linkIndex].name = value as Translation;
    } else {
      newGroups[groupIndex].links[linkIndex].href = value as string;
    }
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  const removeLinkFromGroup = (groupIndex: number, linkIndex: number) => {
    const newGroups = [...localFooter.linkGroups];
    newGroups[groupIndex].links = newGroups[groupIndex].links.filter((_, i) => i !== linkIndex);
    setLocalFooter({ ...localFooter, linkGroups: newGroups });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Footer 页脚</h1>
          <p className="text-gray-500 mt-1">编辑页脚信息、链接、联系方式</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          保存更改
        </button>
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

      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 text-sm shadow-sm border border-blue-100">
        <span className="w-2 h-2 bg-blue-500 rounded-full" />
        品牌名称、描述、电话、邮箱及地址现已由 <code className="bg-blue-100 px-1 rounded font-mono">siteSettings.json</code> 统一管理。
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="font-medium text-gray-800">邮件订阅</h3>
        
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
      </div>

      {/* Link Groups */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">链接分组</h3>
        
        {localFooter.linkGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Group Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">分组 {groupIndex + 1}</span>
              </div>
            </div>

            {/* Group Content */}
            <div className="p-6 space-y-4">
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
                  <button
                    onClick={() => addLinkToGroup(groupIndex)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    添加链接
                  </button>
                </div>

                {group.links.map((link, linkIndex) => (
                  <div
                    key={linkIndex}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Chinese Name */}
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded">
                          中文
                        </span>
                        <input
                          type="text"
                          value={link.name.zh}
                          onChange={(e) =>
                            updateLink(groupIndex, linkIndex, 'name', {
                              ...link.name,
                              zh: e.target.value,
                            })
                          }
                          className="w-full pl-14 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                      </div>
                      {/* English Name */}
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded">
                          EN
                        </span>
                        <input
                          type="text"
                          value={link.name.en}
                          onChange={(e) =>
                            updateLink(groupIndex, linkIndex, 'name', {
                              ...link.name,
                              en: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                      </div>
                      {/* Link */}
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => updateLink(groupIndex, linkIndex, 'href', e.target.value)}
                        placeholder="链接地址"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <button
                      onClick={() => removeLinkFromGroup(groupIndex, linkIndex)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
