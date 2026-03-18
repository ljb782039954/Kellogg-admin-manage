// CTA行动号召组件属性编辑器

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';

interface CtaBannerPropsEditorProps {
  props: {
    title?: { zh: string; en: string };
    subtitle?: { zh: string; en: string };
    primaryButton?: {
      text: { zh: string; en: string };
      link: string;
    };
    secondaryButton?: {
      text: { zh: string; en: string };
      link: string;
    };
    backgroundImage?: string;
    backgroundColor?: string;
    alignment?: 'left' | 'center' | 'right';
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function CtaBannerPropsEditor({ props, onUpdate }: CtaBannerPropsEditorProps) {
  const primaryButton = props.primaryButton || { text: { zh: '', en: '' }, link: '' };
  const secondaryButton = props.secondaryButton || { text: { zh: '', en: '' }, link: '' };

  return (
    <div className="space-y-6">
      {/* 文本内容 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">文本内容</h4>
        <BilingualInput
          label="标题"
          value={props.title || { zh: '', en: '' }}
          onChange={(val) => onUpdate({ ...props, title: val })}
        />
        <BilingualInput
          label="副标题"
          value={props.subtitle || { zh: '', en: '' }}
          onChange={(val) => onUpdate({ ...props, subtitle: val })}
          multiline
        />
      </div>

      {/* 主按钮 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">主按钮</h4>
        <BilingualInput
          label="按钮文字"
          value={primaryButton.text}
          onChange={(val) => onUpdate({ ...props, primaryButton: { ...primaryButton, text: val } })}
        />
        <div className="space-y-2">
          <Label>按钮链接</Label>
          <Input
            type="text"
            placeholder="如 /products 或 https://example.com"
            value={primaryButton.link}
            onChange={(e) => onUpdate({ ...props, primaryButton: { ...primaryButton, link: e.target.value } })}
          />
        </div>
      </div>

      {/* 次按钮 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">次按钮（可选）</h4>
        <BilingualInput
          label="按钮文字"
          value={secondaryButton.text}
          onChange={(val) => onUpdate({ ...props, secondaryButton: { ...secondaryButton, text: val } })}
        />
        <div className="space-y-2">
          <Label>按钮链接</Label>
          <Input
            type="text"
            placeholder="留空则不显示次按钮"
            value={secondaryButton.link}
            onChange={(e) => onUpdate({ ...props, secondaryButton: { ...secondaryButton, link: e.target.value } })}
          />
        </div>
      </div>

      {/* 样式设置 */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">样式设置</h4>
        <ImageInput
          label="背景图片（可选）"
          value={props.backgroundImage || ''}
          onChange={(val) => onUpdate({ ...props, backgroundImage: val })}
          aspectRatio="banner"
        />
        <div className="space-y-2">
          <Label>背景颜色（无图片时使用渐变）</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={props.backgroundColor || ''}
              onChange={(e) => onUpdate({ ...props, backgroundColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={props.backgroundColor || ''}
              onChange={(e) => onUpdate({ ...props, backgroundColor: e.target.value })}
              className="flex-1"
              placeholder="留空使用默认渐变"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>对齐方式</Label>
          <Select
            value={props.alignment || 'center'}
            onValueChange={(val) => onUpdate({ ...props, alignment: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">左对齐</SelectItem>
              <SelectItem value="center">居中</SelectItem>
              <SelectItem value="right">右对齐</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
