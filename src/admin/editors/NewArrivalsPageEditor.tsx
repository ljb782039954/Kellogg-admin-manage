import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Sparkles, Clock } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import type { SiteContent } from '../../types';

export default function NewArrivalsPageEditor() {
  const { content, updateNewArrivals } = useContent();
  const [localConfig, setLocalConfig] = useState(content.newArrivals);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateNewArrivals(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = <K extends keyof SiteContent['newArrivals']>(field: K, value: SiteContent['newArrivals'][K]) => {
    setLocalConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">新品页管理</h1>
          <p className="text-gray-500 mt-1">配置新品上市页面的视觉文案。内容将自动筛选近一年发布的商品。</p>
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
          新品页设置已保存。
        </motion.div>
      )}

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-gray-800 font-bold border-b border-gray-50 pb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2>页面文案 (Page Copy)</h2>
        </div>
        
        <BilingualInput
          label="主标题"
          value={localConfig.title}
          onChange={(val) => updateField('title', val)}
        />
        
        <BilingualInput
          label="副标题 / 描述"
          value={localConfig.subtitle}
          onChange={(val) => updateField('subtitle', val)}
        />
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="text-sm text-amber-800 leading-relaxed">
            <p className="font-bold mb-1">自动更新机制</p>
            <p>
              系统会自动将所有商品中发布日期在 **365天内** 的项目展示在此页面。
              您只需要在这里编辑页面的欢迎词和氛围描述。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
