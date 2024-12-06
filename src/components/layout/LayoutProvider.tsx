'use client';

import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useMemo } from 'react';

import ProductDetailsDialog from '@/features/products/components/ProductDetailsDialog';
import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { useUser } from '@/hooks/useUser';

import Actions from '../landing/Actions';
import ProductSearchBar from '../landing/AppNavigation';
import Footer from '../landing/Footer/Footer';
import EditModePrompt from '../landing/Header/EditModePrompt';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';
import AdminAlert from './AdminAlert';
import PendingApproval from './PendingApproval';

type Props = {
  children: React.ReactNode;
};

const avoidKeywords = ['admin', 'disabled'];

const LayoutProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const { metadata } = useUser();
  const { data: branchSettings } = useBranchSettings();
  const redirect = useRouter();

  const shouldShowComponents = useMemo(() => {
    return !avoidKeywords.some(keyword => pathname.toLowerCase().includes(keyword.toLowerCase()));
  }, [pathname]);

  const userRole = metadata?.role;
  const isAdmin = userRole === 'admin';
  const isAdminPath = pathname.toLowerCase().includes('admin');

  useEffect(() => {
    if (branchSettings?.is_app_enabled === false && !isAdminPath && !isAdmin) {
      redirect.push('/disabled');
    }
  }, [branchSettings, redirect, isAdmin, isAdminPath]);

  return (
    <>
      {shouldShowComponents && (
        <>
          <AdminAlert />
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
