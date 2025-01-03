import { AlertCircle, ShoppingCart, XCircle } from 'lucide-react';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';

type ProductToastProps =
  | {
      variant: 'success';
      title?: string;
      description?: string;
      product?: Product;
    }
  | {
      variant: 'error';
      title?: string;
      description: string;
      product?: Product;
    }
  | {
      variant: 'warning';
      title?: string;
      description?: string;
      product?: Product;
    }
  | {
      variant: 'removed';
      title?: string;
      description?: string;
      product?: Product;
    }
  | {
      variant: 'outOfStock';
      title?: string;
      description?: string;
      product?: Product;
    };

const variantStyles = {
  success: {
    wrapper: 'bg-green-100',
    icon: ShoppingCart,
    iconStyles: 'text-green-600',
    defaultTitle: 'Added to Cart',
    defaultDescription: 'Item added to your cart',
  },
  error: {
    wrapper: 'bg-red-100',
    icon: XCircle,
    iconStyles: 'text-red-600',
    defaultTitle: 'Error',
    defaultDescription: 'Failed to add item to cart',
  },
  warning: {
    wrapper: 'bg-yellow-100',
    icon: AlertCircle,
    iconStyles: 'text-yellow-600',
    defaultTitle: 'Already in Cart',
    defaultDescription: 'This item is already in your cart',
  },
  removed: {
    wrapper: 'bg-gray-100',
    icon: XCircle,
    iconStyles: 'text-gray-600',
    defaultTitle: 'Removed from Cart',
    defaultDescription: 'Item removed from your cart',
  },
  outOfStock: {
    wrapper: 'bg-red-100',
    icon: AlertCircle,
    iconStyles: 'text-red-600',
    defaultTitle: 'Out of Stock',
    defaultDescription: 'This item is currently out of stock',
  },
} as const;

const ProductToast = (props: ProductToastProps) => {
  const styles = variantStyles[props.variant];
  const Icon = styles.icon;

  return (
    <div className="flex w-full items-center gap-3">
      {props.product ? (
        <div className="h-28 w-28 rounded-full">
          <ProductCard.Image disableHoverEffect product={props.product!} />
        </div>
      ) : (
        <div
          className={cn('flex h-8 w-8 items-center justify-center rounded-full', styles.wrapper)}
        >
          <Icon className={cn('h-5 w-5', styles.iconStyles)} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <h3 className="font-medium">{props.title ?? styles.defaultTitle}</h3>
          {props.product && (
            <p className="overflow-hidden truncate text-xs text-gray-600">
              {props.product.name} | {props.product.manufacturer}
            </p>
          )}
          <p className="text-sm text-gray-500">{props.description ?? styles.defaultDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductToast;
