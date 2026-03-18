// 工厂介绍组件属性编辑器（轻量版）

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';
import type { FactorySection } from '@/types';

interface FactoryPropsEditorProps {
  props: {
    showButton?: boolean;
    buttonText?: { zh: string; en: string };
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function FactoryPropsEditor({ props, onUpdate }: FactoryPropsEditorProps) {
  const { content, updateFactory } = useContent();
  const [localData, setLocalData] = useState(content.factory);

  useEffect(() => {
    setLocalData(content.factory);
  }, [content.factory]);

  const saveData = (data: typeof localData) => {
    setLocalData(data);
    updateFactory(data);
  };

  const addSection = () => {
    saveData({
      ...localData,
      sections: [
        ...localData.sections,
        {
          image: '',
          title: { zh: '新板块', en: 'New Section' },
          content: { zh: '板块内容', en: 'Section content' },
        },
      ],
    });
  };

  const updateSection = <K extends keyof FactorySection>(index: number, field: K, value: FactorySection[K]) => {
    const newSections = [...localData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    saveData({ ...localData, sections: newSections });
  };

  const removeSection = (index: number) => {
    saveData({
      ...localData,
      sections: localData.sections.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* 组件设置 */}
      <div className="space-y-4 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">组件设置</h4>
        <div className="flex items-center justify-between">
          <Label>显示按钮</Label>
          <Switch
            checked={props.showButton !== false}
            onCheckedChange={(checked) => onUpdate({ ...props, showButton: checked })}
          />
        </div>
        {props.showButton !== false && (
          <BilingualInput
            label="按钮文字"
            value={props.buttonText || { zh: '了解更多', en: 'Learn More' }}
            onChange={(val) => onUpdate({ ...props, buttonText: val })}
          />
        )}
      </div>

      {/* 头部信息 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">头部信息</h4>
        <ImageInput
          label="背景图片"
          value={localData.heroImage}
          onChange={(val) => saveData({ ...localData, heroImage: val })}
          aspectRatio="video"
        />
        <BilingualInput
          label="主标题"
          value={localData.heroTitle}
          onChange={(val) => saveData({ ...localData, heroTitle: val })}
        />
        <BilingualInput
          label="副标题"
          value={localData.heroSubtitle}
          onChange={(val) => saveData({ ...localData, heroSubtitle: val })}
        />
      </div>

      {/* 内容板块 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">内容板块</h4>
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {localData.sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无内容板块</p>
          </div>
        ) : (
          <div className="space-y-3">
            {localData.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">板块 {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 space-y-3">
                  <ImageInput
                    label="板块图片"
                    value={section.image}
                    onChange={(val) => updateSection(index, 'image', val)}
                    aspectRatio="video"
                  />
                  <BilingualInput
                    label="标题"
                    value={section.title}
                    onChange={(val) => updateSection(index, 'title', val)}
                  />
                  <BilingualInput
                    label="内容"
                    value={section.content}
                    onChange={(val) => updateSection(index, 'content', val)}
                    multiline
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
