// Language type
export type Language = 'zh' | 'en';

// Translation interface
export interface Translation {
  zh: string;
  en: string;
}

// Header content
export interface HeaderContent {
  logoText: Translation;
  navItems: { name: Translation; href: string }[];
}

// Carousel slide
export interface CarouselSlide {
  image: string;
  title: Translation;
  subtitle: Translation;
  cta: Translation;
}

// Product
export interface Product {
  id: number;
  name: Translation;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  sales?: number;
  tag?: Translation;
  category?: string;
  releaseDate?: string;
  description?: Translation;
}

// Single image content
export interface SingleImageContent {
  image: string;
  title: Translation;
  subtitle: Translation;
  cta: Translation;
}

// Brand Value Item
export interface BrandValue {
  icon: string;
  title: Translation;
  description: Translation;
}

// Brand Values Section
export interface BrandValuesContent {
  title: Translation;
  subtitle: Translation;
  values: BrandValue[];
}

// Statistic Item
export interface Statistic {
  value: string;
  label: Translation;
}

// Statistics Section
export interface StatisticsContent {
  title: Translation;
  stats: Statistic[];
}

// Testimonial
export interface Testimonial {
  id: number;
  name: Translation;
  role: Translation;
  content: Translation;
  avatar: string;
}

// Testimonials Section
export interface TestimonialsContent {
  title: Translation;
  subtitle: Translation;
  items: Testimonial[];
}

// Factory Section
export interface FactorySection {
  image: string;
  title: Translation;
  content: Translation;
}

// Factory Page Content
export interface FactoryContent {
  heroImage: string;
  heroTitle: Translation;
  heroSubtitle: Translation;
  sections: FactorySection[];
}

// FAQ Item
export interface FAQItem {
  id: number;
  question: Translation;
  answer: Translation;
}

// FAQ Page Content
export interface FAQContent {
  title: Translation;
  subtitle: Translation;
  items: FAQItem[];
}

// Footer links
export interface FooterLinkGroup {
  title: Translation;
  links: { name: Translation; href: string }[];
}

// Footer content
export interface FooterContent {
  linkGroups: FooterLinkGroup[];
  newsletterPlaceholder: Translation;
  newsletterButton: Translation;
}

// Home Page Content
export interface HomePageContent {
  carousel: {
    slides: CarouselSlide[];
  };
  brandValues: BrandValuesContent;
  statistics: StatisticsContent;
  testimonials: TestimonialsContent;
  featuredProducts: {
    title: Translation;
    subtitle: Translation;
    items: Product[];
  };
}

// Products Page Content
export interface ProductsPageContent {
  title: Translation;
  subtitle: Translation;
  categories: { id: string; name: Translation }[];
  sortOptions: { id: string; name: Translation }[];
  itemsPerPage: number;
}

// New Arrivals Page Content
export interface NewArrivalsPageContent {
  title: Translation;
  subtitle: Translation;
}

// Complete site content
export interface SiteContent {
  header: HeaderContent;
  home: HomePageContent;
  products: ProductsPageContent;
  newArrivals: NewArrivalsPageContent;
  factory: FactoryContent;
  faq: FAQContent;
  footer: FooterContent;
}

// Admin user
export interface AdminUser {
  username: string;
  password: string;
}
