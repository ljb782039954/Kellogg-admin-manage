import { motion } from 'framer-motion';
import type { ImageTextProps } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: ImageTextProps;
}

export function ImageText({
  t,
  props,
}: Props) {
  const { title, content, image,
    imagePosition = 'left', buttonText, buttonLink } = props;

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-8 px-4 ${imagePosition === 'right' ? 'flex-row-reverse' : ''}`}>
        {/* 图片 */}
        <div className="flex-1">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 文本 */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl md:text-4xl font-bold">
            {t(title)}
          </h3>
          <p className="text-gray-600 text-md md:text-lg leading-relaxed">
            {t(content)}
          </p>
          {buttonText && buttonLink && (
            <a href={buttonLink}>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                {t(buttonText)}
              </button>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
