import type { Metadata } from 'next';
import { DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { AuthProvider } from '@/components/auth-provider';

const sans = DM_Sans({
  variable: '--font-arc-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'arc',
  description: 'Prática universitária para aprender no seu ritmo.',
  openGraph: {
    title: 'arc',
    description: 'Prática universitária para aprender no seu ritmo.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'arc',
    description: 'Prática universitária para aprender no seu ritmo.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
