import MotionHeader from "../custom/motionHeader";
import type { PartnerProps } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: PartnerProps;
}

export function PartnerLogos({ t, props }: Props) {
  const { title, subtitle, items, } = props;

  // 如果没有数据，直接返回null
  if (items.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50">
      <MotionHeader t={t} title={title} subtitle={subtitle} />
      <div className="flex justify-center items-center gap-8 px-8 flex-wrap">
        {items.map((partner, i) => (
          <div
            key={i}
            className="w-32 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 cursor-pointer"
          >
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="max-w-[80%] max-h-[80%] object-contain" />
            ) : (
              <div
                className="text-xl font-bold"
                style={{ color: partner.color }}
              >
                {partner.name}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">
        {t({ zh: '以及更多优质合作伙伴...', en: 'And many more quality partners...' })}
      </p>
    </div>
  );
}
