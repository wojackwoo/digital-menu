'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { CategoryTabs } from '@/components/CategoryTabs';
import { ItemCard } from '@/components/ItemCard';
import { ItemModal } from '@/components/ItemModal';
import { RestaurantHeader } from '@/components/RestaurantHeader';
import { normalizedMenu } from '@/lib/menu';
import { CartItem, MenuItem } from '@/lib/types';

function MenuContent() {
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
    <main className="mx-auto max-w-xl space-y-4 px-4 pb-80 pt-4">
      <RestaurantHeader info={normalizedMenu.restaurant} />

      {/* Table indicator */}
      <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card text-sm">
        <span className="text-lg">🪑</span>
        <span className="text-slate-500">Table :</span>
        <span className="font-bold text-slate-900">{table || 'Non renseignée'}</span>
        <span className="ml-auto text-xs text-slate-400">
          (utilisez <code className="rounded bg-slate-100 px-1">/menu?table=12</code>)
        </span>
      </div>

      <CategoryTabs categories={normalizedMenu.categories} active={activeCategory} onSelect={setActiveCategory} />

      <section className="space-y-3">
        {activeItems.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-12 text-center shadow-card">
            <span className="text-5xl">🍽️</span>
            <p className="font-semibold text-slate-500">Aucun article dans cette catégorie</p>
          </div>
        ) : (
          activeItems.map((item, i) => (
            <div key={item.id} className={`stagger-${Math.min(i + 1, 8)}`}>
              <ItemCard
                item={item}
                onAdd={(clickedItem) => {
                  const category = normalizedMenu.categories.find((cat) => cat.id === clickedItem.categoryId);
                  setSelectedItem({ item: clickedItem, categoryTitle: category?.title ?? 'Menu' });
                }}
              />
            </div>
          ))
        )}
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

export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
