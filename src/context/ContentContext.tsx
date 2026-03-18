import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteContent, Product } from '../types';
import { exampleContent, allProducts as defaultAllProducts } from '../config/exampleContent';

interface ContentContextType {
  content: SiteContent;
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
}

const CONTENT_STORAGE_KEY = 'minimal_site_content';
const PRODUCTS_STORAGE_KEY = 'minimal_all_products';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return exampleContent;
        }
      }
    }
    return exampleContent;
  });

  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultAllProducts;
        }
      }
    }
    return defaultAllProducts;
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

  const updateAllProducts = (products: Product[]) => {
    setAllProducts(products);
  };

  const updateCategories = (categories: SiteContent['products']['categories']) => {
    setContent((prev) => ({
      ...prev,
      products: { ...prev.products, categories }
    }));
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

  return (
    <ContentContext.Provider
      value={{
        content,
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
