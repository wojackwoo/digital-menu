import { useMemo, useState } from 'react';
import { CartItem, MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/whatsapp';

type SelectedMap = Record<string, { label: string; price: number }>;

export function ItemModal({
  item,
  onClose,
  onConfirm,
  categoryTitle
}: {
  item: MenuItem;
  categoryTitle: string;
  onClose: () => void;
  onConfirm: (item: Omit<CartItem, 'cartId'>) => void;
}) {
  const [selected, setSelected] = useState<SelectedMap>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const missingRequired = item.optionGroups.some((group) => group.required && !selected[group.id]);

  const unitPrice = useMemo(() => {
    const selectedOptionsTotal = Object.values(selected).reduce((sum, option) => sum + option.price, 0);
    const base = item.basePrice ?? 0;

    const crust = selected['crust']?.label;
    const size = selected['size']?.label;
    const cheesySupplement =
      crust === 'Cheesy Crust' ? (size === 'Individual' ? 10 : size === 'Double' || size === 'Triple' ? 15 : 0) : 0;

    return selectedOptionsTotal || base ? selectedOptionsTotal + cheesySupplement : 0;
  }, [item.basePrice, selected]);

  return (
    <div className="fixed inset-0 z-30 bg-black/50 p-4">
      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">{categoryTitle}</p>
            <h3 className="text-xl font-bold">{item.name}</h3>
            {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
          </div>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-sm text-slate-500">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {item.optionGroups.map((group) => (
            <div key={group.id}>
              <p className="mb-2 text-sm font-semibold">
                {group.label} {group.required ? '*' : ''}
              </p>
              <div className="grid gap-2">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelected((prev) => ({ ...prev, [group.id]: { label: option.label, price: option.price } }))}
                    className={`rounded-lg border px-3 py-2 text-left text-sm ${
                      selected[group.id]?.label === option.label
                        ? 'border-brand bg-red-50 text-brand'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.price > 0 ? <span className="float-right">{formatCurrency(option.price)}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="mb-2 block text-sm font-semibold">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="No onions, extra sauce..."
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none ring-brand focus:ring"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-9 w-9 rounded-full border border-slate-200"
              >
                -
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="h-9 w-9 rounded-full border border-slate-200">
                +
              </button>
            </div>
            <p className="font-semibold">{formatCurrency(unitPrice * quantity)}</p>
          </div>

          <button
            disabled={missingRequired || unitPrice <= 0}
            onClick={() => {
              onConfirm({
                itemId: item.id,
                itemName: item.name,
                categoryTitle,
                quantity,
                unitPrice,
                selectedOptions: Object.entries(selected).map(([groupId, option]) => ({
                  groupLabel: item.optionGroups.find((group) => group.id === groupId)?.label ?? groupId,
                  optionLabel: option.label
                })),
                notes
              });
              onClose();
            }}
            className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
