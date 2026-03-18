// 特性列表组件属性编辑器

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import BilingualInput from '@/admin/components/BilingualInput';

// 常用图标列表
const commonIcons = [
  'Truck', 'RotateCcw', 'Shield', 'Headphones', 'CreditCard', 'Gift',
  'Star', 'Heart', 'Check', 'Award', 'Zap', 'Clock',
  'ThumbsUp', 'Lock', 'Globe', 'Users', 'Package', 'Sparkles',
];

interface FeatureListPropsEditorProps {
  props: {
    title?: { zh: string; en: string };
    subtitle?: { zh: string; en: string };
    features?: Array<{
      icon: string;
      title: { zh: string; en: string };
      description: { zh: string; en: string };
    }>;
    layout?: 'grid' | 'list';
    columns?: 2 | 3 | 4;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function FeatureListPropsEditor({ props, onUpdate }: FeatureListPropsEditorProps) {
  const features = props.features || [];

  const addFeature = () => {
    onUpdate({
      ...props,
      features: [...features, { icon: 'Star', title: { zh: '', en: '' }, description: { zh: '', en: '' } }],
    });
  };

  const updateFeature = (index: number, field: string, value: unknown) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onUpdate({ ...props, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    onUpdate({ ...props, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* 标题设置 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">标题设置</h4>
        <BilingualInput
          label="标题"
          value={props.title || { zh: '', en: '' }}
          onChange={(val) => onUpdate({ ...props, title: val })}
        />
        <BilingualInput
          label="副标题"
          value={props.subtitle || { zh: '', en: '' }}
          onChange={(val) => onUpdate({ ...props, subtitle: val })}
        />
      </div>

      {/* 布局设置 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">布局设置</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>布局方式</Label>
            <Select
              value={props.layout || 'grid'}
              onValueChange={(val) => onUpdate({ ...props, layout: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">网格布局</SelectItem>
                <SelectItem value="list">列表布局</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {props.layout !== 'list' && (
            <div className="space-y-2">
              <Label>列数</Label>
              <Select
                value={String(props.columns || 3)}
                onValueChange={(val) => onUpdate({ ...props, columns: parseInt(val) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 列</SelectItem>
                  <SelectItem value="3">3 列</SelectItem>
                  <SelectItem value="4">4 列</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* 特性列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">特性项目</h4>
          <Button size="sm" variant="outline" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {features.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无特性项目</p>
            <p className="text-xs mt-1">点击上方按钮添加</p>
          </div>
        ) : (
          <div className="space-y-4">
            {features.map((feature, index) => {
              const SelectedIcon = (LucideIcons as any)[feature.icon] || LucideIcons.Star;
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SelectedIcon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">特性 {index + 1}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>图标</Label>
                    <Select
                      value={feature.icon}
                      onValueChange={(val) => updateFeature(index, 'icon', val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {commonIcons.map((iconName) => {
                          const Icon = (LucideIcons as any)[iconName];
                          return (
                            <SelectItem key={iconName} value={iconName}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span>{iconName}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <BilingualInput
                    label="标题"
                    value={feature.title}
                    onChange={(val) => updateFeature(index, 'title', val)}
                  />
                  <BilingualInput
                    label="描述"
                    value={feature.description}
                    onChange={(val) => updateFeature(index, 'description', val)}
                    multiline
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
