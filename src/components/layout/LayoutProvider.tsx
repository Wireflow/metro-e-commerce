'use client';

import { usePathname } from 'next/navigation';

import React, { useMemo } from 'react';

import Footer from '../landing/Footer/Footer';
import ProductSearchBar from '../landing/ProductSearchBar';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';

type Props = {
  children: React.ReactNode;
};

const avoidKeywords = ['admin', 'sign-in', 'register', 'forgot-password'];

const LayoutProvider = ({ children }: Props) => {
  const pathname = usePathname();

  const shouldShowComponents = useMemo(() => {
    // Check if the current pathname includes any of the avoided keywords
    return !avoidKeywords.some(keyword => pathname.toLowerCase().includes(keyword.toLowerCase()));
  }, [pathname]);

  return (
    <>
      {shouldShowComponents && (
        <>
          <PromoBanner />
          <SocialsBanner />
          <ProductSearchBar />
        </>
      )}
      {children}
      {shouldShowComponents && <Footer />}
    </>
  );
};

export default LayoutProvider;
