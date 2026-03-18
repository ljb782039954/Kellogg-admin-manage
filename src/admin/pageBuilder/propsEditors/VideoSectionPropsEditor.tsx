// 视频区块属性编辑器

import { type VideoSectionBlockProps } from '@/types/pageSchema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import BilingualInput from '../../components/BilingualInput';
import ImageInput from '../../components/ImageInput';

interface Props {
  props: VideoSectionBlockProps;
  onUpdate: (props: VideoSectionBlockProps) => void;
}

export function VideoSectionPropsEditor({ props, onUpdate }: Props) {
  const handleChange = <K extends keyof VideoSectionBlockProps>(
    key: K,
    value: VideoSectionBlockProps[K]
  ) => {
    onUpdate({ ...props, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="space-y-2">
        <Label>视频标题（可选）</Label>
        <BilingualInput
          value={props.title || { zh: '', en: '' }}
          onChange={(value) => handleChange('title', value)}
          placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
        />
      </div>

      {/* 副标题 */}
      <div className="space-y-2">
        <Label>副标题（可选）</Label>
        <BilingualInput
          value={props.subtitle || { zh: '', en: '' }}
          onChange={(value) => handleChange('subtitle', value)}
          placeholder={{ zh: '请输入中文副标题', en: 'Enter English subtitle' }}
        />
      </div>

      {/* 视频地址 */}
      <div className="space-y-2">
        <Label>视频地址</Label>
        <Input
          value={props.videoUrl || ''}
          onChange={(e) => handleChange('videoUrl', e.target.value)}
          placeholder="https://youtube.com/embed/xxx 或视频文件 URL"
        />
        <p className="text-xs text-gray-500">
          支持 YouTube、Vimeo 嵌入链接或直接视频文件 URL
        </p>
      </div>

      {/* 封面图 */}
      <div className="space-y-2">
        <Label>封面图（可选）</Label>
        <ImageInput
          value={props.posterImage || ''}
          onChange={(value) => handleChange('posterImage', value)}
        />
        <p className="text-xs text-gray-500">
          视频加载前显示的封面图片
        </p>
      </div>

      {/* 自动播放 */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>自动播放</Label>
          <p className="text-xs text-gray-500">
            页面加载后自动播放视频（通常会静音）
          </p>
        </div>
        <Switch
          checked={props.autoPlay || false}
          onCheckedChange={(checked) => handleChange('autoPlay', checked)}
        />
      </div>
    </div>
  );
}
