import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Eye } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import BilingualInput from '../components/BilingualInput';
import ImageInput from '../components/ImageInput';
import type { CarouselSlide } from '../../types';

export default function CarouselEditor() {
  const { content, updateHome } = useContent();
  const [localSlides, setLocalSlides] = useState(content.home.carousel.slides);
  const [saved, setSaved] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleSave = () => {
    updateHome({
      ...content.home,
      carousel: { slides: localSlides },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSlide = () => {
    setLocalSlides([
      ...localSlides,
      {
        image: '',
        title: { zh: '新幻灯片', en: 'New Slide' },
        subtitle: { zh: '副标题', en: 'Subtitle' },
        cta: { zh: '点击了解', en: 'Learn More' },
      },
    ]);
  };

  const updateSlide = (index: number, field: keyof CarouselSlide, value: unknown) => {
    const newSlides = [...localSlides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setLocalSlides(newSlides);
  };

  const removeSlide = (index: number) => {
    setLocalSlides(localSlides.filter((_, i) => i !== index));
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === localSlides.length - 1) return;

    const newSlides = [...localSlides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    setLocalSlides(newSlides);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">轮播图</h1>
          <p className="text-gray-500 mt-1">编辑首页轮播图片和文案（最多5张）</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          保存更改
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 px-4 py-3 rounded-lg"
        >
          保存成功！
        </motion.div>
      )}

      {/* Slides */}
      <div className="space-y-4">
        {localSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Slide Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-700">幻灯片 {index + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewIndex(previewIndex === index ? null : index)}
                  className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === localSlides.length - 1}
                  className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSlide(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Content */}
            <div className="p-6 space-y-4">
              {/* Preview */}
              {previewIndex === index && (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={slide.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <p className="font-bold text-lg">{slide.title.zh}</p>
                      <p className="text-sm opacity-80">{slide.subtitle.zh}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image */}
              <ImageInput
                label="背景图片"
                value={slide.image}
                onChange={(value) => updateSlide(index, 'image', value)}
              />

              {/* Title */}
              <BilingualInput
                label="标题"
                value={slide.title}
                onChange={(value) => updateSlide(index, 'title', value)}
                placeholder={{ zh: '主标题', en: 'Main Title' }}
              />

              {/* Subtitle */}
              <BilingualInput
                label="副标题"
                value={slide.subtitle}
                onChange={(value) => updateSlide(index, 'subtitle', value)}
                placeholder={{ zh: '副标题描述', en: 'Subtitle Description' }}
              />

              {/* CTA */}
              <BilingualInput
                label="按钮文字"
                value={slide.cta}
                onChange={(value) => updateSlide(index, 'cta', value)}
                placeholder={{ zh: '立即了解', en: 'Learn More' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Button */}
      {localSlides.length < 5 && (
        <button
          onClick={addSlide}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加幻灯片
        </button>
      )}
    </div>
  );
}
