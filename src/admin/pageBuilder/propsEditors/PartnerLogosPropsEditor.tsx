// 合作伙伴组件属性编辑器

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';

interface PartnerLogosPropsEditorProps {
  props: {
    title?: { zh: string; en: string };
    subtitle?: { zh: string; en: string };
    logos?: Array<{
      image: string;
      name: string;
      link?: string;
    }>;
    layout?: 'row' | 'grid';
    grayscale?: boolean;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function PartnerLogosPropsEditor({ props, onUpdate }: PartnerLogosPropsEditorProps) {
  const logos = props.logos || [];

  const addLogo = () => {
    onUpdate({
      ...props,
      logos: [...logos, { image: '', name: '', link: '' }],
    });
  };

  const updateLogo = (index: number, field: string, value: string) => {
    const newLogos = [...logos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    onUpdate({ ...props, logos: newLogos });
  };

  const removeLogo = (index: number) => {
    const newLogos = logos.filter((_, i) => i !== index);
    onUpdate({ ...props, logos: newLogos });
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

      {/* 显示设置 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">显示设置</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>布局方式</Label>
            <Select
              value={props.layout || 'row'}
              onValueChange={(val) => onUpdate({ ...props, layout: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="row">单行滚动</SelectItem>
                <SelectItem value="grid">网格展示</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>灰度显示</Label>
            <div className="flex items-center gap-2 h-10">
              <Checkbox
                checked={props.grayscale !== false}
                onCheckedChange={(checked) => onUpdate({ ...props, grayscale: checked })}
              />
              <span className="text-sm text-gray-600">悬停时显示彩色</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo 列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">合作伙伴 Logo</h4>
          <Button size="sm" variant="outline" onClick={addLogo}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {logos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无合作伙伴</p>
            <p className="text-xs mt-1">点击上方按钮添加</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logos.map((logo, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Logo {index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeLogo(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <ImageInput
                  label="Logo 图片"
                  value={logo.image}
                  onChange={(val) => updateLogo(index, 'image', val)}
                  aspectRatio="video"
                />
                <div className="space-y-2">
                  <Label>品牌名称</Label>
                  <Input
                    value={logo.name}
                    onChange={(e) => updateLogo(index, 'name', e.target.value)}
                    placeholder="如 Brand Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>链接（可选）</Label>
                  <Input
                    value={logo.link || ''}
                    onChange={(e) => updateLogo(index, 'link', e.target.value)}
                    placeholder="如 https://example.com"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
