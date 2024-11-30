import { CreditCard, LucideIcon, Store } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/features/cart/store/useCartStore';
import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { Enum } from '@/types/supabase/enum';

export type OrderType = {
  id: Enum<'order_type'>;
  name: string;
  disabled?: boolean;
};

type PaymentOption = {
  id: Enum<'payment_type'>;
  name: string;
  description: string;
  disabled?: boolean;
  Icon: LucideIcon;
};

export const useStoreStatus = () => {
  const { data: settings } = useBranchSettings();

  const type = useCartStore(state => state.orderType);
  const [isOrderingAllowed, setIsOrderingAllowed] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  const availablePaymentOptions: PaymentOption[] = [
    {
      id: 'online',
      name: 'Debit/Credit Card',
      description: 'Pay with  debit or credit card ',
      disabled: !settings?.is_card_payment_allowed,
      Icon: CreditCard,
    },
    {
      id: 'later',
      name: `Pay on ${type}`,
      description: 'Pay with cash or check',
      Icon: Store,
      disabled:
        (!settings?.is_pay_on_pickup_allowed && type === 'pickup') ||
        (!settings?.is_pay_on_delivery_allowed && type === 'delivery') ||
        type === 'shipment',
    },
  ];

  useEffect(() => {
    if (!settings) return;

    // Check if the store is enabled at all
    if (!settings.is_app_enabled) {
      setIsOrderingAllowed(false);
      setReason('Store is currently unavailable');
      return;
    }

    // Check store status
    if (settings.status === 'closed') {
      setIsOrderingAllowed(false);
      setReason('Store is currently closed');
      return;
    }

    // Check if ordering is explicitly disabled
    if (!settings.is_ordering_allowed) {
      setIsOrderingAllowed(false);
      setReason('Ordering is temporarily disabled');
      return;
    }

    // Check if all order types are disabled
    const isAllOrderTypesDisabled =
      !settings.is_delivery_allowed && !settings.is_pickup_allowed && !settings.is_shipment_allowed;

    if (isAllOrderTypesDisabled) {
      setIsOrderingAllowed(false);
      setReason('All order types are currently unavailable');
      return;
    }

    // If we reach here, ordering is allowed
    setIsOrderingAllowed(true);
    setReason(null);
  }, [settings]);

  const getEnabledOrderType = () => {
    if (!settings) return undefined;

    if (settings.is_pickup_allowed) return 'pickup';
    if (settings.is_delivery_allowed) return 'delivery';
    if (settings.is_shipment_allowed) return 'shipment';
    return undefined;
  };

  const isOrderTypeEnabled = (type: Enum<'order_type'>) => {
    if (!settings) return false;

    switch (type) {
      case 'pickup':
        return settings.is_pickup_allowed;
      case 'delivery':
        return settings.is_delivery_allowed;
      case 'shipment':
        return settings.is_shipment_allowed;
      default:
        return false;
    }
  };

  return {
    isOrderingAllowed,
    reason,
    status: settings?.status,
    settings,
    isOrderTypeEnabled,
    getEnabledOrderType,
    availablePayments: availablePaymentOptions.filter(p => !p.disabled),
  };
};
