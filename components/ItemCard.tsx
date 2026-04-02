import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/whatsapp';

export function ItemCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-900">{item.name}</h3>
      {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">
          {item.basePrice ? `From ${formatCurrency(item.basePrice)}` : 'Choose options'}
        </p>
        <button
          onClick={() => onAdd(item)}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Add
        </button>
      </div>
    </article>
  );
}
