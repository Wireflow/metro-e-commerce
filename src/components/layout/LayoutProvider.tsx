'use client';

import { usePathname } from 'next/navigation';

import React, { useMemo } from 'react';

import ProductDetailsDialog from '@/features/products/components/ProductDetailsDialog';

import Actions from '../landing/Actions';
import ProductSearchBar from '../landing/AppNavigation';
import Footer from '../landing/Footer/Footer';
import EditModePrompt from '../landing/Header/EditModePrompt';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';
import PendingApproval from './PendingApproval';

type Props = {
  children: React.ReactNode;
};

const avoidKeywords = ['admin'];

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
          <PendingApproval />
          <Actions />
        </>
      )}
      {children}
      <ProductDetailsDialog />

      {shouldShowComponents && <Footer />}
    </>
  );
};

export default LayoutProvider;
