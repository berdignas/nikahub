import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Wedding of Dion & Sarah | Wedding Invitation',
  description: 'Undangan Pernikahan Digital Eksklusif Dion & Sarah - Vintage Garden Edition',
  icons: {
    icon: '/assets/ornaments/wax-seal-gold.svg',
  },
  openGraph: {
    title: 'The Wedding of Dion & Sarah',
    description: 'Kami mengundang Anda untuk merayakan hari bahagia pernikahan kami.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-vintage-50 text-vintage-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
