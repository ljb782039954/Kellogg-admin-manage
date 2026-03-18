// 倒计时促销组件属性编辑器

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';

interface CountdownPropsEditorProps {
  props: {
    title?: { zh: string; en: string };
    subtitle?: { zh: string; en: string };
    endTime?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    buttonText?: { zh: string; en: string };
    buttonLink?: string;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function CountdownPropsEditor({ props, onUpdate }: CountdownPropsEditorProps) {
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
        />
      </div>

      {/* 倒计时设置 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">倒计时设置</h4>
        <div className="space-y-2">
          <Label>结束时间</Label>
          <Input
            type="datetime-local"
            value={props.endTime || ''}
            onChange={(e) => onUpdate({ ...props, endTime: e.target.value })}
          />
          <p className="text-xs text-gray-500">设置活动结束的日期和时间</p>
        </div>
      </div>

      {/* 背景设置 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">背景设置</h4>
        <ImageInput
          label="背景图片（可选）"
          value={props.backgroundImage || ''}
          onChange={(val) => onUpdate({ ...props, backgroundImage: val })}
          aspectRatio="banner"
        />
        <div className="space-y-2">
          <Label>背景颜色（无图片时使用）</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={props.backgroundColor || '#DC2626'}
              onChange={(e) => onUpdate({ ...props, backgroundColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={props.backgroundColor || '#DC2626'}
              onChange={(e) => onUpdate({ ...props, backgroundColor: e.target.value })}
              className="flex-1"
              placeholder="#DC2626"
            />
          </div>
        </div>
      </div>

      {/* 按钮设置 */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">按钮设置</h4>
        <BilingualInput
          label="按钮文字"
          value={props.buttonText || { zh: '', en: '' }}
          onChange={(val) => onUpdate({ ...props, buttonText: val })}
        />
        <div className="space-y-2">
          <Label>按钮链接</Label>
          <Input
            type="text"
            placeholder="如 /products"
            value={props.buttonLink || ''}
            onChange={(e) => onUpdate({ ...props, buttonLink: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
