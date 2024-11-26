import { AlertCircle, Heart, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type WishlistToastProps =
  | {
      variant: 'success';
      title?: string;
      description?: string;
    }
  | {
      variant: 'error';
      title?: string;
      description: string;
    }
  | {
      variant: 'warning';
      title?: string;
      description?: string;
    }
  | {
      variant: 'removed';
      title?: string;
      description?: string;
    };

const variantStyles = {
  success: {
    wrapper: 'bg-red-100',
    icon: Heart,
    iconStyles: 'text-red-600 fill-red-600',
    defaultTitle: 'Added to Wishlist',
    defaultDescription: 'Item successfully added to your wishlist',
  },
  error: {
    wrapper: 'bg-red-100',
    icon: XCircle,
    iconStyles: 'text-red-600',
    defaultTitle: 'Error',
    defaultDescription: 'Failed to add item to wishlist',
  },
  warning: {
    wrapper: 'bg-yellow-100',
    icon: AlertCircle,
    iconStyles: 'text-yellow-600',
    defaultTitle: 'Already in Wishlist',
    defaultDescription: 'This item is already in your wishlist',
  },
  removed: {
    wrapper: 'bg-gray-100',
    icon: XCircle,
    iconStyles: 'text-gray-600',
    defaultTitle: 'Removed from Wishlist',
    defaultDescription: 'Item removed from your wishlist',
  },
} as const;

const WishlistToast = (props: WishlistToastProps) => {
  const styles = variantStyles[props.variant];
  const Icon = styles.icon;

  return (
    <div className="flex w-full items-center gap-3">
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-full', styles.wrapper)}>
        <Icon className={cn('h-5 w-5', styles.iconStyles)} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{props.title ?? styles.defaultTitle}</h3>
        <p className="text-sm text-gray-500">{props.description ?? styles.defaultDescription}</p>
      </div>
    </div>
  );
};

export default WishlistToast;
