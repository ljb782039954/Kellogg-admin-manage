import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Layout, Type, List } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import type { SiteContent } from '../../types';

export default function AllProductsPageEditor() {
  const { content, updateProducts } = useContent();
  const [localConfig, setLocalConfig] = useState(content.products);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProducts(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = <K extends keyof SiteContent['products']>(field: K, value: SiteContent['products'][K]) => {
    setLocalConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">全部商品页管理</h1>
          <p className="text-gray-500 mt-1">配置全部商品列表页的标题、描述及显示设置。</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-bold shadow-lg"
        >
          <Save className="w-4 h-4" />
          保存设置
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          页面设置已更新并同步。
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Hero Section settings */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-gray-800 font-bold border-b border-gray-50 pb-4">
            <Layout className="w-5 h-5 text-blue-500" />
            <h2>顶部横幅 (Hero Section)</h2>
          </div>

          <BilingualInput
            label="主标题"
            value={localConfig.title}
            placeholder={localConfig.title}
            onChange={(val) => updateField('title', val)}
          />

          <BilingualInput
            label="副标题 / 描述"
            value={localConfig.subtitle}
            placeholder={localConfig.subtitle}
            onChange={(val) => updateField('subtitle', val)}
          />
        </div>

        {/* Display Settings */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-gray-800 font-bold border-b border-gray-50 pb-4">
            <List className="w-5 h-5 text-purple-500" />
            <h2>显示设置</h2>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">每页显示商品数量</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="4"
                max="24"
                step="4"
                value={localConfig.itemsPerPage}
                onChange={(e) => updateField('itemsPerPage', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
              <span className="w-12 text-center font-bold text-gray-800 bg-gray-50 py-1 rounded-lg border border-gray-100">
                {localConfig.itemsPerPage}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">建议设置为 4 的倍数以保证网格布局美观。</p>
          </div>
        </div>

        {/* Preview info */}
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
          <div className="flex gap-3">
            <Type className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-sm text-blue-700 leading-relaxed">
              <p className="font-bold mb-1">提示</p>
              <p>具体的商品列表及分类管理请在“商品编辑”和“分类管理”中进行操作。此处仅负责页面样式的全局配置。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
