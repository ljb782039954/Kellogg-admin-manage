// FAQ 组件属性编辑器（轻量版）

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { FAQItem } from '@/types';

interface FAQPropsEditorProps {
  props: {
    maxItems?: number;
    showMoreLink?: boolean;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function FAQPropsEditor({ props, onUpdate }: FAQPropsEditorProps) {
  const { content, updateFAQ } = useContent();
  const [localItems, setLocalItems] = useState(content.faq.items);

  // 同步 content 变化
  useEffect(() => {
    setLocalItems(content.faq.items);
  }, [content.faq.items]);

  // 保存到全局
  const saveItems = (items: FAQItem[]) => {
    setLocalItems(items);
    updateFAQ({ ...content.faq, items });
  };

  const addItem = () => {
    const newId = Math.max(...localItems.map((i) => i.id), 0) + 1;
    saveItems([
      ...localItems,
      {
        id: newId,
        question: { zh: '新问题', en: 'New Question' },
        answer: { zh: '在这里输入回答...', en: 'Enter answer here...' },
      },
    ]);
  };

  const updateItem = (id: number, field: 'question' | 'answer', value: { zh: string; en: string }) => {
    saveItems(
      localItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: number) => {
    saveItems(localItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 显示设置 */}
      <div className="space-y-4 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">显示设置</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>显示数量</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={props.maxItems || 5}
              onChange={(e) => onUpdate({ ...props, maxItems: parseInt(e.target.value) || 5 })}
            />
          </div>
          <div className="space-y-2">
            <Label>显示更多链接</Label>
            <div className="pt-2">
              <Switch
                checked={props.showMoreLink !== false}
                onCheckedChange={(checked) => onUpdate({ ...props, showMoreLink: checked })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ 列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">FAQ 列表</h4>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {localItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无 FAQ 项目</p>
          </div>
        ) : (
          <div className="space-y-3">
            {localItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">问题 {index + 1}</span>
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
                  {/* 问题 */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">问题（中文）</Label>
                      <Input
                        value={item.question.zh}
                        onChange={(e) => updateItem(item.id, 'question', { ...item.question, zh: e.target.value })}
                        placeholder="问题中文"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">问题（英文）</Label>
                      <Input
                        value={item.question.en}
                        onChange={(e) => updateItem(item.id, 'question', { ...item.question, en: e.target.value })}
                        placeholder="Question in English"
                      />
                    </div>
                  </div>
                  {/* 回答 */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">回答（中文）</Label>
                      <Textarea
                        value={item.answer.zh}
                        onChange={(e) => updateItem(item.id, 'answer', { ...item.answer, zh: e.target.value })}
                        placeholder="回答中文"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">回答（英文）</Label>
                      <Textarea
                        value={item.answer.en}
                        onChange={(e) => updateItem(item.id, 'answer', { ...item.answer, en: e.target.value })}
                        placeholder="Answer in English"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
