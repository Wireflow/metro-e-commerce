import { AlertCircle, CheckCircle, CreditCard, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type CheckoutToastProps =
  | {
      variant: 'success';
      title?: string;
      description?: string;
      orderNumber?: string | number;
    }
  | {
      variant: 'error';
      title?: string;
      description: string;
    }
  | {
      variant: 'processing';
      title?: string;
      description?: string;
    }
  | {
      variant: 'validation';
      title?: string;
      description?: string;
    };

const variantStyles = {
  success: {
    wrapper: 'bg-green-100',
    icon: CheckCircle,
    iconStyles: 'text-green-600',
    defaultTitle: 'Order Placed',
    defaultDescription: 'Thank you for your purchase',
  },
  error: {
    wrapper: 'bg-red-100',
    icon: XCircle,
    iconStyles: 'text-red-600',
    defaultTitle: 'Checkout Failed',
    defaultDescription: 'Unable to process your order',
  },
  processing: {
    wrapper: 'bg-blue-100',
    icon: CreditCard,
    iconStyles: 'text-blue-600',
    defaultTitle: 'Processing Payment',
    defaultDescription: 'Please wait while we process your payment',
  },
  validation: {
    wrapper: 'bg-yellow-100',
    icon: AlertCircle,
    iconStyles: 'text-yellow-600',
    defaultTitle: 'Invalid Information',
    defaultDescription: 'Please check your order details',
  },
} as const;

const CheckoutToast = (props: CheckoutToastProps) => {
  const styles = variantStyles[props.variant];
  const Icon = styles.icon;

  return (
    <div className="flex w-full items-center gap-3">
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-full', styles.wrapper)}>
        <Icon className={cn('h-5 w-5', styles.iconStyles)} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{props.title ?? styles.defaultTitle}</h3>
        <p className="text-sm text-gray-500">
          {props.description ?? styles.defaultDescription}
          {props.variant === 'success' && props.orderNumber && (
            <span className="ml-1 font-medium">Order #{props.orderNumber}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CheckoutToast;
