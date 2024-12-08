import { Row } from '@/types/supabase/table';
import { formatDateToString } from '@/utils/dateUtils';

import { getTrackingUrl } from '../schemas/shipping';
import TrackPackageButton from './shipping/TrackPackageButton';

type Props = {
  shipping: Row<'order_shipping'> | null;
};

const OrderShipping = ({ shipping }: Props) => {
  const trackingUrl = getTrackingUrl(shipping?.provider, shipping?.tracking_number);

  return (
    <div className="space-y-3 px-6">
      <h1 className="text-xl font-semibold">Shipment</h1>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-4 md:gap-8">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Carrier</span>
            <p className="text-sm text-neutral-600">{shipping?.provider ?? 'Pending Shipment'}</p>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Tracking Number</span>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-neutral-600">
                {shipping?.tracking_number ?? 'Not Available'}
              </p>
              {shipping?.tracking_number && <TrackPackageButton trackingUrl={trackingUrl} />}
            </div>
          </div>
        </div>

        {shipping?.shipped_at && (
          <div className="flex flex-col">
            <span className="text-sm font-medium">Shipped Date</span>
            <p className="text-sm text-neutral-600">
              {formatDateToString(new Date(shipping.shipped_at))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderShipping;
