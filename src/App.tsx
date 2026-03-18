import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';

// Admin 组件
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import Overview from './admin/Overview';
import AccountSettings from './admin/AccountSettings';

// 编辑器
import HeaderEditor from './admin/editors/HeaderEditor';
import CarouselEditor from './admin/editors/CarouselEditor';
import ProductsEditor from './admin/editors/ProductsEditor';
import CategoriesEditor from './admin/editors/CategoriesEditor';
import BrandValuesEditor from './admin/editors/BrandValuesEditor';
import StatisticsEditor from './admin/editors/StatisticsEditor';
import TestimonialsEditor from './admin/editors/TestimonialsEditor';
import FeaturedProductsEditor from './admin/editors/FeaturedProductsEditor';
import AllProductsPageEditor from './admin/editors/AllProductsPageEditor';
import NewArrivalsPageEditor from './admin/editors/NewArrivalsPageEditor';
import FactoryEditor from './admin/editors/FactoryEditor';
import FAQEditor from './admin/editors/FAQEditor';
import FooterEditor from './admin/editors/FooterEditor';

function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Overview />} />
              <Route path="header" element={<HeaderEditor />} />
              <Route path="carousel" element={<CarouselEditor />} />
              <Route path="products" element={<ProductsEditor />} />
              <Route path="categories" element={<CategoriesEditor />} />
              <Route path="brand-values" element={<BrandValuesEditor />} />
              <Route path="statistics" element={<StatisticsEditor />} />
              <Route path="testimonials" element={<TestimonialsEditor />} />
              <Route path="featured-products" element={<FeaturedProductsEditor />} />
              <Route path="all-products" element={<AllProductsPageEditor />} />
              <Route path="new-arrivals" element={<NewArrivalsPageEditor />} />
              <Route path="factory" element={<FactoryEditor />} />
              <Route path="faq" element={<FAQEditor />} />
              <Route path="footer" element={<FooterEditor />} />
              <Route path="account" element={<AccountSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;
