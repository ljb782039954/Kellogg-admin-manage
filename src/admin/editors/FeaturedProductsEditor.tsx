import { useState, useMemo } from 'react';
import { motion} from 'framer-motion';
import { Save, Search, CheckCircle2, Circle, AlertCircle, Eye, Star } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Product } from '../../types';

export default function FeaturedProductsEditor() {
  const { allProducts, content, updateHome } = useContent();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [saved, setSaved] = useState(false);

  // Get current featured IDs for initialization
  const initialFeaturedIds = useMemo(() => {
    return (content.home.featuredProducts.items || []).map(p => p.id);
  }, [content.home.featuredProducts.items]);

  const [selectedIds, setSelectedIds] = useState<number[]>(initialFeaturedIds);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => 
      p.name.zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm)
    );
  }, [allProducts, searchTerm]);

  const toggleProduct = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      if (selectedIds.length >= 4) {
        // Option 1: Just prevent selection
        // Option 2: Remove oldest? 
        // We'll stick to manual management for precision
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSave = () => {
    if (selectedIds.length === 0) {
       alert(language === 'zh' ? '请至少选择一个精选商品' : 'Please select at least one featured product');
       return;
    }

    // Map IDs back to full product objects from allProducts
    const newFeaturedItems = selectedIds.map(id => {
      return allProducts.find(p => p.id === id);
    }).filter(Boolean) as Product[];

    updateHome({
      ...content.home,
      featuredProducts: {
        ...content.home.featuredProducts,
        items: newFeaturedItems
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            首页精选管理
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold">
              TOP 4 展位
            </span>
          </h1>
          <p className="text-gray-500 mt-1">从全部商品中挑选 4 件作为首页核心展示。</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-bold shadow-lg shadow-gray-200"
        >
          <Save className="w-4 h-4" />
          更新首页展示
        </button>
      </div>

      {saved && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2 text-sm font-medium"
        >
          <CheckCircle2 className="w-4 h-4" />
          首页精选已更新！前台效果已同步。
        </motion.div>
      )}

      {/* Selected Slots Visualization */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(idx => {
          const productId = selectedIds[idx];
          const product = allProducts.find(p => p.id === productId);

          return (
            <div 
              key={idx}
              className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
                product ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            >
              {product ? (
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 rounded-xl overflow-hidden mb-3 relative group">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => toggleProduct(product.id)}
                      className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"
                    >
                      <Circle className="w-6 h-6" />
                      <span className="text-xs font-bold font-sans">REMOVE</span>
                    </button>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-400 text-white text-[10px] font-black rounded-md">
                      SLOT {idx + 1}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm truncate">{product.name[language]}</h4>
                  <p className="text-gray-400 text-xs font-mono mt-1">ID: {product.id}</p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-2">
                    <Star className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center">
                    Pending Slot {idx + 1}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-4">
        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <p className="font-bold text-amber-900">配置建议</p>
          <p className="text-amber-700 mt-1 leading-relaxed">
            为了获得最佳的视觉效果，首页精选建议选择具有**不同颜色**和**高画质图源**的商品。
            目前已选择 <span className="underline font-black">{selectedIds.length}/4</span> 个展位。
          </p>
        </div>
      </div>

      {/* Product Selector List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索商品名称或 ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="text-xs text-gray-400 font-bold whitespace-nowrap">
            匹配到 {filteredProducts.length} 件商品
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">选择</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">商品</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">分类</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map(product => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <tr 
                    key={product.id}
                    className={`group hover:bg-gray-50 transition-colors ${isSelected ? 'bg-amber-50/30' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleProduct(product.id)}
                        className={`transition-all ${isSelected ? 'text-amber-500' : 'text-gray-200 hover:text-gray-300'}`}
                      >
                        {isSelected ? <CheckCircle2 className="w-6 h-6 fill-current" /> : <Circle className="w-6 h-6" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{product.name[language]}</p>
                          <p className="text-[10px] text-gray-400 font-mono">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        className="p-2 text-gray-300 hover:text-gray-600 rounded-lg transition-all"
                        title="预览详情页"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-gray-400 text-sm">未找到匹配商品</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
