import MotionHeader from '../custom/motionHeader';
import ProductCardFeatured from '../custom/ProductCardFeatured';
import type { Product, FeaturedProductsProps } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: FeaturedProductsProps;
  products: Product[];
}

export function FeaturedProducts({ t, props, products }: Props) {
  const { title, subtitle, maxItems } = props;

  const displayedProducts = maxItems ? products.slice(0, maxItems) : products;

  // 如果没有数据，直接返回null
  if (displayedProducts.length === 0) return null;

  return (
    <div className="py-8">
      <MotionHeader t={t} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-4 gap-4 px-4">
        {displayedProducts.map((product) => (
          <ProductCardFeatured
            key={product.id} t={t}
            product={product}
          />
        ))}
      </div>

    </div>
  );
}
