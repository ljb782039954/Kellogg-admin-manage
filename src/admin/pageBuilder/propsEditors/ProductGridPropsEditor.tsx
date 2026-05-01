// 产品网格属性编辑器
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ProductGridProps } from '@/components/blocks/ProductGrid';

export interface ProductGridPropsEditorProps {
  props: ProductGridProps;
  onUpdate: (props: ProductGridProps) => void;
}

export function ProductGridPropsEditor({ props, onUpdate }: ProductGridPropsEditorProps) {

  const handleChange = (key: string, value: unknown) => {
    onUpdate({ ...props, [key]: value });
  };

  return (
    <div className="space-y-6">

      {/* 设置每页显示数量 */}
      <div className="space-y-2">
        <Label>每页显示数量</Label>
        <Input
          type="number"
          min={1}
          max={50}
          value={props.itemsPerPage || 12}
          onChange={(e) => handleChange('itemsPerPage', parseInt(e.target.value) || 12)}
        />
      </div>
    </div>
  );
}
