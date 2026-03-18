// 预定义组件预览页面

import { useState, useEffect } from 'react';
import { componentRegistry, componentsByCategory, categoryNames } from '@/config/componentRegistry';
import { defaultContent, allProducts } from '@/config/defaultContent';
import type { BlockType } from '@/types/pageSchema';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';

// 组件预览渲染器
function ComponentPreview({ type }: { type: BlockType }) {
  const { language } = useLanguage();
  const t = (obj: { zh: string; en: string }) => obj[language];

  switch (type) {
    case 'carousel':
      return <CarouselPreview t={t} />;
    case 'categories':
      return <CategoriesPreview t={t} />;
    case 'newArrivals':
      return <NewArrivalsPreview t={t} />;
    case 'featuredProducts':
      return <FeaturedProductsPreview t={t} />;
    case 'productGrid':
      return <ProductGridPreview t={t} />;
    case 'brandValues':
      return <BrandValuesPreview t={t} />;
    case 'statistics':
      return <StatisticsPreview t={t} />;
    case 'testimonials':
      return <TestimonialsPreview t={t} />;
    case 'factoryPreview':
      return <FactoryPreviewComponent t={t} />;
    case 'faqPreview':
      return <FAQPreviewComponent t={t} />;
    case 'textSection':
      return <TextSectionPreview t={t} />;
    case 'imageBanner':
      return <ImageBannerPreview t={t} />;
    case 'videoSection':
      return <VideoSectionPreview t={t} />;
    case 'imageText':
      return <ImageTextPreview t={t} />;
    case 'countdown':
      return <CountdownPreview t={t} />;
    case 'partnerLogos':
      return <PartnerLogosPreview t={t} />;
    case 'gallery':
      return <GalleryPreview t={t} />;
    case 'featureList':
      return <FeatureListPreview t={t} />;
    case 'ctaBanner':
      return <CtaBannerPreview t={t} />;
    default:
      return <div className="text-gray-500 text-center py-8">暂无预览</div>;
  }
}

