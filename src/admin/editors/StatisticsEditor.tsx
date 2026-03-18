import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Hash } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import type { Translation } from '../../types';

export default function StatisticsEditor() {
  const { content, updateHome } = useContent();
  const [localStats, setLocalStats] = useState(content.home.statistics);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateHome({ ...content.home, statistics: localStats });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addStat = () => {
    setLocalStats({
      ...localStats,
      stats: [
        ...localStats.stats,
        { value: '0', label: { zh: '新项', en: 'New Item' } },
      ],
    });
  };

  const updateStatItem = (index: number, field: 'value' | 'label', val: string | Translation) => {
    const newStats = [...localStats.stats];
    newStats[index] = { ...newStats[index], [field]: val } as any;
    setLocalStats({ ...localStats, stats: newStats });
  };

  const removeStat = (index: number) => {
    setLocalStats({
      ...localStats,
      stats: localStats.stats.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">统计数据管理</h1>
          <p className="text-gray-500 mt-1">编辑首页显示的成就数字和荣誉</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg">
          <Save className="w-4 h-4" />
          保存更改
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 italic">
          保存成功！数字已刷新。
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <BilingualInput
          label="模块总标题"
          value={localStats.title}
          onChange={(val) => setLocalStats({ ...localStats, title: val })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localStats.stats.map((stat, index) => (
          <motion.div key={index} layout className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group">
            <div className="flex justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-gray-400" />
              </div>
              <button onClick={() => removeStat(index)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">数值 (如: 500K+)</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStatItem(index, 'value', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 font-bold text-xl"
                />
              </div>
              <BilingualInput
                label="描述标签"
                value={stat.label}
                onChange={(val) => updateStatItem(index, 'label', val)}
              />
            </div>
          </motion.div>
        ))}
        <button onClick={addStat} className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all bg-gray-50/30">
          <Plus className="w-6 h-6 mb-2" />
          <span>添加数据项</span>
        </button>
      </div>
    </div>
  );
}
