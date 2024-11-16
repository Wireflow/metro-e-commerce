'use client';

import { Loader2 } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import AppAvailability from '../components/website-controls/AppAvailability';
import CardPaymentControl from '../components/website-controls/CardPaymentControl';
import StoreStatus from '../components/website-controls/StoreStatus';
import TaxControl from '../components/website-controls/TaxControl';
import { useBranchSettings } from '../hooks/queries/useBranchSettings';

const WebsiteControlsPage = () => {
  const { data: branchSettings, isLoading: isLoadingBranchSettings } = useBranchSettings();

  if (isLoadingBranchSettings) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!branchSettings) {
    return <div>No store settings found</div>;
  }

  return (
    <AnimatedDiv>
      <PageHeader title="Website Controls" description="Manage your website settings" />
      <div className="flex flex-col gap-8">
        <StoreStatus branchSettings={branchSettings} />
        <AppAvailability branchSettings={branchSettings} />
        <CardPaymentControl branchSettings={branchSettings} />
        <TaxControl branchSettings={branchSettings} />
      </div>
    </AnimatedDiv>
  );
};

export default WebsiteControlsPage;
