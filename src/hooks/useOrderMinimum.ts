import { useEffect, useState } from 'react';

import { useCartSummary } from '@/features/cart/hooks/queries/useCartSummary';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useBranchSettings } from '@/features/store/server/useBranchSettings';
import { formatCurrency } from '@/utils/utils';

export const useOrderMinimum = () => {
  const [meetsMinimum, setMeetsMinimum] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  const { data: settings } = useBranchSettings();
  const { data: summary } = useCartSummary();
  const { orderType } = useCartStore();

  const pickupMinimum = settings?.pickup_minimum ?? 0;
  const deliveryMinimum = settings?.delivery_minimum ?? 0;
  const shipmentMinimum = settings?.shipment_minimum ?? 0;

  useEffect(() => {
    if (!settings) return;

    if (orderType === 'pickup' && (summary?.subtotal ?? 0) < pickupMinimum) {
      setMeetsMinimum(false);
      setReason(
        `Pickup minimum is ${formatCurrency(pickupMinimum)} Current: ${formatCurrency(summary?.subtotal ?? 0)}`
      );
      return;
    }

    if (orderType === 'delivery' && (summary?.subtotal ?? 0) < deliveryMinimum) {
      setMeetsMinimum(false);
      setReason(
        `Delivery minimum is ${formatCurrency(deliveryMinimum)} Current: ${formatCurrency(summary?.subtotal ?? 0)}`
      );
      return;
    }

    if (orderType === 'shipment' && (summary?.subtotal ?? 0) < shipmentMinimum) {
      setMeetsMinimum(false);
      setReason(
        `Shipment minimum is ${formatCurrency(shipmentMinimum)} Current: ${formatCurrency(summary?.subtotal ?? 0)}`
      );
      return;
    }

    setMeetsMinimum(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, summary, orderType]);

  return {
    meetsMinimum,
    reason,
  };
};
