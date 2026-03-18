import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Layers, GripVertical } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';

export default function CategoriesEditor() {
  const { content, updateCategories } = useContent();
  const [localCategories, setLocalCategories] = useState(content.products.categories);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateCategories(localCategories);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addCategory = () => {
    const newId = `cat_${Date.now()}`;
    setLocalCategories([
      ...localCategories,
      { id: newId, name: { zh: '新分类', en: 'New Category' } },
    ]);
  };

  const updateCategory = (index: number, val: any) => {
    const next = [...localCategories];
    next[index] = { ...next[index], name: val };
    setLocalCategories(next);
  };

  const removeCategory = (index: number) => {
    setLocalCategories(localCategories.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">分类管理</h1>
          <p className="text-gray-500 mt-1">定义商品所属的分类，将直接影响前台的筛选功能</p>
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
          className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100"
        >
          保存成功！
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          全部分类
        </h2>

        <div className="space-y-3">
          {localCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl group"
            >
              <GripVertical className="w-4 h-4 text-gray-300" />
              <div className="flex-1">
                <BilingualInput
                  label=""
                  value={cat.name}
                  onChange={(val) => updateCategory(index, val)}
                  placeholder={{ zh: '分类名称', en: 'Category Name' }}
                />
              </div>
              <div className="text-xs font-mono text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">
                ID: {cat.id}
              </div>
              <button
                onClick={() => removeCategory(index)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}

          <button
            onClick={addCategory}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-2 bg-gray-50/30"
          >
            <Plus className="w-5 h-5" />
            添加新分类
          </button>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
        <div className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5">⚠️</div>
        <p className="text-sm text-amber-800">
          <strong>注意：</strong> 删除分类可能会导致已绑定该分类的商品在筛选时失效。建议仅在没有关联商品时删除。
        </p>
      </div>
    </div>
  );
}
