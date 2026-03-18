import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, HelpCircle, GripVertical } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';

export default function FAQEditor() {
  const { content, updateFAQ } = useContent();
  const [localFAQ, setLocalFAQ] = useState(content.faq);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateFAQ(localFAQ);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addFAQ = () => {
    const newId = Math.max(...localFAQ.items.map((i) => i.id), 0) + 1;
    setLocalFAQ({
      ...localFAQ,
      items: [
        ...localFAQ.items,
        {
          id: newId,
          question: { zh: '新问题', en: 'New Question' },
          answer: { zh: '在这里输入回答...', en: 'Enter answer here...' },
        },
      ],
    });
  };

  const updateFAQItem = (id: number, field: 'question' | 'answer', value: any) => {
    setLocalFAQ({
      ...localFAQ,
      items: localFAQ.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeFAQ = (id: number) => {
    setLocalFAQ({
      ...localFAQ,
      items: localFAQ.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">FAQ 页管理</h1>
          <p className="text-gray-500 mt-1">管理客户常见问题及解答</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg hover:shadow-gray-200"
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
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          保存成功！更改已同步。
        </motion.div>
      )}

      {/* Hero Section Edit */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          页面头部
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <BilingualInput
            label="主标题"
            value={localFAQ.title}
            onChange={(val) => setLocalFAQ({ ...localFAQ, title: val })}
          />
          <BilingualInput
            label="副标题"
            value={localFAQ.subtitle}
            onChange={(val) => setLocalFAQ({ ...localFAQ, subtitle: val })}
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {localFAQ.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question {index + 1}</span>
              </div>
              <button
                onClick={() => removeFAQ(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <BilingualInput
                label="问题内容"
                value={item.question}
                onChange={(val) => updateFAQItem(item.id, 'question', val)}
              />
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">回答内容</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100">ZH</span>
                    <textarea
                      value={item.answer.zh}
                      onChange={(e) => updateFAQItem(item.id, 'answer', { ...item.answer, zh: e.target.value })}
                      className="w-full min-h-[120px] pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-gray-800"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100">EN</span>
                    <textarea
                      value={item.answer.en}
                      onChange={(e) => updateFAQItem(item.id, 'answer', { ...item.answer, en: e.target.value })}
                      className="w-full min-h-[120px] pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-gray-800 font-light"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addFAQ}
        className="w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex flex-col items-center justify-center gap-2 bg-gray-50/50 hover:bg-white group"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="w-6 h-6" />
        </div>
        <span className="font-medium">添加新的常见问题</span>
      </button>
    </div>
  );
}
