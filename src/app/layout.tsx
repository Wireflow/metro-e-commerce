// layout.tsx
import { Public_Sans } from 'next/font/google';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import LayoutProvider from '@/components/layout/LayoutProvider';
import Providers from '@/components/layout/Providers';
import { Toaster } from '@/components/ui/sonner';
import { METRO_BRANCH_ID } from '@/data/constants';
import { getCategories } from '@/features/products/server/categories/getCategories';
import getQueryClient from '@/lib/react-query';
import { getBranchById } from '@/server/branches/getBranchById';
import { getTopCategories } from '@/server/categories/getTopCategories';
import { getManufacturers } from '@/server/manufacturers/getManufacturers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['branch', METRO_BRANCH_ID],
    queryFn: async () => {
      const { data: branch, error } = await getBranchById(METRO_BRANCH_ID);

      if (error) {
        throw error;
      }

      return branch;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers,
  });

  await queryClient.prefetchQuery({
    queryKey: ['categories', 'top'],
    queryFn: getTopCategories,
  });

  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <Toaster />

        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LayoutProvider>{children}</LayoutProvider>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
