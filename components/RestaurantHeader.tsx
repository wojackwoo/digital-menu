import { RestaurantInfo } from '@/lib/types';

export function RestaurantHeader({ info }: { info: RestaurantInfo }) {
  return (
    <header className="rounded-2xl bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-bold text-brand">{info.name}</h1>
      <p className="mt-1 text-sm text-slate-600">{info.location}</p>
      <p className="mt-1 text-sm text-slate-600">📞 {info.phone}</p>
      <p className="text-sm text-slate-600">✉️ {info.email}</p>
      <div className="mt-4 rounded-xl bg-amber-50 p-3">
        {info.promotions.map((promo) => (
          <div key={promo.title}>
            <p className="font-semibold text-amber-800">{promo.title}</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-amber-700">
              {promo.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </header>
  );
}
