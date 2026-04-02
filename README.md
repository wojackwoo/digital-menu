# Digital Menu MVP (Next.js + TypeScript + Tailwind)

A mobile-first restaurant digital menu MVP where customers can:

- Open `/menu?table=12`
- Browse menu categories/items
- Pick options (size, crust, etc.)
- Add notes and quantity
- Add items to cart
- Send the order through WhatsApp

## Project structure

- `data/menu-source.ts`: original menu data (easy to edit manually)
- `lib/menu.ts`: normalization into frontend-friendly structure
- `lib/types.ts`: shared TypeScript types
- `lib/whatsapp.ts`: order message and WhatsApp URL generation
- `components/*`: reusable UI components
- `app/menu/page.tsx`: menu page + cart flow

## Run locally (VS Code)

1. Open terminal in project root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000/menu?table=12`.

## Run in GitHub Codespaces

1. Open repository in Codespaces.
2. In terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Use the forwarded port 3000 URL and open `/menu?table=12`.

## Notes

- No admin dashboard, auth, payment, delivery, analytics, or backend services.
- Menu data and pricing are local and manually editable in `data/menu-source.ts`.
