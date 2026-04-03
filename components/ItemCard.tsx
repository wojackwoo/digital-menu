import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/whatsapp';

export function ItemCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-slide-up">
      {/* Left accent bar */}
      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-500 to-brand-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-l-2xl" />

      <div className="flex items-center gap-3 p-4">
        {/* Text content */}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
          {item.description ? (
            <p className="mt-0.5 line-clamp-2 text-sm text-slate-500 leading-snug">{item.description}</p>
          ) : null}
          <p className="mt-2 text-sm font-semibold text-brand-600">
            {item.basePrice ? `À partir de ${formatCurrency(item.basePrice)}` : 'Choisir les options'}
          </p>
        </div>

        {/* Add button */}
        <button
          onClick={() => onAdd(item)}
          aria-label={`Ajouter ${item.name}`}
          className="btn-brand shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-btn transition-all duration-150 hover:scale-105 active:scale-95"
        >
          + Ajouter
        </button>
      </div>
    </article>
  );
}
