import { Circle } from 'lucide-react';

import { useStoreStatus } from '@/hooks/useStoreStatus';
import { Enum } from '@/types/supabase/enum';

type Props = {
  onSelect: (paymentOption: Enum<'payment_type'>) => void;
  selected: Enum<'payment_type'>;
};

const AvailablePaymentOptions = ({ selected, onSelect }: Props) => {
  const { availablePayments } = useStoreStatus();

  return (
    <div className="flex justify-center gap-6 md:justify-start md:gap-12">
      {availablePayments.map(payment => {
        const { Icon } = payment;
        return (
          <div
            key={payment.id}
            onClick={() => onSelect(payment.id)}
            className="flex flex-col items-center gap-1 hover:cursor-pointer"
          >
            <div>
              <Icon className="h-6 w-6 fill-primary/10 text-primary" />
            </div>
            <p className="text-center">{payment.name}</p>
            <p className="max-w-[120px] text-center text-sm text-gray-500">{payment.description}</p>
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 bg-white">
              {payment.id === selected && <Circle className="h-3 w-3 fill-black" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailablePaymentOptions;
