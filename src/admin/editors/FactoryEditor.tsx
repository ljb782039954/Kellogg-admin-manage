import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Factory, Layout } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import ImageInput from '../components/ImageInput';

export default function FactoryEditor() {
  const { content, updateFactory } = useContent();
  const [localFactory, setLocalFactory] = useState(content.factory);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateFactory(localFactory);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSection = () => {
    setLocalFactory({
      ...localFactory,
      sections: [
        ...localFactory.sections,
        {
          image: '',
          title: { zh: '新篇章', en: 'New Section' },
          content: { zh: '描述在这里...', en: 'Description here...' },
        },
      ],
    });
  };

  const updateSection = (index: number, field: string, val: any) => {
    const newSections = [...localFactory.sections];
    newSections[index] = { ...newSections[index], [field]: val };
    setLocalFactory({ ...localFactory, sections: newSections });
  };

  const removeSection = (index: number) => {
    setLocalFactory({
      ...localFactory,
      sections: localFactory.sections.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">工厂页管理</h1>
          <p className="text-gray-500 mt-1">编辑您的自有工厂展示、工艺流程和设备介绍</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg hover:shadow-gray-200">
          <Save className="w-4 h-4" />
          保存更改
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center justify-center italic">
          保存成功！工厂页内容已实时刷新。
        </motion.div>
      )}

      {/* Hero Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Factory className="w-5 h-5 text-amber-500" />
            页面头部 (Hero)
          </h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-2.5 py-1 rounded-full">Background Image</span>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
           <ImageInput label="背景图" value={localFactory.heroImage} onChange={(val) => setLocalFactory({ ...localFactory, heroImage: val })} />
           <div className="space-y-6">
             <BilingualInput label="主标题" value={localFactory.heroTitle} onChange={(val) => setLocalFactory({ ...localFactory, heroTitle: val })} />
             <BilingualInput label="副标题" value={localFactory.heroSubtitle} onChange={(val) => setLocalFactory({ ...localFactory, heroSubtitle: val })} />
           </div>
        </div>
      </div>

      {/* Sections Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Layout className="w-5 h-5 text-amber-500" />
              详情板块 ({localFactory.sections.length})
           </h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {localFactory.sections.map((section, index) => (
            <motion.div key={index} layout className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group flex flex-col lg:flex-row gap-8">
               <div className="lg:w-1/3">
                  <ImageInput label="板块图片" value={section.image} onChange={(val) => updateSection(index, 'image', val)} />
               </div>
               <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Section {index + 1}</span>
                    <button onClick={() => removeSection(index)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <BilingualInput label="标题" value={section.title} onChange={(val) => updateSection(index, 'title', val)} />
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">内容描述</label>
                    <div className="grid grid-cols-1 gap-4">
                      <textarea value={section.content.zh} onChange={(e) => updateSection(index, 'content', { ...section.content, zh: e.target.value })} className="w-full min-h-[100px] p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all text-sm italic" />
                      <textarea value={section.content.en} onChange={(e) => updateSection(index, 'content', { ...section.content, en: e.target.value })} className="w-full min-h-[100px] p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all text-sm font-light italic" />
                    </div>
                  </div>
               </div>
            </motion.div>
          ))}
          <button onClick={addSection} className="w-full py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gray-50/20 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all group">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
             </div>
             <span className="font-semibold">添加新的工艺板块</span>
          </button>
        </div>
      </div>
    </div>
  );
}
