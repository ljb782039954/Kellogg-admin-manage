// 客户评价组件属性编辑器（轻量版）

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';
import type { Testimonial } from '@/types';

interface TestimonialsPropsEditorProps {
  props: {
    maxItems?: number;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function TestimonialsPropsEditor({ props, onUpdate }: TestimonialsPropsEditorProps) {
  const { content, updateTestimonials } = useContent();
  const [localData, setLocalData] = useState(content.home.testimonials);

  useEffect(() => {
    setLocalData(content.home.testimonials);
  }, [content.home.testimonials]);

  const saveData = (data: typeof localData) => {
    setLocalData(data);
    updateTestimonials(data);
  };

  const addItem = () => {
    const newId = Math.max(...localData.items.map((i) => i.id), 0) + 1;
    saveData({
      ...localData,
      items: [
        ...localData.items,
        {
          id: newId,
          name: { zh: '客户名称', en: 'Customer Name' },
          role: { zh: '职位', en: 'Role' },
          content: { zh: '评价内容', en: 'Review content' },
          avatar: '',
        },
      ],
    });
  };

  const updateItem = <K extends keyof Testimonial>(id: number, field: K, value: Testimonial[K]) => {
    saveData({
      ...localData,
      items: localData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeItem = (id: number) => {
    saveData({
      ...localData,
      items: localData.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* 显示设置 */}
      <div className="space-y-4 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">显示设置</h4>
        <div className="space-y-2">
          <Label>显示数量</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={props.maxItems || 6}
            onChange={(e) => onUpdate({ ...props, maxItems: parseInt(e.target.value) || 6 })}
          />
        </div>
      </div>

      {/* 区块标题 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">区块标题</h4>
        <BilingualInput
          label="主标题"
          value={localData.title}
          onChange={(val) => saveData({ ...localData, title: val })}
        />
        <BilingualInput
          label="副标题"
          value={localData.subtitle}
          onChange={(val) => saveData({ ...localData, subtitle: val })}
        />
      </div>

      {/* 评价列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">客户评价列表</h4>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {localData.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无客户评价</p>
          </div>
        ) : (
          <div className="space-y-3">
            {localData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">评价 {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-20 flex-shrink-0">
                      <ImageInput
                        label="头像"
                        value={item.avatar}
                        onChange={(val) => updateItem(item.id, 'avatar', val)}
                        aspectRatio="square"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <BilingualInput
                        label="姓名"
                        value={item.name}
                        onChange={(val) => updateItem(item.id, 'name', val)}
                      />
                      <BilingualInput
                        label="职位/身份"
                        value={item.role}
                        onChange={(val) => updateItem(item.id, 'role', val)}
                      />
                    </div>
                  </div>
                  <BilingualInput
                    label="评价内容"
                    value={item.content}
                    onChange={(val) => updateItem(item.id, 'content', val)}
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
