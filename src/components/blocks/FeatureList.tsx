import * as LucideIcons from 'lucide-react';
import MotionHeader from '../custom/motionHeader';
import { motion } from 'framer-motion';
import type { FeatureListProps } from '@/types';

interface Props extends FeatureListProps {
  t: (obj: { zh: string; en: string }) => string;
  props: FeatureListProps;
}

export function FeatureList({ t, props }: Props) {
  const { title, subtitle, items } = props;

  // 如果没有数据，直接返回null
  if (items.length === 0) return null;

  return (
    <div className="py-12">
      <MotionHeader t={t} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-3 gap-6 px-4">
        {items.map((item, index) => {
          const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Star;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-primary/5 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{t(item.title)}</h4>
              <p className="text-sm text-gray-500">{t(item.description)}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
