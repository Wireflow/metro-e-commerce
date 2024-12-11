// layout.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import Script from 'next/script';

import LayoutProvider from '@/components/layout/LayoutProvider';
import Providers from '@/components/layout/Providers';
import { Toaster } from '@/components/ui/sonner';
import { METRO_BRANCH_ID } from '@/data/constants';
import { getCustomerById } from '@/features/customers/server/getCustomerById';
import { getCategories } from '@/features/products/server/categories/getCategories';
import { getCustomPromos } from '@/features/promotions/server/getCustomPromos';
import { getPromotedProducts } from '@/features/promotions/server/getPromotedProducts';
import getQueryClient from '@/lib/react-query';
import { getBranchById } from '@/server/branches/getBranchById';
import { getTopCategories } from '@/server/categories/getTopCategories';
import { getManufacturers } from '@/server/manufacturers/getManufacturers';
import { getUser } from '@/utils/supabase/server';

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

  const promotionIds = [1, 2];
  const customPromosIds = [1, 2, 3];

  await queryClient.prefetchQuery({
    queryKey: ['products', 'promoted', promotionIds],
    queryFn: () => getPromotedProducts(promotionIds),
  });

  await queryClient.prefetchQuery({
    queryKey: ['custom-promotions', customPromosIds],
    queryFn: () => getCustomPromos(customPromosIds),
  });

  const {
    data: { user },
  } = await getUser();

  if (user) {
    const {} = getCustomerById(user?.id);
  }

  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
        <Toaster />

        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LayoutProvider>
              {children}
              <SpeedInsights />
            </LayoutProvider>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
