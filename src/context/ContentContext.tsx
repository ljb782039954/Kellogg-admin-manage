import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteContent, Product } from '../types';
import { placeholderContent, placeholderProducts } from '../config/placeholder';

// 扩展类型，添加 categories 字段
interface ExtendedSiteContent extends SiteContent {
  categories?: { id: string; name: { zh: string; en: string } }[];
}

interface ContentContextType {
  content: ExtendedSiteContent;
  allProducts: Product[];
  updateContent: (newContent: SiteContent) => void;
  updateHeader: (header: SiteContent['header']) => void;
  updateHome: (home: SiteContent['home']) => void;
  updateProducts: (products: SiteContent['products']) => void;
  updateCategories: (categories: SiteContent['products']['categories']) => void;
  updateAllProducts: (products: Product[]) => void;
  updateNewArrivals: (newArrivals: SiteContent['newArrivals']) => void;
  updateFactory: (factory: SiteContent['factory']) => void;
  updateFAQ: (faq: SiteContent['faq']) => void;
  updateFooter: (footer: SiteContent['footer']) => void;
  updateStatistics: (statistics: SiteContent['home']['statistics']) => void;
  updateTestimonials: (testimonials: SiteContent['home']['testimonials']) => void;
  updateBrandValues: (brandValues: SiteContent['home']['brandValues']) => void;
  updateCarousel: (carousel: SiteContent['home']['carousel']) => void;
}

const CONTENT_STORAGE_KEY = 'minimal_site_content';
const PRODUCTS_STORAGE_KEY = 'minimal_all_products';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ExtendedSiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return placeholderContent;
        }
      }
    }
    return placeholderContent;
  });

  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return placeholderProducts;
        }
      }
    }
    return placeholderProducts;
  });

  useEffect(() => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(allProducts));
  }, [allProducts]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const updateHeader = (header: SiteContent['header']) => {
    setContent((prev) => ({ ...prev, header }));
  };

  const updateHome = (home: SiteContent['home']) => {
    setContent((prev) => ({ ...prev, home }));
  };

  const updateProducts = (products: SiteContent['products']) => {
    setContent((prev) => ({ ...prev, products }));
  };

  const updateCategories = (categories: SiteContent['products']['categories']) => {
    setContent((prev) => ({
      ...prev,
      products: { ...prev.products, categories },
      // 同时更新顶层 categories 以便组件访问
      categories,
    }));
  };

  const updateAllProducts = (products: Product[]) => {
    setAllProducts(products);
  };

  const updateNewArrivals = (newArrivals: SiteContent['newArrivals']) => {
    setContent((prev) => ({ ...prev, newArrivals }));
  };

  const updateFactory = (factory: SiteContent['factory']) => {
    setContent((prev) => ({ ...prev, factory }));
  };

  const updateFAQ = (faq: SiteContent['faq']) => {
    setContent((prev) => ({ ...prev, faq }));
  };

  const updateFooter = (footer: SiteContent['footer']) => {
    setContent((prev) => ({ ...prev, footer }));
  };

  const updateStatistics = (statistics: SiteContent['home']['statistics']) => {
    setContent((prev) => ({
      ...prev,
      home: { ...prev.home, statistics }
    }));
  };

  const updateTestimonials = (testimonials: SiteContent['home']['testimonials']) => {
    setContent((prev) => ({
      ...prev,
      home: { ...prev.home, testimonials }
    }));
  };

  const updateBrandValues = (brandValues: SiteContent['home']['brandValues']) => {
    setContent((prev) => ({
      ...prev,
      home: { ...prev.home, brandValues }
    }));
  };

  const updateCarousel = (carousel: SiteContent['home']['carousel']) => {
    setContent((prev) => ({
      ...prev,
      home: { ...prev.home, carousel }
    }));
  };

  return (
    <ContentContext.Provider
      value={{
        content: {
          ...content,
          // 确保 categories 可以从顶层访问
          categories: content.categories || content.products?.categories || [],
        },
        allProducts,
        updateContent,
        updateHeader,
        updateHome,
        updateProducts,
        updateCategories,
        updateAllProducts,
        updateNewArrivals,
        updateFactory,
        updateFAQ,
        updateFooter,
        updateStatistics,
        updateTestimonials,
        updateBrandValues,
        updateCarousel,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
