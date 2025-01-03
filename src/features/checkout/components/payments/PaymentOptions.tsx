import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { Enum } from '@/types/supabase/enum';
import { ViewRow } from '@/types/supabase/table';

import AvailablePaymentOptions from './AvailablePaymentOptions';
import PaymentsRadioList from './PaymentsRadioList';

type Props = {
  payments: ViewRow<'payment_methods_with_spending'>[];
  onSelect?: (payment: ViewRow<'payment_methods_with_spending'>) => void;
  orderType?: Enum<'order_type'>;
  onPaymentOptionChange: (paymentOption: Enum<'payment_type'>) => void;
  paymentOption: Enum<'payment_type'>;
};

const PaymentOptions = ({
  payments,
  onSelect,
  orderType,
  onPaymentOptionChange,
  paymentOption,
}: Props) => {
  const [selected, setSelected] = useState<ViewRow<'payment_methods_with_spending'> | null>(null);
  const { setPaymentMethodId, paymentMethodId } = useCartStore();

  const handleSelect = (payment: ViewRow<'payment_methods_with_spending'>) => {
    if (!payment.id) return;
    setPaymentMethodId(payment.id);
    setSelected(payment);
    onSelect?.(payment);
  };

  const selectedPayment = payments.find(payment => payment.id === paymentMethodId);

  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Choose Payment</p>
      <Card className="shadow-none">
        <div className="w-full px-8 py-6">
          <AvailablePaymentOptions selected={paymentOption} onSelect={onPaymentOptionChange} />
        </div>
        <div>
          {paymentOption === 'online' && (
            <PaymentsRadioList
              payments={payments}
              selected={selectedPayment}
              onSelect={handleSelect}
            />
          )}
          {paymentOption === 'later' && (
            <div className="border-t p-4 px-8">
              <p className="font-semibold">Pay on {orderType}</p>
              <p className="text-xs text-gray-500">Payment will be made on {orderType}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentOptions;
