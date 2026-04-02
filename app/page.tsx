import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Pizza Hut Digital Menu</h1>
      <p className="mt-3 text-slate-600">MVP menu flow with cart and WhatsApp ordering.</p>
      <Link
        href="/menu?table=12"
        className="mt-6 rounded-full bg-brand px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        Open Table 12 Menu
      </Link>
    </main>
  );
}
