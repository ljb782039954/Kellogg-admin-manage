import type { TextSectionProps } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: TextSectionProps;
}

export function TextSection({ t, props }: Props) {
  const { title, content, alignment, backgroundColor } = props;

  // backgroundColor 是16进制的 #ffffff
  const bgColor = backgroundColor ? `bg-[${backgroundColor}]` : 'bg-gray-50';

  return (
    <div className={`py-12 ${bgColor} ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
        {t(title)}
      </h1>
      <p className="text-gray-500 max-w-2xl text-md md:text-lg mx-auto leading-relaxed">
        {t(content)}
      </p>
    </div>
  );
}
