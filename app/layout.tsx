import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { AuthProvider } from '@/components/auth-provider';

const sans = DM_Sans({
  variable: '--font-arc-sans',
  subsets: ['latin'],
  display: 'swap',
});

const display = Fraunces({
  variable: '--font-arc-display',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f1' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1727' },
  ],
};

// Runs while the browser parses <head>, before first paint, so the stored
// theme is applied without a flash of the default light palette. Mirrors
// getInitialTheme() in components/theme-toggle.tsx.
const themeBootstrap = `(function(){try{var s=localStorage.getItem("arc-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
