import { RestaurantInfo } from '@/lib/types';

export function RestaurantHeader({ info }: { info: RestaurantInfo }) {
  return (
    <header className="overflow-hidden rounded-3xl shadow-modal animate-slide-down">
      {/* Hero gradient band */}
      <div className="bg-hero-gradient px-5 py-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-rose-200/80">
              Digital Menu
            </p>
            <h1 className="text-3xl font-black leading-tight tracking-tight">{info.name}</h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-100/90">
              <span>📍</span>
              {info.location}
            </p>
          </div>
          {/* Brand icon circle */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
            🍕
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            📞 {info.phone}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            ✉️ {info.email}
          </span>
        </div>
      </div>

      {/* Promotions card */}
      {info.promotions.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-5 py-4">
          {info.promotions.map((promo) => (
            <div key={promo.title}>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <p className="font-bold text-amber-900">{promo.title}</p>
              </div>
              <ul className="mt-2 space-y-1 pl-7">
                {promo.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
