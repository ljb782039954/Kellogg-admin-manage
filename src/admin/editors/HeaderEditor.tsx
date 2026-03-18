import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import type { Translation } from '../../types';

export default function HeaderEditor() {
  const { content, updateHeader } = useContent();
  const [localHeader, setLocalHeader] = useState(content.header);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateHeader(localHeader);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addNavItem = () => {
    setLocalHeader({
      ...localHeader,
      navItems: [
        ...localHeader.navItems,
        { name: { zh: '新菜单', en: 'New Menu' }, href: '#' },
      ],
    });
  };

  const updateNavItem = (index: number, field: 'name' | 'href', value: Translation | string) => {
    const newNavItems = [...localHeader.navItems];
    if (field === 'name') {
      newNavItems[index].name = value as Translation;
    } else {
      newNavItems[index].href = value as string;
    }
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
          <h1 className="text-2xl font-bold text-gray-800">Header 导航</h1>
          <p className="text-gray-500 mt-1">编辑网站Logo和导航菜单</p>
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

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 mb-6 text-sm">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          品牌 Logo 文字现已由 <code className="bg-blue-100 px-1 rounded">siteSettings.json</code> 统一管理。
        </div>

        {/* Navigation Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">导航菜单</label>
            <button
              onClick={addNavItem}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加菜单
            </button>
          </div>

          <div className="space-y-3">
            {localHeader.navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <GripVertical className="w-5 h-5 text-gray-400 mt-3" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Chinese Name */}
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded">
                      中文
                    </span>
                    <input
                      type="text"
                      value={item.name.zh}
                      onChange={(e) =>
                        updateNavItem(index, 'name', { ...item.name, zh: e.target.value })
                      }
                      className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                  {/* English Name */}
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded">
                      EN
                    </span>
                    <input
                      type="text"
                      value={item.name.en}
                      onChange={(e) =>
                        updateNavItem(index, 'name', { ...item.name, en: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                  {/* Link */}
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                    placeholder="链接地址，如 #products"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <button
                  onClick={() => removeNavItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
