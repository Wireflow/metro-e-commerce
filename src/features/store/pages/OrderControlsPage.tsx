'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { useCurrentBranch } from '@/hooks/queries/useCurrentBranch';

import DeliverySettings from '../components/delivery-settings/DeliverySettings';
import LoadingSkeleton from '../components/LoadingSkeleton';
import OrderControl from '../components/OrderControl';
import PickupSettings from '../components/pickup-settings/PickupSettings';
import ShipmentSettings from '../components/shipment-settings/ShipmentSettings';
import { useBranchSettings } from '../hooks/queries/useBranchSettings';

const OrderControlsPage = () => {
  const { isLoading: isLoadingBranchSettings } = useBranchSettings();
  const { isLoading: isLoadingBranch } = useCurrentBranch();

  if (isLoadingBranchSettings || isLoadingBranch) {
    return <LoadingSkeleton />;
  }

  return (
    <AnimatedDiv>
      <PageHeader title="Order Controls" description="Manage your order settings" />
      <div className="flex flex-col gap-8">
        <OrderControl />
        <DeliverySettings />
        <PickupSettings />
        <ShipmentSettings />
      </div>
    </AnimatedDiv>
  );
};

export default OrderControlsPage;
