'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { CategoryTabs } from '@/components/CategoryTabs';
import { ItemCard } from '@/components/ItemCard';
import { ItemModal } from '@/components/ItemModal';
import { RestaurantHeader } from '@/components/RestaurantHeader';
import { normalizedMenu } from '@/lib/menu';
import { CartItem, MenuItem } from '@/lib/types';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table') ?? '';

  const [activeCategory, setActiveCategory] = useState(normalizedMenu.categories[0]?.id ?? '');
  const [selectedItem, setSelectedItem] = useState<{ item: MenuItem; categoryTitle: string } | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const activeItems = useMemo(
    () => normalizedMenu.categories.find((cat) => cat.id === activeCategory)?.items ?? [],
    [activeCategory]
  );

  return (
    <main className="mx-auto max-w-xl space-y-4 px-4 pb-72 pt-4">
      <RestaurantHeader info={normalizedMenu.restaurant} />

      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
        Table: <span className="font-semibold">{table || 'Not provided'}</span> (use <code>/menu?table=12</code>)
      </div>

      <CategoryTabs categories={normalizedMenu.categories} active={activeCategory} onSelect={setActiveCategory} />

      <section className="space-y-3">
        {activeItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAdd={(clickedItem) => {
              const category = normalizedMenu.categories.find((cat) => cat.id === clickedItem.categoryId);
              setSelectedItem({ item: clickedItem, categoryTitle: category?.title ?? 'Menu' });
            }}
          />
        ))}
      </section>

      {selectedItem ? (
        <ItemModal
          item={selectedItem.item}
          categoryTitle={selectedItem.categoryTitle}
          onClose={() => setSelectedItem(null)}
          onConfirm={(draft) => {
            setCartItems((prev) => [...prev, { ...draft, cartId: crypto.randomUUID() }]);
          }}
        />
      ) : null}

      <CartDrawer
        items={cartItems}
        table={table}
        restaurantName={normalizedMenu.restaurant.name}
        phone={normalizedMenu.restaurant.phone}
        onUpdateQty={(cartId, qty) =>
          setCartItems((prev) => prev.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item)))
        }
        onRemove={(cartId) => setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))}
      />
    </main>
  );
}
