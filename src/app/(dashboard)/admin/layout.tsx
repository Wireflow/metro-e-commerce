import type { Metadata } from 'next';

import AdminHeader from '@/components/layout/AdminHeader';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { validateAdminAccess } from '@/server/users/validateAdminAccess';

export const metadata: Metadata = {
  title: 'Metro Admin',
  description: 'The best way to shop for your business.',
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
  // Optional: Add more metadata
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Your Site Name',
    description: 'Your site description',
    siteName: 'Your Site Name',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await validateAdminAccess();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex w-full flex-col">
        <AdminHeader />
        <main className="w-full p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
