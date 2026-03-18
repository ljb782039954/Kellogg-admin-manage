import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Star, TrendingUp, Calendar, Tag, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import BilingualInput from '../components/BilingualInput';
import ImageInput from '../components/ImageInput';
import type { Product } from '../../types';

export default function ProductsEditor() {
  const { allProducts, updateAllProducts, content } = useContent();
  const { language } = useLanguage();
  const [localProducts, setLocalProducts] = useState<Product[]>(() =>
    allProducts.map(p => {
      const images = p.images && p.images.length > 0 ? p.images : [p.image];
      return {
        ...p,
        images,
        image: images[0]
      };
    })
  );
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const categories = content.products.categories;

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === localProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(localProducts.map((p) => p.id)));
    }
  };

  const handleBatchDelete = () => {
    if (selectedIds.size === 0) return;

    const count = selectedIds.size;
    const confirmMsg = language === 'zh'
      ? `确定要删除这 ${count} 个商品吗？此操作不可撤销。`
      : `Are you sure you want to delete these ${count} products? This action cannot be undone.`;

    if (window.confirm(confirmMsg)) {
      setLocalProducts(localProducts.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
    }
  };

  const handleSave = () => {
    updateAllProducts(localProducts);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addProduct = () => {
    const newId = Math.max(...localProducts.map((p) => p.id), 0) + 1;
    const newProduct: Product = {
      id: newId,
      name: { zh: '新产品', en: 'New Product' },
      price: 0,
      image: '',
      images: [],
      rating: 5,
      sales: 0,
      category: categories.length > 0 ? categories[0].id : '',
      releaseDate: new Date().toISOString().split('T')[0],
      tag: { zh: '', en: '' }
    };
    setLocalProducts([newProduct, ...localProducts]);
    setExpandedId(newId);
  };

  const updateProduct = <K extends keyof Product>(id: number, field: K, value: Product[K]) => {
    setLocalProducts(
      localProducts.map((p): Product => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };
          // 如果修改了详情图集，自动将第一张设置为展示图
          if (field === 'images' && Array.isArray(value)) {
            updated.image = value.length > 0 ? value[0] as string : '';
          }
          return updated as Product;
        }
        return p;
      })
    );
  };

  const removeProduct = (id: number) => {
    if (confirm(language === 'zh' ? '确定要删除这个商品吗？' : 'Are you sure you want to delete this product?')) {
      setLocalProducts(localProducts.filter((p) => p.id !== id));
      const nextSelected = new Set(selectedIds);
      nextSelected.delete(id);
      setSelectedIds(nextSelected);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            商品主仓库
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-full font-mono">
              v2.0
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">管理全站商品参数。支持批量管理及图集展示。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-bold text-sm border border-red-100 animate-in fade-in slide-in-from-right-2"
            >
              <Trash2 className="w-4 h-4" />
              批量删除 ({selectedIds.size})
            </button>
          )}
          <button
            onClick={addProduct}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" />
            添加商品
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg text-sm"
          >
            <Save className="w-4 h-4" />
            保存全部改动
          </button>
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2 text-sm"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          保存成功！更新已发布至全站。
        </motion.div>
      )}

      {/* Stats & Filter Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.size === localProducts.length && localProducts.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {selectedIds.size > 0 ? `已选 ${selectedIds.size} 项` : '全选'}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-100 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              总计: {localProducts.length} 件
            </span>
          </div>
        </div>

        <div className="text-[10px] text-gray-300 font-mono italic">
          SYNC STATUS: STABLE
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4 pb-20">
        <AnimatePresence>
          {localProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-2xl border transition-all relative overflow-hidden ${expandedId === product.id
                ? 'border-gray-900 shadow-xl z-10'
                : selectedIds.has(product.id)
                  ? 'border-amber-200 bg-amber-50/20 shadow-sm'
                  : 'border-gray-100 shadow-sm'
                }`}
            >
              {/* Summary Header */}
              <div
                className="px-6 py-4 flex items-center justify-between cursor-pointer group select-none"
                onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="p-1 -ml-1 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(product.id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => { }} // Handle via parent div click
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 cursor-pointer"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-50">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {product.name.zh || '未命名商品'}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase font-mono">ID: {product.id}</span>
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {categories.find(c => c.id === product.category)?.name.zh || '未分类'}
                      </span>
                      <span className="text-xs font-bold text-gray-900">¥{product.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProduct(product.id);
                    }}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedId === product.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </div>

              {/* Detailed Content */}
              <AnimatePresence>
                {expandedId === product.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 pt-2 border-t border-gray-50 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Media & Visuals */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                                <Star className="w-3 h-3" /> 用户评分
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={product.rating}
                                onChange={(e) => updateProduct(product.id, 'rating', parseFloat(e.target.value))}
                                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> 累计销量
                              </label>
                              <input
                                type="number"
                                value={product.sales}
                                onChange={(e) => updateProduct(product.id, 'sales', parseInt(e.target.value))}
                                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900"
                              />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <BilingualInput
                              label="产品名称"
                              value={product.name}
                              onChange={(val) => updateProduct(product.id, 'name', val)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">零售价格 (¥)</label>
                                <input
                                  type="number"
                                  value={product.price}
                                  onChange={(e) => updateProduct(product.id, 'price', parseInt(e.target.value))}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 text-gray-300">划线原价 (可选)</label>
                                <input
                                  type="number"
                                  value={product.originalPrice || ''}
                                  onChange={(e) => updateProduct(product.id, 'originalPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                                  <Layers className="w-3 h-3" /> 所属分类
                                </label>
                                <select
                                  value={product.category}
                                  onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 text-sm"
                                >
                                  {categories.map(c => <option key={c.id} value={c.id}>{c.name[language]}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" /> 上架日期
                                </label>
                                <input
                                  type="date"
                                  value={product.releaseDate}
                                  onChange={(e) => updateProduct(product.id, 'releaseDate', e.target.value)}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 text-sm"
                                />
                              </div>
                            </div>

                            <BilingualInput
                              label="展示标签 (如: Hot, New)"
                              value={product.tag || { zh: '', en: '' }}
                              onChange={(val) => updateProduct(product.id, 'tag', val)}
                            />


                          </div>


                        </div>
                        {/* Right: Crucial Parameters & Gallery */}

                        {/* Gallery Section */}
                        <div className="pt-4 border-t border-gray-100">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1 text-gray-400">
                            <Tag className="w-3 h-3" /> 详情页图集
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {(product.images || []).map((img, imgIdx) => (
                              <div key={imgIdx} className="relative aspect-square rounded-lg overflow-hidden group/img bg-gray-50 border border-gray-100">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button
                                  onClick={() => {
                                    const nextImages = [...(product.images || [])];
                                    nextImages.splice(imgIdx, 1);
                                    updateProduct(product.id, 'images', nextImages);
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const nextImages = [...(product.images || []), ''];
                                updateProduct(product.id, 'images', nextImages);
                              }}
                              className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all bg-gray-50/50"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-[10px] font-bold">加图</span>
                            </button>
                          </div>
                          <p className="mt-2 text-[10px] text-gray-400">点击"加图"后，在下方上传图片。</p>

                          {/* Detailed URL list for easy editing */}
                          <div className="mt-4 space-y-2">
                            {(product.images || []).map((img, imgIdx) => (
                              <ImageInput
                                key={imgIdx}
                                label={`图片 ${imgIdx + 1}`}
                                value={img}
                                onChange={(val) => {
                                  const nextImages = [...(product.images || [])];
                                  nextImages[imgIdx] = val;
                                  updateProduct(product.id, 'images', nextImages);
                                }}
                                preview={false}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Float Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all font-bold shadow-2xl hover:scale-105 active:scale-95"
        >
          <Save className="w-5 h-5" />
          保存所有改动
        </button>
      </div>
    </div>
  );
}
