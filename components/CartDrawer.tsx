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

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-xl rounded-t-2xl border-t border-slate-200 bg-white p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Cart ({items.length})</h2>
        <p className="font-semibold">{formatCurrency(total)}</p>
      </div>
      <div className="max-h-56 space-y-3 overflow-auto pr-1">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No items yet. Add something tasty 😄</p>
        ) : (
          items.map((item) => (
            <div key={item.cartId} className="rounded-xl border border-slate-100 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{item.itemName}</p>
                  <p className="text-xs text-slate-500">{item.selectedOptions.map((o) => `${o.groupLabel}: ${o.optionLabel}`).join(' • ')}</p>
                  {item.notes ? <p className="text-xs text-slate-500">Note: {item.notes}</p> : null}
                </div>
                <button onClick={() => onRemove(item.cartId)} className="text-xs text-red-600">
                  Remove
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => onUpdateQty(item.cartId, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}>+</button>
                </div>
                <p className="text-sm font-medium">{formatCurrency(item.unitPrice * item.quantity)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <a
        href={items.length ? whatsappUrl : '#'}
        target="_blank"
        rel="noreferrer"
        className={`mt-4 block w-full rounded-xl px-4 py-3 text-center font-semibold text-white ${
          items.length ? 'bg-green-600' : 'pointer-events-none bg-slate-300'
        }`}
      >
        Send order via WhatsApp
      </a>
    </aside>
  );
}
