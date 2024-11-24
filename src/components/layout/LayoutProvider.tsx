'use client';

import { usePathname } from 'next/navigation';

import React, { useMemo } from 'react';

import ProductDetailsDialog from '@/features/products/components/ProductDetailsDialog';

import ProductSearchBar from '../landing/AppNavigation';
import Footer from '../landing/Footer/Footer';
import EditModePrompt from '../landing/Header/EditModePrompt';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';

type Props = {
  children: React.ReactNode;
};

const avoidKeywords = ['admin', 'sign-in', 'register', 'forgot-password'];

const LayoutProvider = ({ children }: Props) => {
  const pathname = usePathname();

  const shouldShowComponents = useMemo(() => {
    return !avoidKeywords.some(keyword => pathname.toLowerCase().includes(keyword.toLowerCase()));
  }, [pathname]);

  return (
    <>
      {shouldShowComponents && (
        <>
          <EditModePrompt />
          <PromoBanner />
          <SocialsBanner />
          <ProductSearchBar />
        </>
      )}
      {children}
      <ProductDetailsDialog />

      {shouldShowComponents && <Footer />}
    </>
  );
};

export default LayoutProvider;
