// 区块属性编辑面板

import { type PageBlock, } from '@/types/pageSchema';
import { componentRegistry } from '@/config/componentRegistry';
import * as LucideIcons from 'lucide-react';

// 轻量属性编辑器
import { TextSectionPropsEditor } from './propsEditors/TextSectionPropsEditor';
import { ImageBannerPropsEditor } from './propsEditors/ImageBannerPropsEditor';
import { ProductGridPropsEditor } from './propsEditors/ProductGridPropsEditor';
import { VideoSectionPropsEditor } from './propsEditors/VideoSectionPropsEditor';
import { LayoutPropsEditor } from './propsEditors/LayoutPropsEditor';

// 全局数据组件轻量编辑器
import { FAQPropsEditor } from './propsEditors/FAQPropsEditor';
import { CarouselPropsEditor } from './propsEditors/CarouselPropsEditor';
import { BrandValuesPropsEditor } from './propsEditors/BrandValuesPropsEditor';
import { StatisticsPropsEditor } from './propsEditors/StatisticsPropsEditor';
import { TestimonialsPropsEditor } from './propsEditors/TestimonialsPropsEditor';
import { FactoryPropsEditor } from './propsEditors/FactoryPropsEditor';
import { CategoriesPropsEditor } from './propsEditors/CategoriesPropsEditor';
import { NewArrivalsPropsEditor } from './propsEditors/NewArrivalsPropsEditor';
import { FeaturedProductsPropsEditor } from './propsEditors/FeaturedProductsPropsEditor';
import { ImageTextPropsEditor } from './propsEditors/ImageTextPropsEditor';
import { CountdownPropsEditor } from './propsEditors/CountdownPropsEditor';
import { PartnerLogosPropsEditor } from './propsEditors/PartnerLogosPropsEditor';
import { GalleryPropsEditor } from './propsEditors/GalleryPropsEditor';
import { FeatureListPropsEditor } from './propsEditors/FeatureListPropsEditor';
import { CtaBannerPropsEditor } from './propsEditors/CtaBannerPropsEditor';

interface BlockPropsEditorProps {
  block: PageBlock;
  onUpdate: (props: PageBlock['props']) => void;
}

export function BlockPropsEditor({ block, onUpdate }: BlockPropsEditorProps) {
  const meta = componentRegistry[block.type];
  const IconComponent = (LucideIcons as any)[meta.icon] || LucideIcons.Box;

  return (
    <div className="h-full flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center gap-3 pb-4 border-b mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">{meta.name.zh}</h3>
          <p className="text-sm text-gray-500">{meta.description.zh}</p>
        </div>
      </div>

      {/* 编辑内容 */}
      <div className="flex-1 overflow-y-auto">
        <PropsEditorSwitch block={block} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

// 根据组件类型渲染对应的属性编辑器
function PropsEditorSwitch({
  block,
  onUpdate,
}: {
  block: PageBlock;
  onUpdate: (props: PageBlock['props']) => void;
}) {
  const props = block.props as Record<string, unknown>;

  switch (block.type) {
    // 全局数据组件
    case 'carousel':
      return <CarouselPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'categories':
      return <CategoriesPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'newArrivals':
      return <NewArrivalsPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'featuredProducts':
      return <FeaturedProductsPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'brandValues':
      return <BrandValuesPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'statistics':
      return <StatisticsPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'testimonials':
      return <TestimonialsPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'factoryPreview':
      return <FactoryPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'faqPreview':
      return <FAQPropsEditor props={props as never} onUpdate={onUpdate as never} />;

    // 局部数据组件
    case 'textSection':
      return <TextSectionPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'imageBanner':
      return <ImageBannerPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'productGrid':
      return (
        <div className="space-y-4">
          <LayoutPropsEditor block={block} onUpdate={onUpdate} />
          <ProductGridPropsEditor props={props as never} onUpdate={onUpdate as never} />
        </div>
      );
    case 'videoSection':
      return <VideoSectionPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'imageText':
      return <ImageTextPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'countdown':
      return <CountdownPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'partnerLogos':
      return <PartnerLogosPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'gallery':
      return <GalleryPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'featureList':
      return <FeatureListPropsEditor props={props as never} onUpdate={onUpdate as never} />;
    case 'ctaBanner':
      return <CtaBannerPropsEditor props={props as never} onUpdate={onUpdate as never} />;

    default:
      return (
        <div className="text-center py-8 text-gray-500">
          暂无属性编辑器
        </div>
      );
  }
}