// 轮播图预览 - 带自动轮播
function CarouselPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const slides = defaultContent.home.carousel.slides;
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentIndex];

  return (
    <div className="relative aspect-video bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg overflow-hidden">
      {/* 轮播内容 */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-2">{t(slide.title)}</h2>
          <p className="text-lg mb-4 opacity-90">{t(slide.subtitle)}</p>
          <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
            {t(slide.cta)}
          </button>
        </div>
      </div>

      {/* 左右切换按钮 */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <LucideIcons.ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <LucideIcons.ChevronRight className="w-6 h-6" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// 分类导航预览
function CategoriesPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const categories = defaultContent.products.categories.slice(1, 5);
  const icons = [LucideIcons.Shirt, LucideIcons.ShoppingBag, LucideIcons.Gem, LucideIcons.Watch];

  return (
    <div className="py-8 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-4 gap-4 px-4">
        {categories.map((cat, index) => {
          const Icon = icons[index] || LucideIcons.Box;
          return (
            <div key={cat.id} className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:shadow-md group-hover:scale-105 transition-all">
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {t(cat.name)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 新品预览
function NewArrivalsPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const products = [...allProducts]
    .filter((p) => p.releaseDate)
    .sort((a, b) => new Date(b.releaseDate!).getTime() - new Date(a.releaseDate!).getTime())
    .slice(0, 6);

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.newArrivals.title)}
      </h3>
      <p className="text-gray-500 text-center mb-6">
        {t(defaultContent.newArrivals.subtitle)}
      </p>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-48 snap-start group cursor-pointer">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              )}
              {product.tag && (
                <Badge className="absolute top-2 left-2 bg-green-500">{t(product.tag)}</Badge>
              )}
            </div>
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {t(product.name)}
            </p>
            <p className="text-sm text-primary font-bold">¥{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 精选商品预览
function FeaturedProductsPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const products = defaultContent.home.featuredProducts.items.slice(0, 4);
  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.home.featuredProducts.title)}
      </h3>
      <p className="text-gray-500 text-center mb-6">
        {t(defaultContent.home.featuredProducts.subtitle)}
      </p>
      <div className="grid grid-cols-4 gap-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              )}
              {product.tag && (
                <Badge className="absolute top-2 left-2">{t(product.tag)}</Badge>
              )}
            </div>
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {t(product.name)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary font-bold">¥{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ¥{product.originalPrice}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 商品网格预览 - 带分类、排序、分页
function ProductGridPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 筛选商品
  let filteredProducts = [...allProducts];
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // 排序
  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => (b.sales || 0) - (a.sales || 0));
  } else {
    filteredProducts.sort((a, b) =>
      new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime()
    );
  }

  // 分页
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = defaultContent.products.categories;
  const sortOptions = defaultContent.products.sortOptions;

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-center mb-6">
        {t({ zh: '商品展示', en: 'Products' })}
      </h3>

      {/* 筛选栏 */}
      <div className="flex items-center justify-between px-4 mb-6 gap-4">
        {/* 分类选择 */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setCategory(cat.id);
                setCurrentPage(1);
              }}
            >
              {t(cat.name)}
            </Button>
          ))}
        </div>

        {/* 排序 */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {t(opt.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-3 gap-4 px-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              )}
              {product.tag && (
                <Badge className="absolute top-2 left-2">{t(product.tag)}</Badge>
              )}
            </div>
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {t(product.name)}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-bold">¥{product.price}</span>
              {product.rating && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <LucideIcons.Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <LucideIcons.ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <LucideIcons.ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// 品牌价值预览
function BrandValuesPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const values = defaultContent.home.brandValues.values;
  return (
    <div className="py-12 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.home.brandValues.title)}
      </h3>
      <p className="text-gray-500 text-center mb-8">
        {t(defaultContent.home.brandValues.subtitle)}
      </p>
      <div className="grid grid-cols-4 gap-6 px-4">
        {values.map((value, i) => {
          const Icon = (LucideIcons as any)[value.icon] || LucideIcons.Star;
          return (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">{t(value.title)}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{t(value.description)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 统计数据预览 - 添加副标题
function StatisticsPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const stats = defaultContent.home.statistics.stats;
  return (
    <div className="py-12 bg-primary text-white rounded-lg">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.home.statistics.title)}
      </h3>
      <p className="text-white/70 text-center mb-8">
        {t({ zh: '我们用数据说话', en: 'Let the numbers speak' })}
      </p>
      <div className="grid grid-cols-4 gap-4 px-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-80">{t(stat.label)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 客户评价预览
function TestimonialsPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const testimonials = defaultContent.home.testimonials.items.slice(0, 3);
  return (
    <div className="py-12">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.home.testimonials.title)}
      </h3>
      <p className="text-gray-500 text-center mb-8">
        {t(defaultContent.home.testimonials.subtitle)}
      </p>
      <div className="grid grid-cols-3 gap-4 px-4">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                {item.avatar && (
                  <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <div className="font-medium text-sm">{t(item.name)}</div>
                <div className="text-xs text-gray-500">{t(item.role)}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">{t(item.content)}</p>
            <div className="flex mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <LucideIcons.Star
                  key={star}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 工厂预览组件
function FactoryPreviewComponent({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  return (
    <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={defaultContent.factory.heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h3 className="text-2xl font-bold mb-2">{t(defaultContent.factory.heroTitle)}</h3>
        <p className="text-sm opacity-80 mb-4">{t(defaultContent.factory.heroSubtitle)}</p>
        <button className="px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
          {t({ zh: '了解更多', en: 'Learn More' })}
        </button>
      </div>
    </div>
  );
}

// FAQ 预览组件
function FAQPreviewComponent({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const items = defaultContent.faq.items.slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-center mb-2">
        {t(defaultContent.faq.title)}
      </h3>
      <p className="text-gray-500 text-center mb-6">
        {t(defaultContent.faq.subtitle)}
      </p>
      <div className="space-y-3 px-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center gap-2 p-4 font-medium text-left hover:bg-gray-100 transition-colors"
            >
              <LucideIcons.HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="flex-1">{t(item.question)}</span>
              <LucideIcons.ChevronDown
                className={cn(
                  'w-4 h-4 text-gray-400 transition-transform',
                  openIndex === index && 'rotate-180'
                )}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 pl-10 text-sm text-gray-600">
                {t(item.answer)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Button variant="outline" size="sm">
          {t({ zh: '查看更多', en: 'View More' })}
        </Button>
      </div>
    </div>
  );
}

// 文本区块预览
function TextSectionPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  return (
    <div className="py-12 text-center bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">
        {t({ zh: '关于我们的品牌', en: 'About Our Brand' })}
      </h3>
      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {t({
          zh: '我们始终坚持以品质为先，用心打造每一件产品。从选材到工艺，每一个环节都经过精心把控。我们相信，简约而不简单的设计理念，能够为您带来更加舒适、优雅的生活体验。',
          en: 'We always put quality first and craft every product with care. From material selection to craftsmanship, every step is carefully controlled. We believe that a simple yet sophisticated design philosophy can bring you a more comfortable and elegant lifestyle.',
        })}
      </p>
    </div>
  );
}

// 图片横幅预览 - 使用实际图片
function ImageBannerPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  return (
    <div className="relative h-64 rounded-lg overflow-hidden">
      <img
        src={defaultContent.home.carousel.slides[1]?.image || '/images/hero/hero2.jpg'}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h3 className="text-2xl font-bold mb-2">
          {t({ zh: '限时特惠', en: 'Limited Time Offer' })}
        </h3>
        <p className="text-sm opacity-90 mb-4">
          {t({ zh: '精选商品低至5折起', en: 'Selected items up to 50% off' })}
        </p>
        <button className="px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
          {t({ zh: '立即抢购', en: 'Shop Now' })}
        </button>
      </div>
    </div>
  );
}

// 视频区块预览
function VideoSectionPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-center mb-2">
        {t({ zh: '品牌故事', en: 'Brand Story' })}
      </h3>
      <p className="text-gray-500 text-center mb-6">
        {t({ zh: '了解我们的故事与理念', en: 'Discover our story and philosophy' })}
      </p>
      <div
        className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden group"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img
          src={defaultContent.factory.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
        />
        {!isPlaying ? (
          <div className="relative text-center text-white">
            <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <LucideIcons.Play className="w-8 h-8 ml-1" />
            </div>
            <p className="text-sm opacity-80">{t({ zh: '点击播放视频', en: 'Click to play video' })}</p>
          </div>
        ) : (
          <div className="relative text-center text-white">
            <LucideIcons.Pause className="w-16 h-16 mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-60">{t({ zh: '视频播放中...', en: 'Playing video...' })}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 图文组件预览 - 新增
function ImageTextPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-8 px-4">
        {/* 左侧图片 */}
        <div className="flex-1">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={defaultContent.factory.sections[0]?.image || '/images/factory/company4.jpg'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 右侧文本 */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold">
            {t({ zh: '精湛工艺，品质保证', en: 'Exquisite Craftsmanship, Quality Guaranteed' })}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {t({
              zh: '我们引进了国际先进的生产设备，确保每一件产品都达到最高标准。从裁剪到缝制，每一个环节都经过严格把控。我们对品质的执着追求，是我们品牌的核心竞争力。',
              en: 'We have introduced internationally advanced production equipment to ensure every product meets the highest standards. From cutting to sewing, every step is strictly controlled. Our persistent pursuit of quality is the core competitiveness of our brand.',
            })}
          </p>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            {t({ zh: '了解更多', en: 'Learn More' })}
          </button>
        </div>
      </div>

      {/* 右图左文示例 */}
      <div className="flex items-center gap-8 px-4 mt-8 pt-8 border-t">
        {/* 左侧文本 */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold">
            {t({ zh: '可持续时尚', en: 'Sustainable Fashion' })}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {t({
              zh: '我们致力于可持续发展，采用环保材料和工艺，减少对环境的影响。每一件产品都承载着我们对地球的责任与承诺。',
              en: 'We are committed to sustainable development, using eco-friendly materials and processes to minimize environmental impact. Every product carries our responsibility and commitment to the planet.',
            })}
          </p>
          <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
            {t({ zh: '探索系列', en: 'Explore Collection' })}
          </button>
        </div>

        {/* 右侧图片 */}
        <div className="flex-1">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={defaultContent.factory.sections[1]?.image || '/images/factory/company5.jpg'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 倒计时促销预览
function CountdownPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 });

  // 模拟倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="relative py-16 overflow-hidden">
      <img
        src={defaultContent.home.carousel.slides[0]?.image || '/images/hero/hero1.jpg'}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-orange-500/90" />
      <div className="relative text-center text-white">
        <h2 className="text-3xl font-bold mb-2">
          {t({ zh: '限时特惠 · 疯狂抢购', en: 'Flash Sale · Limited Time' })}
        </h2>
        <p className="text-lg opacity-90 mb-8">
          {t({ zh: '全场商品低至3折起，错过再等一年！', en: 'Up to 70% off on all items!' })}
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <span className="text-sm mt-2 opacity-80">{t({ zh: '天', en: 'Days' })}</span>
          </div>
          <div className="text-3xl font-bold self-start mt-4">:</div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-sm mt-2 opacity-80">{t({ zh: '时', en: 'Hours' })}</span>
          </div>
          <div className="text-3xl font-bold self-start mt-4">:</div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-sm mt-2 opacity-80">{t({ zh: '分', en: 'Min' })}</span>
          </div>
          <div className="text-3xl font-bold self-start mt-4">:</div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="text-sm mt-2 opacity-80">{t({ zh: '秒', en: 'Sec' })}</span>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          {t({ zh: '立即抢购', en: 'Shop Now' })}
        </button>
      </div>
    </div>
  );
}

// 合作伙伴/品牌墙预览
function PartnerLogosPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const partners = [
    { name: 'Brand A', color: '#3B82F6' },
    { name: 'Brand B', color: '#10B981' },
    { name: 'Brand C', color: '#F59E0B' },
    { name: 'Brand D', color: '#EF4444' },
    { name: 'Brand E', color: '#8B5CF6' },
    { name: 'Brand F', color: '#EC4899' },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h3 className="text-xl font-bold text-center mb-2">
        {t({ zh: '合作伙伴', en: 'Our Partners' })}
      </h3>
      <p className="text-gray-500 text-center mb-8">
        {t({ zh: '与全球知名品牌携手共进', en: 'Working with world-renowned brands' })}
      </p>
      <div className="flex justify-center items-center gap-8 px-8 flex-wrap">
        {partners.map((partner, i) => (
          <div
            key={i}
            className="w-32 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 cursor-pointer"
          >
            <div
              className="text-xl font-bold"
              style={{ color: partner.color }}
            >
              {partner.name}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">
        {t({ zh: '以及更多优质合作伙伴...', en: 'And many more quality partners...' })}
      </p>
    </div>
  );
}

// 图片画廊预览
function GalleryPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const images = [
    { src: defaultContent.home.carousel.slides[0]?.image, caption: { zh: '品牌故事', en: 'Brand Story' } },
    { src: defaultContent.factory.sections[0]?.image, caption: { zh: '生产工艺', en: 'Craftsmanship' } },
    { src: defaultContent.home.carousel.slides[1]?.image, caption: { zh: '产品展示', en: 'Products' } },
    { src: defaultContent.factory.sections[1]?.image, caption: { zh: '设计团队', en: 'Design Team' } },
    { src: defaultContent.home.carousel.slides[2]?.image, caption: { zh: '配饰系列', en: 'Accessories' } },
    { src: defaultContent.factory.heroImage, caption: { zh: '工厂全景', en: 'Factory View' } },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="py-12">
      <h3 className="text-xl font-bold text-center mb-2">
        {t({ zh: '品牌画廊', en: 'Brand Gallery' })}
      </h3>
      <p className="text-gray-500 text-center mb-8">
        {t({ zh: '探索我们的品牌故事', en: 'Explore our brand story' })}
      </p>
      <div className="grid grid-cols-3 gap-4 px-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(i)}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                <LucideIcons.ZoomIn className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm">{t(img.caption)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 灯箱效果 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <LucideIcons.X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
            }}
          >
            <LucideIcons.ChevronLeft className="w-12 h-12" />
          </button>
          <img
            src={images[selectedImage].src}
            alt=""
            className="max-w-4xl max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev! + 1) % images.length);
            }}
          >
            <LucideIcons.ChevronRight className="w-12 h-12" />
          </button>
          <div className="absolute bottom-8 text-white text-center">
            <p className="text-lg">{t(images[selectedImage].caption)}</p>
            <p className="text-sm opacity-60">{selectedImage + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 特性列表预览
function FeatureListPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  const features = [
    {
      icon: 'Truck',
      title: { zh: '免费配送', en: 'Free Shipping' },
      description: { zh: '订单满299元即可享受全国免费配送服务', en: 'Free shipping on orders over ¥299' },
    },
    {
      icon: 'RotateCcw',
      title: { zh: '7天无理由退换', en: '7-Day Returns' },
      description: { zh: '收到商品7天内可申请无理由退换货', en: 'Return or exchange within 7 days' },
    },
    {
      icon: 'Shield',
      title: { zh: '正品保障', en: 'Authentic Guarantee' },
      description: { zh: '100%正品保证，假一赔十', en: '100% authentic products guaranteed' },
    },
    {
      icon: 'Headphones',
      title: { zh: '专属客服', en: '24/7 Support' },
      description: { zh: '7x24小时在线客服，随时为您解答', en: 'Round-the-clock customer support' },
    },
    {
      icon: 'CreditCard',
      title: { zh: '安全支付', en: 'Secure Payment' },
      description: { zh: '支持多种支付方式，交易安全有保障', en: 'Multiple secure payment options' },
    },
    {
      icon: 'Gift',
      title: { zh: '会员专享', en: 'Member Benefits' },
      description: { zh: '注册会员即享专属折扣和积分奖励', en: 'Exclusive discounts for members' },
    },
  ];

  return (
    <div className="py-12">
      <h3 className="text-xl font-bold text-center mb-2">
        {t({ zh: '我们的服务优势', en: 'Our Service Features' })}
      </h3>
      <p className="text-gray-500 text-center mb-8">
        {t({ zh: '为您提供最优质的购物体验', en: 'Providing the best shopping experience' })}
      </p>
      <div className="grid grid-cols-3 gap-6 px-4">
        {features.map((feature, i) => {
          const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Star;
          return (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-6 hover:bg-primary/5 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{t(feature.title)}</h4>
              <p className="text-sm text-gray-500">{t(feature.description)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// CTA行动号召预览
function CtaBannerPreview({ t }: { t: (obj: { zh: string; en: string }) => string }) {
  return (
    <div className="space-y-8">
      {/* 样式1: 渐变背景 */}
      <div className="relative py-16 bg-gradient-to-r from-primary to-purple-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full" />
        </div>
        <div className="relative text-center text-white">
          <h2 className="text-3xl font-bold mb-3">
            {t({ zh: '开启您的时尚之旅', en: 'Start Your Fashion Journey' })}
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            {t({ zh: '注册即享新人专属优惠，首单立减50元', en: 'Sign up and get ¥50 off your first order' })}
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {t({ zh: '立即注册', en: 'Sign Up Now' })}
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
              {t({ zh: '了解更多', en: 'Learn More' })}
            </button>
          </div>
        </div>
      </div>

      {/* 样式2: 图片背景 */}
      <div className="relative py-16 rounded-lg overflow-hidden">
        <img
          src={defaultContent.home.carousel.slides[2]?.image || '/images/hero/hero3.jpg'}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-white px-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-3">
              {t({ zh: '精致配饰系列', en: 'Exquisite Accessories' })}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {t({ zh: '点缀您的优雅人生，细节之处见真章', en: 'Embellish your elegant life with attention to detail' })}
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {t({ zh: '探索系列', en: 'Explore Collection' })}
            </button>
          </div>
        </div>
      </div>

      {/* 样式3: 简约风格 */}
      <div className="py-12 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between px-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {t({ zh: '订阅我们的资讯', en: 'Subscribe to Our Newsletter' })}
            </h2>
            <p className="text-gray-400">
              {t({ zh: '获取最新产品信息和专属优惠', en: 'Get the latest products and exclusive offers' })}
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder={t({ zh: '输入您的邮箱', en: 'Enter your email' })}
              className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              {t({ zh: '订阅', en: 'Subscribe' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 主页面组件
export default function ComponentsPreview() {
  const [selectedType, setSelectedType] = useState<BlockType>('carousel');
  const { language } = useLanguage();

  const meta = componentRegistry[selectedType];
  const IconComponent = (LucideIcons as any)[meta.icon] || LucideIcons.Box;

  return (
    <div className="flex h-full -m-8">
      {/* 左侧组件列表 */}
      <div className="w-72 border-r bg-gray-50/50 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">预定义组件库</h2>
          <p className="text-sm text-gray-500 mt-1">共 {Object.keys(componentRegistry).length} 个组件</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {Object.entries(componentsByCategory).map(([category, types]) => (
              <div key={category}>
                <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">
                  {categoryNames[category as keyof typeof categoryNames][language]}
                </h3>
                <div className="space-y-1">
                  {types.map((type) => {
                    const compMeta = componentRegistry[type];
                    const CompIcon = (LucideIcons as any)[compMeta.icon] || LucideIcons.Box;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                          selectedType === type
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        )}
                      >
                        <CompIcon className="w-4 h-4" />
                        <span className="text-sm">{compMeta.name[language]}</span>
                        {compMeta.hasGlobalData && (
                          <Badge variant="outline" className={cn('ml-auto text-[10px]', selectedType === type && 'border-white/50 text-white')}>
                            全局
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 右侧预览区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 组件信息 */}
        <div className="p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{meta.name[language]}</h3>
              <p className="text-sm text-gray-500">{meta.description[language]}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {meta.hasGlobalData && (
                <Badge variant="secondary">全局数据</Badge>
              )}
              {meta.singleton && (
                <Badge variant="outline">单例</Badge>
              )}
            </div>
          </div>
        </div>

        {/* 预览内容 */}
        <ScrollArea className="flex-1 bg-gray-100">
          <div className="p-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ComponentPreview type={selectedType} />
            </div>

            {/* 组件说明 */}
            <div className="mt-6 bg-white rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <LucideIcons.Info className="w-4 h-4 text-blue-500" />
                组件说明
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>数据来源：</strong>
                  {meta.hasGlobalData ? '使用全局配置数据，在对应的编辑器中管理' : '使用局部数据，在页面编辑器中配置'}
                </p>
                <p>
                  <strong>使用限制：</strong>
                  {meta.singleton ? '每个页面只能使用一次' : '可在同一页面多次使用'}
                </p>
                {meta.defaultProps && Object.keys(meta.defaultProps).length > 0 && (
                  <p>
                    <strong>默认配置：</strong>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded ml-1">
                      {JSON.stringify(meta.defaultProps)}
                    </code>
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
