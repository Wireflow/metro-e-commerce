import { useState } from 'react';

import { useCartStore } from '@/features/cart/store/useCartStore';
import { ViewRow } from '@/types/supabase/table';

import AvailablePaymentOptions from './AvailablePaymentOptions';
import PaymentsRadioList from './PaymentsRadioList';

type Props = {
  payments: ViewRow<'payment_methods_with_spending'>[];
  onSelect?: (payment: ViewRow<'payment_methods_with_spending'>) => void;
};

const PaymentOptions = ({ payments, onSelect }: Props) => {
  const [selected, setSelected] = useState<ViewRow<'payment_methods_with_spending'> | null>(null);
  const { setPaymentOption, paymentOption, orderType } = useCartStore();

  const handleSelect = (payment: ViewRow<'payment_methods_with_spending'>) => {
    setSelected(payment);
    onSelect?.(payment);
  };

  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Choose Payment</p>
      <div className="rounded-md border">
        <div className="w-full px-8 py-6">
          <AvailablePaymentOptions selected={paymentOption} onSelect={setPaymentOption} />
        </div>
        <div>
          {paymentOption === 'online' && (
            <PaymentsRadioList payments={payments} selected={selected} onSelect={handleSelect} />
          )}
          {paymentOption === 'later' && (
            <div className="border-t p-4 px-8">
              <p className="font-semibold">Pay on {orderType}</p>
              <p className="text-xs text-gray-500">Payment will be made on {orderType}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
