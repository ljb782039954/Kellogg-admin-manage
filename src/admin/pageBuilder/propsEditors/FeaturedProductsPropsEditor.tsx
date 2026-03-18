// 精选商品组件属性编辑器（轻量版）

import { useContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BilingualInput from '@/admin/components/BilingualInput';

interface FeaturedProductsPropsEditorProps {
  props: {
    title?: { zh: string; en: string };
    maxItems?: number;
    layout?: 'grid' | 'slider';
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function FeaturedProductsPropsEditor({ props, onUpdate }: FeaturedProductsPropsEditorProps) {
  const { content, allProducts } = useContent();

  // 获取精选商品（使用 featuredProducts 数据或从 allProducts 筛选）
  const featuredItems = content.home.featuredProducts.items;
  const featuredProducts = featuredItems.length > 0
    ? featuredItems
    : (allProducts || []).slice(0, props.maxItems || 8);

  return (
    <div className="space-y-6">
      {/* 区块标题 */}
      <div className="space-y-3 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">区块标题</h4>
        <BilingualInput
          label="主标题"
          value={props.title || content.home.featuredProducts.title}
          onChange={(val) => onUpdate({ ...props, title: val })}
        />
      </div>

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
              value={props.maxItems || 8}
              onChange={(e) => onUpdate({ ...props, maxItems: parseInt(e.target.value) || 8 })}
            />
          </div>
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
                <SelectItem value="grid">网格展示</SelectItem>
                <SelectItem value="slider">滑动展示</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 数据来源说明 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          精选商品数据来自「商品管理」中的商品。如需调整展示的商品，请前往「商品管理」编辑。
        </AlertDescription>
      </Alert>

      {/* 当前精选预览 */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">当前精选预览（{featuredProducts.length} 件）</h4>
        {featuredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无精选商品</p>
            <p className="text-xs mt-1">请在「商品管理」中添加商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {featuredProducts.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name.zh}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    无图
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
