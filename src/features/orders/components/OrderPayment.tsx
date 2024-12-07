import { BanknoteIcon, CreditCard, Store } from 'lucide-react';
import { CiMoneyCheck1 } from 'react-icons/ci';

import { Enum } from '@/types/supabase/enum';

import { type OrderPayment } from '../schemas/orders';

type Props = {
  payment: OrderPayment;
};

type PaymentContent = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

const OrderPayment = ({ payment }: Props) => {
  if (!payment?.payment_method) return null;

  const paymentContent: Record<Enum<'payment_type'>, PaymentContent> = {
    online: {
      icon: <CreditCard className="h-5 w-5 text-gray-600" />,
      label: 'Credit/Debit Card',
      description: 'Paid online with card',
    },
    later: {
      icon: <Store className="h-5 w-5 text-gray-600" />,
      label: 'Pay on Delivery',
      description: 'Pay with cash or check',
    },
    card: {
      icon: <CreditCard className="h-5 w-5 text-gray-600" />,
      label: 'Credit Card',
      description: 'Paid with card',
    },
    cash: {
      icon: <BanknoteIcon className="h-5 w-5 text-gray-600" />,
      label: 'Cash on Delivery',
      description: 'Pay with cash upon delivery',
    },
    check: {
      icon: <CiMoneyCheck1 className="h-6 w-6 text-gray-600" strokeWidth={0.5} />,
      label: 'Check on Delivery',
      description: 'Pay with check upon delivery',
    },
  };

  const content = paymentContent[payment.payment_type];
  const PaymentIcon = content.icon;
  const isOnlinePayment = payment.payment_type === 'online';

  return (
    <div className="w-full border-t border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-start gap-3">
          {content.icon}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">{content.label}</p>
            <p className="text-sm text-gray-500">{content.description}</p>
          </div>
        </div>
        {isOnlinePayment && payment.payment_method.last_four && (
          <p className="text-sm text-gray-600">**** **** **** {payment.payment_method.last_four}</p>
        )}
      </div>
    </div>
  );
};

export default OrderPayment;
