import { CalendarCheck, Clock, LucideIcon, Package, Plane, Truck } from 'lucide-react';

import { Animate } from '@/components/animation/Animate';
import Conditional from '@/components/Conditional';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';

type FulfillmentTimeInfo = {
  beforeNoon: string;
  afterNoon: string;
};

type FulfillmentDetail = {
  title: string;
  timeInfo: FulfillmentTimeInfo;
  notes: string[];
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
};

type FulfillmentMap = Record<Enum<'order_type'>, FulfillmentDetail>;

const fulfillmentDetails: FulfillmentMap = {
  pickup: {
    title: 'Store Pickup',
    timeInfo: {
      beforeNoon: 'Same-day pickup available',
      afterNoon: 'Next-day pickup',
    },
    notes: [
      'Ready for pickup as soon as possible',
      'Quick & convenient collection',
      'Email notification when ready',
    ],
    icon: Package,
    secondaryIcon: Clock,
  },
  delivery: {
    title: 'Local Delivery',
    timeInfo: {
      beforeNoon: 'Same-day delivery available',
      afterNoon: 'Next-day delivery scheduled',
    },
    notes: [
      'Direct to your business location',
      'Real-time tracking available',
      'Professional handling',
      'Email updates throughout',
    ],
    icon: Truck,
    secondaryIcon: Clock,
  },
  shipment: {
    title: 'Express Shipping',
    timeInfo: {
      beforeNoon: 'Same-day dispatch available',
      afterNoon: 'Next-day processing guaranteed',
    },
    notes: [
      'Nationwide coverage',
      'Secure packaging standard',
      'Full tracking included',
      'Regular status updates',
    ],
    icon: Plane,
    secondaryIcon: CalendarCheck,
  },
};

type FulfillmentSummaryProps = {
  orderType: Enum<'order_type'>;
  pickupAddress: string | null;
  deliveryAddress: string | null;
};

const FulfillmentSummary = ({
  orderType,
  pickupAddress,
  deliveryAddress,
}: FulfillmentSummaryProps) => {
  if (!orderType) return null;

  const details = fulfillmentDetails[orderType];
  const Icon = details.icon;
  const SecondaryIcon = details.secondaryIcon;

  return (
    <Animate type="fade" direction="left">
      <p className="mb-4 font-semibold md:text-lg">Fulfillment Details</p>
      <Card className="w-full px-8 py-6 shadow-none">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <p className="font-medium">{details.title}</p>
        </div>

        <Conditional condition={!!deliveryAddress && orderType === 'delivery'}>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <SecondaryIcon className="mt-1 h-4 w-4" />
              <div>
                <p className="text-sm">Delivery Address:</p>
                <p className="text-sm text-gray-900">{deliveryAddress}</p>
              </div>
            </div>
          </div>
        </Conditional>

        <Conditional condition={!!pickupAddress && orderType === 'pickup'}>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <SecondaryIcon className="mt-1 h-4 w-4" />
              <div>
                <p className="text-sm">Pickup Address:</p>
                <p className="text-sm text-gray-900">{pickupAddress}</p>
              </div>
            </div>
          </div>
        </Conditional>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <SecondaryIcon className="mt-1 h-4 w-4" />
            <div>
              <p>Before 12 PM: {details.timeInfo.beforeNoon}</p>
              <p>After 12 PM: {details.timeInfo.afterNoon}</p>
            </div>
          </div>

          <div className="ml-6 space-y-2">
            {details.notes.map((note, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <p className={cn('text-sm leading-relaxed text-gray-900')}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Animate>
  );
};

export default FulfillmentSummary;
