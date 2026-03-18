import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, MessageCircle} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import ImageInput from '../components/ImageInput';
import type { Translation } from '../../types';

export default function TestimonialsEditor() {
  const { content, updateHome } = useContent();
  const [localTestimonials, setLocalTestimonials] = useState(content.home.testimonials);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateHome({ ...content.home, testimonials: localTestimonials });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addTestimonial = () => {
    const newId = Math.max(...localTestimonials.items.map((i) => i.id), 0) + 1;
    setLocalTestimonials({
      ...localTestimonials,
      items: [
        ...localTestimonials.items,
        {
          id: newId,
          name: { zh: '新用户', en: 'New User' },
          role: { zh: '时尚博主', en: 'Fashion Blogger' },
          content: { zh: '在这里输入评价内容...', en: 'Enter testimonial content here...' },
          avatar: '',
        },
      ],
    });
  };

  const updateItem = (id: number, field: string, val: string | Translation) => {
    setLocalTestimonials({
      ...localTestimonials,
      items: localTestimonials.items.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    });
  };

  const removeItem = (id: number) => {
    setLocalTestimonials({
      ...localTestimonials,
      items: localTestimonials.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">客户评价管理</h1>
          <p className="text-gray-500 mt-1">管理品牌在行业内的口碑和客户见证</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg">
          <Save className="w-4 h-4" />
          保存更改
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center justify-center italic">
          保存成功！评价列表已更新。
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
           <MessageCircle className="w-5 h-5 text-amber-500" />
           展示标题
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BilingualInput label="大标题" value={localTestimonials.title} onChange={(val) => setLocalTestimonials({ ...localTestimonials, title: val })} />
          <BilingualInput label="小标题" value={localTestimonials.subtitle} onChange={(val) => setLocalTestimonials({ ...localTestimonials, subtitle: val })} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {localTestimonials.items.map((item, index) => (
          <motion.div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 uppercase tracking-widest leading-none">Testimonial {index + 1}</span>
              <button onClick={() => removeItem(item.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <ImageInput label="用户头像" value={item.avatar} onChange={(val) => updateItem(item.id, 'avatar', val)} />
                </div>
                <div className="flex-1 space-y-4">
                  <BilingualInput label="姓名" value={item.name} onChange={(val) => updateItem(item.id, 'name', val)} />
                  <BilingualInput label="职业/身份" value={item.role} onChange={(val) => updateItem(item.id, 'role', val)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">深度评价 (中/英)</label>
                <div className="space-y-4">
                   <textarea value={item.content.zh} onChange={(e) => updateItem(item.id, 'content', { ...item.content, zh: e.target.value })} className="w-full min-h-[100px] p-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm italic" />
                   <textarea value={item.content.en} onChange={(e) => updateItem(item.id, 'content', { ...item.content, en: e.target.value })} className="w-full min-h-[100px] p-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm font-light italic" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <button onClick={addTestimonial} className="min-h-[300px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 bg-gray-50/30 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all group">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
           </div>
           <span className="font-semibold">添加新的客户见证</span>
        </button>
      </div>
    </div>
  );
}
