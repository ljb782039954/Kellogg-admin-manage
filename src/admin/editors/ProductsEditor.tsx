import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Star, TrendingUp, Calendar, Tag, Layers, ChevronDown, ChevronUp, Loader2, ClipboardList, Palette, } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useLanguage } from '@/context/LanguageContext';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';
import { getPreviewUrl } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { Product } from '@/types';

export default function ProductsEditor() {
  const {
    allProducts,
    categories,
    createProduct,
    updateProduct: apiUpdateProduct,
    deleteProduct: apiDeleteProduct,
    isLoading: contextLoading,
  } = useContent();
  const { language } = useLanguage();

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从 context 同步数据到本地状态
  useEffect(() => {
    setLocalProducts(
      allProducts.map(p => {
        const images = p.images && p.images.length > 0 ? p.images : [p.image];
        return {
          ...p,
          images,
          image: images[0] || ''
        };
      })
    );
  }, [allProducts]);



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

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return;

    const count = selectedIds.size;
    const confirmMsg = language === 'zh'
      ? `确定要删除这 ${count} 个产品吗？此操作不可撤销。`
      : `Are you sure you want to delete these ${count} products? This action cannot be undone.`;

    if (window.confirm(confirmMsg)) {
      setIsSaving(true);
      setError(null);
      try {
        // 批量删除
        for (const id of selectedIds) {
          await apiDeleteProduct(id);
        }
        setSelectedIds(new Set());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : '删除失败');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // 找出需要更新的产品（对比本地和远程）
      for (const localProduct of localProducts) {
        const remoteProduct = allProducts.find(p => p.id === localProduct.id);

        if (!remoteProduct) {
          // 新产品 - 创建
          await createProduct({
            name_zh: localProduct.name.zh,
            name_en: localProduct.name.en,
            price: localProduct.price,
            original_price: localProduct.originalPrice,
            category_id: localProduct.category,
            rating: localProduct.rating,
            sales: localProduct.sales,
            tag_zh: localProduct.tag?.zh,
            tag_en: localProduct.tag?.en,
            description_zh: localProduct.description?.zh,
            description_en: localProduct.description?.en,
            release_date: localProduct.releaseDate,
            is_featured: localProduct.isFeatured,
            image: localProduct.image,
            images: localProduct.images,
            fabric_zh: localProduct.fabric?.zh,
            fabric_en: localProduct.fabric?.en,
            notes_zh: localProduct.notes?.zh,
            notes_en: localProduct.notes?.en,
            is_active: localProduct.isActive,
            sizes: localProduct.sizes,
            colors: localProduct.colors?.map(c => ({
              name_zh: c.name.zh,
              name_en: c.name.en,
              image: c.image
            })),
            custom_fields: localProduct.customFields?.map(cf => ({
              name_zh: cf.name.zh,
              name_en: cf.name.en,
              value_zh: cf.value.zh,
              value_en: cf.value.en
            })),
          });
        } else {
          // 检查是否有变化
          const hasChanges =
            JSON.stringify(localProduct.name) !== JSON.stringify(remoteProduct.name) ||
            localProduct.price !== remoteProduct.price ||
            localProduct.originalPrice !== remoteProduct.originalPrice ||
            localProduct.category !== remoteProduct.category ||
            localProduct.rating !== remoteProduct.rating ||
            localProduct.sales !== remoteProduct.sales ||
            JSON.stringify(localProduct.tag) !== JSON.stringify(remoteProduct.tag) ||
            localProduct.releaseDate !== remoteProduct.releaseDate ||
            localProduct.isFeatured !== remoteProduct.isFeatured ||
            localProduct.image !== remoteProduct.image ||
            JSON.stringify(localProduct.images) !== JSON.stringify(remoteProduct.images) ||
            JSON.stringify(localProduct.fabric) !== JSON.stringify(remoteProduct.fabric) ||
            JSON.stringify(localProduct.notes) !== JSON.stringify(remoteProduct.notes) ||
            localProduct.isActive !== remoteProduct.isActive ||
            JSON.stringify(localProduct.sizes) !== JSON.stringify(remoteProduct.sizes) ||
            JSON.stringify(localProduct.colors) !== JSON.stringify(remoteProduct.colors) ||
            JSON.stringify(localProduct.customFields) !== JSON.stringify(remoteProduct.customFields);

          if (hasChanges) {
            await apiUpdateProduct(localProduct.id, {
              name_zh: localProduct.name.zh,
              name_en: localProduct.name.en,
              price: localProduct.price,
              original_price: localProduct.originalPrice,
              category_id: localProduct.category,
              rating: localProduct.rating,
              sales: localProduct.sales,
              tag_zh: localProduct.tag?.zh,
              tag_en: localProduct.tag?.en,
              description_zh: localProduct.description?.zh,
              description_en: localProduct.description?.en,
              release_date: localProduct.releaseDate,
              is_featured: localProduct.isFeatured,
              image: localProduct.image,
              images: localProduct.images,
              fabric_zh: localProduct.fabric?.zh,
              fabric_en: localProduct.fabric?.en,
              notes_zh: localProduct.notes?.zh,
              notes_en: localProduct.notes?.en,
              is_active: localProduct.isActive,
              sizes: localProduct.sizes,
              colors: localProduct.colors?.map(c => ({
                name_zh: c.name.zh,
                name_en: c.name.en,
                image: c.image
              })),
              custom_fields: localProduct.customFields?.map(cf => ({
                name_zh: cf.name.zh,
                name_en: cf.name.en,
                value_zh: cf.value.zh,
                value_en: cf.value.en
              })),
            });
          }
        }
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setIsSaving(false);
    }
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
      tag: { zh: '', en: '' },
      isFeatured: false,
      isActive: true,
      customFields: [],
    };
    setLocalProducts([newProduct, ...localProducts]);
    setExpandedId(newId);
  };

  const updateLocalProduct = <K extends keyof Product>(id: number, field: K, value: Product[K]) => {
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

  const removeProduct = async (id: number) => {
    if (confirm(language === 'zh' ? '确定要删除这个产品吗？' : 'Are you sure you want to delete this product?')) {
      // 检查是否是已存在于服务器的产品
      const existsOnServer = allProducts.some(p => p.id === id);

      if (existsOnServer) {
        setIsSaving(true);
        try {
          await apiDeleteProduct(id);
        } catch (err) {
          setError(err instanceof Error ? err.message : '删除失败');
          setIsSaving(false);
          return;
        }
        setIsSaving(false);
      }

      setLocalProducts(localProducts.filter((p) => p.id !== id));
      const nextSelected = new Set(selectedIds);
      nextSelected.delete(id);
      setSelectedIds(nextSelected);
    }
  };

  // 只有在初次真正没有任何数据时才展示全屏 Loading，避免用户点击保存 (refreshData) 导致表单全体失焦和抖动闪烁
  if (contextLoading && allProducts.length === 0 && localProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-500">加载中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            产品主仓库
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-full font-mono">
              v2.0
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">管理全站产品参数。支持批量管理及图集展示。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBatchDelete}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-bold text-sm border border-red-100 animate-in fade-in slide-in-from-right-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              批量删除 ({selectedIds.size})
            </button>
          )}
          <button
            onClick={addProduct}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" />
            添加产品
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg text-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            保存全部改动
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2 text-sm"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">×</button>
        </motion.div>
      )}

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
          <div className="h-4 w-px bg-gray-100 hidden md:block" />
          <div className="hidden md:flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              精选: {localProducts.filter((p) => p.isFeatured).length} 件
            </span>
          </div>
        </div>

        <div className="text-[10px] text-gray-300 font-mono italic">
          {isSaving ? 'SYNCING...' : 'SYNC STATUS: STABLE'}
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
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-50 flex items-center justify-center">
                    {product.image ? (
                      <img src={getPreviewUrl(product.image)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-gray-400">无图</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {product.name.zh || '未命名产品'}
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
                  <div className="flex items-center gap-6">
                    <div
                      className="flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Label htmlFor={`active-hdr-${product.id}`} className="text-[10px] text-gray-400 mb-1 cursor-pointer font-bold uppercase tracking-wide group-hover:text-green-600 transition-colors">
                        上架状态
                      </Label>
                      <Switch
                        id={`active-hdr-${product.id}`}
                        checked={product.isActive}
                        onCheckedChange={(checked) => updateLocalProduct(product.id, 'isActive', checked)}
                        className="scale-90"
                      />
                    </div>
                    <div
                      className="flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Label htmlFor={`featured-hdr-${product.id}`} className="text-[10px] text-gray-400 mb-1 cursor-pointer font-bold uppercase tracking-wide group-hover:text-amber-600 transition-colors">
                        设为精选
                      </Label>
                      <Switch
                        id={`featured-hdr-${product.id}`}
                        checked={product.isFeatured}
                        onCheckedChange={(checked) => updateLocalProduct(product.id, 'isFeatured', checked)}
                        className="scale-90"
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProduct(product.id);
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
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
                          <ImageInput
                            label="产品主图"
                            value={product.image || ''}
                            onChange={(val) => updateLocalProduct(product.id, 'image', val)}
                            aspectRatio="square"
                          />
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
                                onChange={(e) => updateLocalProduct(product.id, 'rating', parseFloat(e.target.value))}
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
                                onChange={(e) => updateLocalProduct(product.id, 'sales', parseInt(e.target.value))}
                                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900"
                              />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <BilingualInput
                              label="产品名称"
                              value={product.name}
                              onChange={(val) => updateLocalProduct(product.id, 'name', val)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">零售价格 (¥)</label>
                                <input
                                  type="number"
                                  value={product.price}
                                  onChange={(e) => updateLocalProduct(product.id, 'price', parseInt(e.target.value))}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 text-gray-300">划线原价 (可选)</label>
                                <input
                                  type="number"
                                  value={product.originalPrice || ''}
                                  onChange={(e) => updateLocalProduct(product.id, 'originalPrice', e.target.value ? parseInt(e.target.value) : undefined)}
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
                                  onChange={(e) => updateLocalProduct(product.id, 'category', e.target.value)}
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
                                  onChange={(e) => updateLocalProduct(product.id, 'releaseDate', e.target.value)}
                                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 text-sm"
                                />
                              </div>
                            </div>

                            <BilingualInput
                              label="展示标签 (如: Hot, New)"
                              value={product.tag || { zh: '', en: '' }}
                              onChange={(val) => updateLocalProduct(product.id, 'tag', val)}
                            />

                            <div className="pt-4 border-t border-gray-100 space-y-4">
                              <BilingualInput
                                label="面料说明"
                                value={product.fabric || { zh: '', en: '' }}
                                onChange={(val) => updateLocalProduct(product.id, 'fabric', val)}
                              />
                              <BilingualInput
                                label="注意事项"
                                value={product.notes || { zh: '', en: '' }}
                                onChange={(val) => updateLocalProduct(product.id, 'notes', val)}
                              />
                            </div>
                          </div>


                        </div>
                        {/* Right: Crucial Parameters & Gallery */}

                        {/* Gallery Section */}
                        <div className="pt-4 border-t border-gray-100">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1 text-gray-400">
                            <Tag className="w-3 h-3" /> 详情页图集
                          </label>
                          <div className="flex flex-wrap gap-4">
                            {(product.images || []).map((img, imgIdx) => (
                              <div key={imgIdx} className="relative aspect-square rounded-lg group/img">
                                <ImageInput
                                  value={img}
                                  onChange={(val) => {
                                    const nextImages = [...(product.images || [])];
                                    nextImages[imgIdx] = val;
                                    updateLocalProduct(product.id, 'images', nextImages);
                                  }}
                                  aspectRatio="square"
                                />
                                <button
                                  onClick={() => {
                                    const nextImages = [...(product.images || [])];
                                    nextImages.splice(imgIdx, 1);
                                    updateLocalProduct(product.id, 'images', nextImages);
                                  }}
                                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-10 shadow-sm"
                                  title="移除此图"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const nextImages = [...(product.images || []), ''];
                                updateLocalProduct(product.id, 'images', nextImages);
                              }}
                              className="px-4 py-3 aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all bg-gray-50/50"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-[10px] font-bold">增加图片</span>
                            </button>
                          </div>
                          <p className="mt-2 text-[10px] text-gray-400">点击"增加图片"后，在下方上传图片。</p>

                          {/* Sizes Management */}
                          <div className="mt-8 pt-6 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1">
                              <ClipboardList className="w-3 h-3" /> 尺码管理
                            </label>
                            <div className="space-y-3 flex flex-wrap gap-3">
                              {(product.sizes || []).map((size, sIdx) => (
                                <div key={sIdx} className="flex items-center gap-3 bg-black/5 p-2 rounded-xl relative group/size">
                                  <div className="w-24 items-center space-y-3">
                                    <input
                                      placeholder="尺码名称 (如 S, M, L)"
                                      value={size.name}
                                      onChange={(e) => {
                                        const nextSizes = [...(product.sizes || [])];
                                        nextSizes[sIdx] = { ...size, name: e.target.value };
                                        updateLocalProduct(product.id, 'sizes', nextSizes);
                                      }}
                                      className="max-w-24 text-sm font-medium border-black/20 border-1"
                                    />
                                    <div className="w-24 h-24 flex-shrink-0">
                                      <ImageInput
                                        value={size.image || ''}
                                        onChange={(val) => {
                                          const nextSizes = [...(product.sizes || [])];
                                          nextSizes[sIdx] = { ...size, image: val };
                                          updateLocalProduct(product.id, 'sizes', nextSizes);
                                        }}
                                        aspectRatio="square"
                                        className="!space-y-0"
                                      />
                                    </div>

                                  </div>
                                  <button
                                    onClick={() => {
                                      const nextSizes = [...(product.sizes || [])];
                                      nextSizes.splice(sIdx, 1);
                                      updateLocalProduct(product.id, 'sizes', nextSizes);
                                    }}
                                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/size:opacity-100 transition-opacity z-10 shadow-sm"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const nextSizes = [...(product.sizes || []), { name: '', image: '' }];
                                  updateLocalProduct(product.id, 'sizes', nextSizes);
                                }}
                                className="px-4 py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> 添加新尺码
                              </button>
                            </div>
                          </div>

                          {/* Colors Management */}
                          <div className="mt-8 pt-6 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1">
                              <Palette className="w-3 h-3" /> 颜色管理
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {(product.colors || []).map((color, cIdx) => (
                                <div key={cIdx} className="bg-gray-50 p-3 rounded-xl space-y-3 relative group/color">
                                  <div className="flex gap-3">
                                    <div className="space-y-3">
                                      <div className="w-24 h-24 flex-shrink-0">
                                        <ImageInput
                                          value={color.image || ''}
                                          onChange={(val) => {
                                            const nextColors = [...(product.colors || [])];
                                            nextColors[cIdx] = { ...color, image: val };
                                            updateLocalProduct(product.id, 'colors', nextColors);
                                          }}
                                          aspectRatio="square"
                                          className="!space-y-0"
                                        />
                                      </div>
                                      <div className="flex-1 space-y-2 max-w-24">
                                        <div className="grid grid-cols-1 gap-2">
                                          <input
                                            placeholder="中文名"
                                            value={color.name.zh}
                                            onChange={(e) => {
                                              const nextColors = [...(product.colors || [])];
                                              nextColors[cIdx] = { ...color, name: { ...color.name, zh: e.target.value } };
                                              updateLocalProduct(product.id, 'colors', nextColors);
                                            }}
                                            className="w-full bg-white px-3 py-1.5 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                          />
                                          <input
                                            placeholder="英文名"
                                            value={color.name.en}
                                            onChange={(e) => {
                                              const nextColors = [...(product.colors || [])];
                                              nextColors[cIdx] = { ...color, name: { ...color.name, en: e.target.value } };
                                              updateLocalProduct(product.id, 'colors', nextColors);
                                            }}
                                            className="w-full bg-white px-3 py-1.5 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        const nextColors = [...(product.colors || [])];
                                        nextColors.splice(cIdx, 1);
                                        updateLocalProduct(product.id, 'colors', nextColors);
                                      }}
                                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/color:opacity-100 transition-opacity z-10 shadow-sm"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const nextColors = [...(product.colors || []), { name: { zh: '', en: '' }, image: '' }];
                                  updateLocalProduct(product.id, 'colors', nextColors);
                                }}
                                className="px-4 py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> 添加新颜色
                              </button>
                            </div>
                          </div>

                          {/* Custom Fields Management */}
                          <div className="mt-8 pt-6 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1">
                              <ClipboardList className="w-3 h-3" /> 自定义参数管理
                            </label>
                            <div className="space-y-4">
                              {(product.customFields || []).map((field, fIdx) => (
                                <div key={fIdx} className="bg-gray-50 p-4 rounded-xl relative group/cf">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <p className="text-[10px] font-bold text-gray-400 uppercase">参数名称 (键)</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          placeholder="中文键 (如: 发货地)"
                                          value={field.name.zh}
                                          onChange={(e) => {
                                            const nextFields = [...(product.customFields || [])];
                                            nextFields[fIdx] = { ...field, name: { ...field.name, zh: e.target.value } };
                                            updateLocalProduct(product.id, 'customFields', nextFields);
                                          }}
                                          className="w-full bg-white px-3 py-2 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                        />
                                        <input
                                          placeholder="英文键 (如: Origin)"
                                          value={field.name.en}
                                          onChange={(e) => {
                                            const nextFields = [...(product.customFields || [])];
                                            nextFields[fIdx] = { ...field, name: { ...field.name, en: e.target.value } };
                                            updateLocalProduct(product.id, 'customFields', nextFields);
                                          }}
                                          className="w-full bg-white px-3 py-2 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-[10px] font-bold text-gray-400 uppercase">参数值</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          placeholder="中文值 (如: 中国)"
                                          value={field.value.zh}
                                          onChange={(e) => {
                                            const nextFields = [...(product.customFields || [])];
                                            nextFields[fIdx] = { ...field, value: { ...field.value, zh: e.target.value } };
                                            updateLocalProduct(product.id, 'customFields', nextFields);
                                          }}
                                          className="w-full bg-white px-3 py-2 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                        />
                                        <input
                                          placeholder="英文值 (如: China)"
                                          value={field.value.en}
                                          onChange={(e) => {
                                            const nextFields = [...(product.customFields || [])];
                                            nextFields[fIdx] = { ...field, value: { ...field.value, en: e.target.value } };
                                            updateLocalProduct(product.id, 'customFields', nextFields);
                                          }}
                                          className="w-full bg-white px-3 py-2 rounded-lg border-none text-xs focus:ring-1 focus:ring-gray-900"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const nextFields = [...(product.customFields || [])];
                                      nextFields.splice(fIdx, 1);
                                      updateLocalProduct(product.id, 'customFields', nextFields);
                                    }}
                                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/cf:opacity-100 transition-opacity z-10 shadow-sm"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const nextFields = [...(product.customFields || []), { name: { zh: '', en: '' }, value: { zh: '', en: '' } }];
                                  updateLocalProduct(product.id, 'customFields', nextFields);
                                }}
                                className="px-4 py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> 添加新参数
                              </button>
                            </div>
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
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all font-bold shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          保存所有改动
        </button>
      </div>
    </div>
  );
}
