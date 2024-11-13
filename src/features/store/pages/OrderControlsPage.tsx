import PageHeader from '@/components/layout/PageHeader';

import DeliverySettings from '../components/delivery-settings/DeliverySettings';
import OrderControl from '../components/OrderControl';
import PickupSettings from '../components/pickup-settings/PickupSettings';
import ShipmentSettings from '../components/shipment-settings/ShipmentSettings';

const OrderControlsPage = () => {
  return (
    <div>
      <PageHeader title="Order Controls" description="Manage your order settings" />
      <div className="flex flex-col gap-8">
        <OrderControl />
        <DeliverySettings />
        <PickupSettings />
        <ShipmentSettings />
      </div>
    </div>
  );
};

export default OrderControlsPage;
