import { MenuCategory } from '@/lib/types';

export function CategoryTabs({
  categories,
  active,
  onSelect
}: {
  categories: MenuCategory[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 z-10 -mx-4 overflow-x-auto bg-slate-50 px-4 py-3">
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              active === category.id ? 'bg-brand text-white' : 'bg-white text-slate-700 shadow-sm'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
}
