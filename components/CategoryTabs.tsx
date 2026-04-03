'use client';

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
    <div className="sticky top-0 z-10 -mx-4 glass border-x-0 border-t-0 px-4 py-3 shadow-sm">
      <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = active === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={[
                'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'btn-brand text-white shadow-btn pill-active scale-105'
                  : 'bg-white text-slate-600 shadow-card hover:shadow-card-hover hover:text-brand hover:scale-105'
              ].join(' ')}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
