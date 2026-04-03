'use client';

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
    /* Backdrop */
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Sheet */}
      <div className="w-full max-w-md animate-scale-in rounded-t-3xl bg-white shadow-modal">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">{categoryTitle}</p>
            <h3 className="mt-0.5 text-xl font-black leading-tight text-slate-900">{item.name}</h3>
            {item.description ? (
              <p className="mt-1 text-sm text-slate-500 leading-snug">{item.description}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 space-y-5">
          {item.optionGroups.map((group, gi) => (
            <div key={group.id} className={`animate-slide-up stagger-${Math.min(gi + 1, 8)}`}>
              <div className="mb-2 flex items-center gap-2">
                <p className="text-sm font-bold text-slate-800">{group.label}</p>
                {group.required && (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                    Requis
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                {group.options.map((option) => {
                  const isSelected = selected[group.id]?.label === option.label;
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [group.id]: { label: option.label, price: option.price }
                        }))
                      }
                      className={[
                        'flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-150',
                        isSelected
                          ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50'
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={[
                            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                            isSelected
                              ? 'border-brand-500 bg-brand-500'
                              : 'border-slate-300'
                          ].join(' ')}
                        >
                          {isSelected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {option.label}
                      </span>
                      {option.price > 0 && (
                        <span className="font-semibold text-slate-500">+{formatCurrency(option.price)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Notes */}
          <div className="animate-slide-up">
            <label className="mb-2 block text-sm font-bold text-slate-800">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Sans oignons, sauce supplémentaire…"
              className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
              rows={2}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-5 py-4 space-y-3">
          {/* Quantity + price row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
                aria-label="Moins"
              >
                −
              </button>
              <span className="min-w-[1.5rem] text-center text-lg font-bold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
                aria-label="Plus"
              >
                +
              </button>
            </div>
            <p className="text-xl font-black text-slate-900">
              {unitPrice > 0 ? formatCurrency(unitPrice * quantity) : '–'}
            </p>
          </div>

          {/* CTA */}
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
            className="btn-brand w-full rounded-2xl px-4 py-3.5 text-base font-bold text-white shadow-btn transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
          >
            Ajouter au panier
            {unitPrice > 0 && quantity > 0 && (
              <span className="ml-2 opacity-80">· {formatCurrency(unitPrice * quantity)}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
