import PageHeader from '@/components/layout/PageHeader';

import DeliverySettings from '../components/DeliverySettings';

const StoreStatusPage = () => {
  return (
    <div>
      <PageHeader title="Website Controls" description="Manage your store settings" />
      <DeliverySettings />
    </div>
  );
};

export default StoreStatusPage;
