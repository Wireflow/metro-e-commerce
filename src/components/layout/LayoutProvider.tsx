'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import ProductDetailsDialog from '@/features/products/components/ProductDetailsDialog';
import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { useUser } from '@/hooks/useUser';

import Actions from '../landing/Actions';
import ProductSearchBar from '../landing/AppNavigation';
import Footer from '../landing/Footer/Footer';
import EditModePrompt from '../landing/Header/EditModePrompt';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';
import { Alert } from '../ui/alert';
import AdminAlert from './AdminAlert';
import PendingApproval from './PendingApproval';

type Props = {
  children: React.ReactNode;
};

const avoidKeywords = ['admin', 'disabled', 'sales'];

const LayoutProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const { metadata } = useUser();
  const { data: branchSettings } = useBranchSettings();
  const searchParams = useSearchParams();
  const redirect = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  const isSales = searchParams.get('sales') === 'true';

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

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const BranchStatusBanner = ({ status }: { status: string }) => {
    const statusConfig = {
      busy: {
        title: "We're currently experiencing a high volume of orders!",
        variant: 'warning',
      },
      closed: {
        title: "We're currently closed!",
        variant: 'destructive',
      },
      open: {
        title: "We're open with normal business hours!",
        description: '',
        variant: 'success',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    if (!config) return null;

    return (
      <>
        <div className={`h-10 w-full border-b border-gray-400 bg-theme-secondary`}>
          <Alert
            variant={config.variant as 'success' | 'destructive' | 'warning'}
            className="flex items-center justify-center gap-2 rounded-none border-none text-center"
          >
            <span className="font-semibold">{config.title}</span>
          </Alert>
        </div>
      </>
    );
  };

  return (
    <>
      {shouldShowComponents && !isSales && (
        <>
          <BranchStatusBanner status={branchSettings?.status as string} />
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
      {shouldShowComponents && !isSales && <Footer />}
    </>
  );
};

export default LayoutProvider;
