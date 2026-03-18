// 轮播图组件属性编辑器（轻量版）

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import BilingualInput from '@/admin/components/BilingualInput';
import ImageInput from '@/admin/components/ImageInput';
import type { CarouselSlide } from '@/types';

interface CarouselPropsEditorProps {
  props: {
    autoPlay?: boolean;
    interval?: number;
  };
  onUpdate: (props: Record<string, unknown>) => void;
}

export function CarouselPropsEditor({ props, onUpdate }: CarouselPropsEditorProps) {
  const { content, updateCarousel } = useContent();
  const [localSlides, setLocalSlides] = useState(content.home.carousel.slides);

  useEffect(() => {
    setLocalSlides(content.home.carousel.slides);
  }, [content.home.carousel.slides]);

  const saveSlides = (slides: CarouselSlide[]) => {
    setLocalSlides(slides);
    updateCarousel({ slides });
  };

  const addSlide = () => {
    saveSlides([
      ...localSlides,
      {
        image: '',
        title: { zh: '新幻灯片', en: 'New Slide' },
        subtitle: { zh: '副标题', en: 'Subtitle' },
        cta: { zh: '了解更多', en: 'Learn More' },
      },
    ]);
  };

  const updateSlide = <K extends keyof CarouselSlide>(index: number, field: K, value: CarouselSlide[K]) => {
    const newSlides = [...localSlides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    saveSlides(newSlides);
  };

  const removeSlide = (index: number) => {
    saveSlides(localSlides.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* 播放设置 */}
      <div className="space-y-4 pb-4 border-b">
        <h4 className="font-medium text-sm text-gray-700">播放设置</h4>
        <div className="flex items-center justify-between">
          <Label>自动播放</Label>
          <Switch
            checked={props.autoPlay !== false}
            onCheckedChange={(checked) => onUpdate({ ...props, autoPlay: checked })}
          />
        </div>
        <div className="space-y-2">
          <Label>切换间隔（毫秒）</Label>
          <Input
            type="number"
            min={1000}
            step={500}
            value={props.interval || 5000}
            onChange={(e) => onUpdate({ ...props, interval: parseInt(e.target.value) || 5000 })}
          />
        </div>
      </div>

      {/* 幻灯片列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">幻灯片列表</h4>
          <Button variant="outline" size="sm" onClick={addSlide}>
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>

        {localSlides.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm">暂无幻灯片</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localSlides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">幻灯片 {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSlide(index)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 space-y-3">
                  <ImageInput
                    label="背景图片"
                    value={slide.image}
                    onChange={(val) => updateSlide(index, 'image', val)}
                    aspectRatio="video"
                  />
                  <BilingualInput
                    label="标题"
                    value={slide.title}
                    onChange={(val) => updateSlide(index, 'title', val)}
                  />
                  <BilingualInput
                    label="副标题"
                    value={slide.subtitle}
                    onChange={(val) => updateSlide(index, 'subtitle', val)}
                  />
                  <BilingualInput
                    label="按钮文字"
                    value={slide.cta}
                    onChange={(val) => updateSlide(index, 'cta', val)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
