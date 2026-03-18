// 图片横幅属性编辑器

import { type ImageBannerBlockProps } from '@/types/pageSchema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BilingualInput from '../../components/BilingualInput';
import ImageInput from '../../components/ImageInput';

interface Props {
  props: ImageBannerBlockProps;
  onUpdate: (props: ImageBannerBlockProps) => void;
}

export function ImageBannerPropsEditor({ props, onUpdate }: Props) {
  const handleChange = <K extends keyof ImageBannerBlockProps>(
    key: K,
    value: ImageBannerBlockProps[K]
  ) => {
    onUpdate({ ...props, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* 图片 */}
      <div className="space-y-2">
        <Label>横幅图片</Label>
        <ImageInput
          value={props.image || ''}
          onChange={(value) => handleChange('image', value)}
        />
      </div>

      {/* 标题（可选） */}
      <div className="space-y-2">
        <Label>标题（可选）</Label>
        <BilingualInput
          value={props.title || { zh: '', en: '' }}
          onChange={(value) => handleChange('title', value)}
          placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
        />
      </div>

      {/* 副标题（可选） */}
      <div className="space-y-2">
        <Label>副标题（可选）</Label>
        <BilingualInput
          value={props.subtitle || { zh: '', en: '' }}
          onChange={(value) => handleChange('subtitle', value)}
          placeholder={{ zh: '请输入中文副标题', en: 'Enter English subtitle' }}
        />
      </div>

      {/* 链接 */}
      <div className="space-y-2">
        <Label>点击链接（可选）</Label>
        <Input
          value={props.linkUrl || ''}
          onChange={(e) => handleChange('linkUrl', e.target.value)}
          placeholder="https://example.com/page"
        />
      </div>

      {/* 高度 */}
      <div className="space-y-2">
        <Label>横幅高度</Label>
        <Select
          value={props.height || 'medium'}
          onValueChange={(value: 'small' | 'medium' | 'large' | 'full') =>
            handleChange('height', value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">小 (200px)</SelectItem>
            <SelectItem value="medium">中 (400px)</SelectItem>
            <SelectItem value="large">大 (600px)</SelectItem>
            <SelectItem value="full">全屏</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 遮罩 */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>显示遮罩</Label>
          <p className="text-xs text-gray-500">
            在图片上添加半透明遮罩，使文字更易读
          </p>
        </div>
        <Switch
          checked={props.overlay || false}
          onCheckedChange={(checked) => handleChange('overlay', checked)}
        />
      </div>
    </div>
  );
}
