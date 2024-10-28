// layout.tsx
import { Public_Sans } from 'next/font/google';

import type { Metadata } from 'next';

import Providers from '@/components/layout/Providers';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  // Specify the weights you need
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // Optional: Include italic styles if needed
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Metro Cash & Carry',
  description: 'The best way to shop for your business',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Metro Cash & Carry',
    description: 'The best way to shop for your business',
    siteName: 'Metro Cash & Carry',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
