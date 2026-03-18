// 统计数据组件属性编辑器（轻量版）

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BilingualInput from '@/admin/components/BilingualInput';
import type { Statistic } from '@/types';

interface StatisticsPropsEditorProps {
  props: Record<string, unknown>;
  onUpdate: (props: Record<string, unknown>) => void;
}

export function StatisticsPropsEditor({}: StatisticsPropsEditorProps) {
  const { content, updateStatistics } = useContent();
  const [localData, setLocalData] = useState(content.home.statistics);

  useEffect(() => {
    setLocalData(content.home.statistics);
  }, [content.home.statistics]);

  const saveData = (data: typeof localData) => {
    setLocalData(data);
    updateStatistics(data);
  };

  const addStat = () => {
    saveData({
      ...localData,
      stats: [
        ...localData.stats,
        {
          value: '100+',
          label: { zh: '新统计', en: 'New Stat' },
        },
      ],
    });
  };

  const updateStat = <K extends keyof Statistic>(index: number, field: K, value: Statistic[K]) => {
    const newStats = [...localData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    saveData({ ...localData, stats: newStats });
  };

  const removeStat = (index: number) => {
    saveData({
      ...localData,
      stats: localData.stats.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* 区块标题 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">区块标题</h4>
        <BilingualInput
          label="标题"
          value={localData.title}
          onChange={(val) => saveData({ ...localData, title: val })}
        />
      </div>

      {/* 统计列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">统计数据项</h4>
          <Button variant="outline" size="sm" onClick={addStat}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {localData.stats.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无统计数据</p>
          </div>
        ) : (
          <div className="space-y-3">
            {localData.stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">数据 {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStat(index)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">数值（如 100+、50K）</Label>
                    <Input
                      value={item.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="100+"
                    />
                  </div>
                  <BilingualInput
                    label="标签"
                    value={item.label}
                    onChange={(val) => updateStat(index, 'label', val)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
