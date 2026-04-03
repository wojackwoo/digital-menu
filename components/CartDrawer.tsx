'use client';

import { CartItem } from '@/lib/types';
import { buildWhatsAppMessage, formatCurrency, toWhatsAppUrl } from '@/lib/whatsapp';

export function CartDrawer({
  items,
  table,
  restaurantName,
  phone,
  onUpdateQty,
  onRemove
}: {
  items: CartItem[];
  table: string;
  restaurantName: string;
  phone: string;
  onUpdateQty: (cartId: string, qty: number) => void;
  onRemove: (cartId: string) => void;
}) {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const message = buildWhatsAppMessage({ restaurantName, table, items, total });
  const whatsappUrl = toWhatsAppUrl(phone, message);
  const hasItems = items.length > 0;

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-xl animate-drawer-up">
      {/* Floating cart summary pill (collapsed state header) */}
      <div className="glass rounded-t-3xl border-t border-white/60 shadow-modal">
        {/* Handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-8 rounded-full bg-slate-200" />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white">
              {items.reduce((sum, i) => sum + i.quantity, 0) || '0'}
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {hasItems ? 'Votre commande' : 'Panier vide'}
            </h2>
          </div>
          {hasItems && (
            <p className="text-base font-black text-slate-900">{formatCurrency(total)}</p>
          )}
        </div>

        {/* Items list */}
        <div className="max-h-52 overflow-y-auto px-5 space-y-2 pb-2">
          {!hasItems ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <span className="text-3xl">🍕</span>
              <p className="text-sm text-slate-400 font-medium">Ajoutez quelque chose de délicieux !</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="rounded-2xl border border-slate-100 bg-white p-3 shadow-card animate-slide-up"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 leading-tight">{item.itemName}</p>
                    {item.selectedOptions.length > 0 && (
                      <p className="mt-0.5 text-xs text-slate-400 leading-snug">
                        {item.selectedOptions.map((o) => `${o.groupLabel}: ${o.optionLabel}`).join(' · ')}
                      </p>
                    )}
                    {item.notes ? (
                      <p className="mt-0.5 text-xs italic text-slate-400">📝 {item.notes}</p>
                    ) : null}
                  </div>
                  <button
                    onClick={() => onRemove(item.cartId)}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] text-red-400 transition hover:bg-red-100 hover:text-red-600"
                    aria-label="Supprimer"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.cartId, Math.max(1, item.quantity - 1))}
                      className="qty-btn !h-7 !w-7 text-sm"
                      aria-label="Moins"
                    >
                      −
                    </button>
                    <span className="min-w-[1rem] text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                      className="qty-btn !h-7 !w-7 text-sm"
                      aria-label="Plus"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* WhatsApp CTA */}
        <div className="px-5 pb-6 pt-3">
          <a
            href={hasItems ? whatsappUrl : '#'}
            target="_blank"
            rel="noreferrer"
            className={[
              'flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-base font-black text-white transition-all duration-150',
              hasItems
                ? 'btn-whatsapp shadow-btn-wa hover:scale-[1.02] active:scale-[0.98]'
                : 'pointer-events-none bg-slate-200 text-slate-400'
            ].join(' ')}
          >
            <span className="text-xl">💬</span>
            Commander via WhatsApp
            {hasItems && (
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-sm">
                {formatCurrency(total)}
              </span>
            )}
          </a>
        </div>
      </div>
    </aside>
  );
}
