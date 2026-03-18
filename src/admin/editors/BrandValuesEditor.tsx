import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Sparkles, LayoutPanelLeft } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';

const AVAILABLE_ICONS = ['Leaf', 'Award', 'Heart', 'Recycle', 'Star', 'Truck', 'Shield', 'Zap'];

export default function BrandValuesEditor() {
  const { content, updateHome } = useContent();
  const [localValues, setLocalValues] = useState(content.home.brandValues);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateHome({ ...content.home, brandValues: localValues });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addValue = () => {
    setLocalValues({
      ...localValues,
      values: [
        ...localValues.values,
        {
          icon: 'Star',
          title: { zh: '新理念', en: 'New Value' },
          description: { zh: '描述在这里...', en: 'Enter description here...' },
        },
      ],
    });
  };

  const updateValueItem = (index: number, field: string, val: any) => {
    const newValues = [...localValues.values];
    newValues[index] = { ...newValues[index], [field]: val };
    setLocalValues({ ...localValues, values: newValues });
  };

  const removeValue = (index: number) => {
    setLocalValues({
      ...localValues,
      values: localValues.values.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">品牌价值管理</h1>
          <p className="text-gray-500 mt-1">定制首页显示的品牌核心价值与理念</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg"
        >
          <Save className="w-4 h-4" />
          保存更改
        </button>
      </div>

      {saved && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2"
         >
           保存成功！首页已同步更新。
         </motion.div>
      )}

      {/* Hero Section Edit */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          模块标题
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BilingualInput
            label="主标题"
            value={localValues.title}
            onChange={(val) => setLocalValues({ ...localValues, title: val })}
          />
          <BilingualInput
            label="副标题"
            value={localValues.subtitle}
            onChange={(val) => setLocalValues({ ...localValues, subtitle: val })}
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {localValues.values.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group flex flex-col gap-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-amber-50 transition-colors">
                  <LayoutPanelLeft className="w-6 h-6 text-gray-400 group-hover:text-amber-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Card {index + 1}</span>
                  <select 
                    value={item.icon}
                    onChange={(e) => updateValueItem(index, 'icon', e.target.value)}
                    className="bg-transparent border-none p-0 text-sm font-medium text-gray-600 focus:ring-0"
                  >
                    {AVAILABLE_ICONS.map(i => <option key={i} value={i}>{i} (Icon)</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removeValue(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <BilingualInput
              label="理念标题"
              value={item.title}
              onChange={(val) => updateValueItem(index, 'title', val)}
            />

            <BilingualInput
              label="描述文字"
              value={item.description}
              onChange={(val) => updateValueItem(index, 'description', val)}
            />
          </motion.div>
        ))}
        
        {/* Add Card */}
        <button
          onClick={addValue}
          className="h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50/10 transition-all flex flex-col items-center justify-center gap-4 bg-gray-50/50"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold">添加新的品牌价值观</span>
        </button>
      </div>
    </div>
  );
}
