import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Menu MVP',
  description: 'Restaurant digital menu with WhatsApp order flow'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
