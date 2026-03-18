// 商品网格属性编辑器

import { type ProductGridBlockProps } from '@/types/pageSchema';
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
import { useContent } from '@/context/ContentContext';

interface Props {
  props: ProductGridBlockProps;
  onUpdate: (props: ProductGridBlockProps) => void;
}

export function ProductGridPropsEditor({ props, onUpdate }: Props) {
  const { content } = useContent();
  const categories = content.categories || [];

  const handleChange = <K extends keyof ProductGridBlockProps>(
    key: K,
    value: ProductGridBlockProps[K]
  ) => {
    onUpdate({ ...props, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="space-y-2">
        <Label>区块标题</Label>
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

      {/* 分类筛选 */}
      <div className="space-y-2">
        <Label>商品分类筛选</Label>
        <Select
          value={props.categoryFilter || 'all'}
          onValueChange={(value) =>
            handleChange('categoryFilter', value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="选择分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name.zh}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 显示数量 */}
      <div className="space-y-2">
        <Label>显示数量</Label>
        <Input
          type="number"
          min={1}
          max={50}
          value={props.maxItems || 12}
          onChange={(e) => handleChange('maxItems', parseInt(e.target.value) || 12)}
        />
      </div>

      {/* 布局方式 */}
      <div className="space-y-2">
        <Label>布局方式</Label>
        <Select
          value={props.layout || 'grid'}
          onValueChange={(value: 'grid' | 'slider') =>
            handleChange('layout', value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">网格布局</SelectItem>
            <SelectItem value="slider">滑动布局</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 显示更多链接 */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>显示"查看更多"链接</Label>
          <p className="text-xs text-gray-500">
            在区块底部显示跳转到商品列表的链接
          </p>
        </div>
        <Switch
          checked={props.showMoreLink ?? true}
          onCheckedChange={(checked) => handleChange('showMoreLink', checked)}
        />
      </div>
    </div>
  );
}
