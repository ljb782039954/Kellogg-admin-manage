import MotionHeader from '../custom/motionHeader';
import ProductCardNew from '../custom/productCardNew';
import type { NewArrivalsProps, Product } from '@/types';
import { useMemo } from 'react';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: NewArrivalsProps;
  products: Product[];
}

export function NewArrivals({ t, props, products }: Props) {
  const { title, subtitle, maxItems, } = props;

  const displayProducts = useMemo(() => {
    return products.slice(0, maxItems);
  }, [products, maxItems]);

  // 如果没有数据，直接返回null
  if (displayProducts.length === 0) return null;

  return (
    <div className="py-8">
      <MotionHeader t={t} title={title} subtitle={subtitle} />
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x">
        {displayProducts.map((product, index) => (
          <ProductCardNew key={product.id} product={product} t={t} index={index} />
        ))}
      </div>
    </div>
  );
}
