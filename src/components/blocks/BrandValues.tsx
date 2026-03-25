import * as LucideIcons from 'lucide-react';
import MotionHeader from '../custom/motionHeader';
import type { BrandValuesProps, } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: BrandValuesProps;
}

export function BrandValues({ t, props }: Props) {
  const { title, subtitle, items } = props;

  if (items.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50 rounded-lg">
      <MotionHeader t={t} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-4 gap-6 px-4">
        {items.map((item, i) => {
          const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Star;
          return (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">{t(item.title)}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{t(item.description)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
