
import type { CategoriesProps, Category } from '@/types';

interface Props {
  t: (obj: { zh: string; en: string }) => string; // 翻译函数
  props: CategoriesProps;
  categories: Category[];
}

export function Categories({ t, props, categories }: Props) {
  const { showAll, maxItems } = props;
  // 如果显示所有，就遍历categories，否则就遍历前maxItems个
  const displayCategories = showAll ? categories : categories.slice(0, maxItems);

  // 如果没有数据，直接返回null
  if (displayCategories.length === 0) return null;

  return (
    <div className="py-8 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-4 gap-4 px-4">
        {displayCategories.map((cat) => {
          return (
            <div key={cat.id} className="text-center group cursor-pointer">
              <div className="
              w-16 h-16 mx-auto bg-white rounded-full 
              flex items-center justify-center shadow-sm mb-2 
              group-hover:shadow-md group-hover:scale-105 transition-all
              ">
                <img src={cat.image} alt={t(cat.name)} className="
                rounded-full
                text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {t(cat.name)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
