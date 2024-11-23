'use client';

import Image from 'next/image';

import { ISOStringFormat } from 'date-fns';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button, ButtonProps } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import SignInButton from '@/features/auth/components/SignInButton';
import WithAuth, { UserMetadata } from '@/features/auth/components/WithAuth';
import { useAddToCart } from '@/features/cart/hooks/mutations/useAddToCart';
import { useRemoveFromCart } from '@/features/cart/hooks/mutations/useRemoveFromCart';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useAddToWishlist } from '@/features/wishlist/hooks/mutations/useAddToWishlist';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';
import { formatCurrency, truncate } from '@/utils/utils';

import { Product } from '../schemas/products';
import { useQuickViewStore } from '../store/useQuickViewStore';
import { isDiscountValid } from '../utils/validateDiscount';

type ProductCardProps = {
  children?: ReactNode[];
  className?: string;
  onClick?: () => void;
};

type CustomRenderProps = {
  preDiscount: number;
  afterDiscount: number;
  isValidDiscount: boolean;
  discount: number | null;
};

export const PriceSection = ({
  type,
  price,
  label,
  isValidDiscount,
  discount,
  disableCompare,
  signInClassname,
  customRender,
}: {
  type: Enum<'customer_type'>;
  price: number;
  label?: string;
  isValidDiscount: boolean;
  discount: number | null;
  disableCompare?: boolean;
  signInClassname?: string;
  customRender?: (data: CustomRenderProps) => React.ReactNode;
}) => (
  <WithAuth
    rules={{
      customCheck: (metadata: UserMetadata) => metadata?.customer_type === type,
    }}
    fallback={
      <SignInButton
        className={cn('mt-1 w-full flex-1', signInClassname)}
        text={'Sign in for pricing'}
        variant={'soft'}
      />
    }
  >
    {customRender ? (
      customRender({
        preDiscount: price,
        afterDiscount: price - (discount ?? 0),
        isValidDiscount,
        discount,
      })
    ) : (
      <div>
        {label && <p className="text-xs">{label}</p>}
        <div className="flex items-center gap-2">
          {!disableCompare && (
            <>
              <p
                className={cn('text-theme-primary', {
                  'text-sm text-red-500 line-through': isValidDiscount,
                })}
              >
                {formatCurrency(price)}
              </p>
              {isValidDiscount && discount && (
                <p className={cn('font-semibold text-theme-sky-blue')}>
                  {formatCurrency(price - discount)}
                </p>
              )}
            </>
          )}
          {disableCompare ? (
            isValidDiscount ? (
              <p className="font-medium text-black">{formatCurrency(price - (discount ?? 0))}</p>
            ) : (
              <p className="font-medium text-black">{formatCurrency(price)}</p>
            )
          ) : null}
        </div>
      </div>
    )}
  </WithAuth>
);

const ProductCard = ({ children, className, onClick }: ProductCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn('border-gray-150 rounded-[2px] p-4 shadow-none', className)}
    >
      {children}
    </Card>
  );
};

const ProductTitle = ({
  product,
  size = 'md',
  className,
}: {
  product: Product;
  size?: 'sm' | 'md';
  className?: string;
}) => {
  return (
    <p
      className={cn(
        'truncate',
        { 'text-sm': size === 'sm', 'text-base': size === 'md' },
        className
      )}
    >
      {product.name} | {product.manufacturer} | {product.unit}
    </p>
  );
};

ProductCard.Title = ProductTitle;

const ProductDescription = ({ product, className }: { product: Product; className?: string }) => {
  return (
    <p className={cn('text-sm text-gray-500', className)}>
      {truncate(product.description as string)}
    </p>
  );
};

ProductCard.Description = ProductDescription;

type BadgeVariant = 'hot' | 'new' | 'best-seller' | 'discount';

const badgeVariants: Record<BadgeVariant, { text: string; className: string }> = {
  hot: {
    text: 'Hot',
    className: 'bg-red-500 hover:bg-red-600 text-white',
  },
  new: {
    text: 'New',
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  'best-seller': {
    text: 'Best Seller',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  discount: {
    text: 'Sale',
    className: 'bg-green-500 hover:bg-green-600 text-white',
  },
};

interface ProductSaleBadgeProps {
  product: Product;
  variant: BadgeVariant;
  className?: string;
}

const ProductSaleBadge = ({ product, variant = 'discount', className }: ProductSaleBadgeProps) => {
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  if (!hasValidDiscount && variant === 'discount') {
    return null;
  }

  const badgeConfig = badgeVariants[variant];

  return (
    <Badge
      variant="secondary"
      className={cn(
        'z-50 w-fit rounded-none font-medium uppercase',
        badgeConfig.className,
        className
      )}
    >
      {variant === 'discount' && hasValidDiscount
        ? `-${formatCurrency(product?.discount ?? 0)} Off`
        : badgeConfig.text}
    </Badge>
  );
};

ProductCard.SaleBadge = ProductSaleBadge;

const ProductImage = ({
  product,
  className,
  disableSaleBadge,
  disableHoverEffect,
  object,
}: {
  product: Product;
  className?: string;
  disableSaleBadge?: boolean;
  disableHoverEffect?: boolean;
  object?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}) => {
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return (
    <div className={cn('relative aspect-square h-full w-full', className)}>
      <div className="absolute inset-0">
        <Image
          alt={product.name}
          src={product.images[0]?.url ?? PLACEHOLDER_IMG_URL}
          objectFit="contain"
          className="object-contain p-4 mix-blend-multiply"
          style={{
            maskImage: 'linear-gradient(to bottom, black, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
          }}
          fill
        />
      </div>

      <div className="absolute left-1 top-1 z-10 flex w-full justify-between">
        {hasValidDiscount && disableSaleBadge !== true && (
          <Badge variant="yellow" className="rounded-[2px] hover:bg-theme-accent">
            Sale
          </Badge>
        )}
      </div>
      {!disableHoverEffect && (
        <WithAuth>
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 hover:opacity-100">
            <div className="flex items-center justify-center gap-1.5">
              {product.in_stock && (
                <ProductAddToCartButton
                  product={product}
                  size={'icon'}
                  className={cn(
                    'group/cart h-9 w-9 rounded-full bg-white group-hover/cart:bg-primary',
                    {
                      'bg-destructive': !product.in_stock,
                    }
                  )}
                >
                  <ShoppingCart
                    className={cn('h-5 w-5 text-black group-hover/cart:text-white', {
                      'text-white': !product.in_stock,
                    })}
                  />
                </ProductAddToCartButton>
              )}
              <ProductWishlistButton
                product={product}
                size={'icon'}
                className="group/wishlist rounded-full border-none bg-white hover:bg-primary"
              />
              <ProductQuickViewButton
                product={product}
                size={'icon'}
                className="group/quickview rounded-full border-none bg-white hover:bg-primary"
              />
            </div>
          </div>
        </WithAuth>
      )}
    </div>
  );
};

ProductCard.Image = ProductImage;

const ProductPrice = ({ product, className }: { product: Product; className?: string }) => {
  const { metadata } = useUser();
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return (
    <PriceSection
      isValidDiscount={hasValidDiscount}
      signInClassname={className}
      discount={product?.discount}
      type={metadata?.customer_type}
      price={
        metadata?.customer_type === 'wholesale' ? product.wholesale_price : product.retail_price
      }
    />
  );
};

ProductCard.Price = ProductPrice;

const ProductRemoveFromCartButton = ({
  children,
  cartItemId,
  ...props
}: ButtonProps & { children?: React.ReactNode; cartItemId: string }) => {
  const { mutate: removeFromCart, isPending } = useRemoveFromCart();

  const handleRemoveFromCart = () => {
    removeFromCart(cartItemId);
  };

  return (
    <WithAuth>
      <Button
        className={cn('w-full', props.className)}
        disabled={isPending}
        size={props.size}
        onClick={e => {
          e.stopPropagation();
          handleRemoveFromCart();
        }}
        {...props}
      >
        {children ?? 'Remove from Cart'}
      </Button>
    </WithAuth>
  );
};

ProductCard.RemoveFromCartButton = ProductRemoveFromCartButton;

const ProductAddToCartButton = ({
  product,
  children,
  ...props
}: ButtonProps & { product: Product; children?: React.ReactNode }) => {
  const { mutate: addToCart, isPending } = useAddToCart();
  const getCartItemById = useCartStore(state => state.getCartItemById);

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      quantity: 1,
    });
  };

  const cartItem = getCartItemById(product.id);

  const defaultChildren = !product.in_stock
    ? 'Out of Stock'
    : !!cartItem
      ? 'In Cart'
      : isPending
        ? 'Adding...'
        : 'Add to Cart';

  return (
    <WithAuth>
      <Button
        className={cn('w-full', props.className)}
        variant={product.in_stock ? undefined : 'destructive'}
        disabled={!product.in_stock || isPending || !!cartItem}
        onClick={e => {
          e.stopPropagation();
          handleAddToCart();
        }}
        {...props}
      >
        {children ?? defaultChildren}
      </Button>
    </WithAuth>
  );
};

ProductCard.AddToCartButton = ProductAddToCartButton;

const ProductWishlistButton = ({ product, ...props }: ButtonProps & { product: Product }) => {
  const { mutate: addToWishlist, isPending } = useAddToWishlist();

  const handleWishlist = () => {
    addToWishlist(product.id);
  };

  return (
    <WithAuth>
      <Button
        className={cn('border-none bg-theme-beige text-black', props.className)}
        onClick={e => {
          e.stopPropagation();
          handleWishlist();
        }}
        disabled={isPending}
        size={'icon'}
        variant={'outline'}
        {...props}
      >
        <Heart className="h-5 w-5 text-black group-hover/wishlist:text-white" />
      </Button>
    </WithAuth>
  );
};

ProductCard.WishlistButton = ProductWishlistButton;

const ProductQuickViewButton = ({ product, ...props }: ButtonProps & { product: Product }) => {
  const setProductAndOpen = useQuickViewStore(state => state.setProductAndOpen);

  const handleQuickView = () => {
    setProductAndOpen(product);
  };

  return (
    <WithAuth>
      <Button
        className={cn('border-none bg-theme-beige text-black', props.className)}
        onClick={e => {
          e.stopPropagation();
          handleQuickView();
        }}
        size={'icon'}
        variant={'outline'}
        {...props}
      >
        <Eye className="h-5 w-5 text-black group-hover/quickview:text-white" />
      </Button>
    </WithAuth>
  );
};

ProductCard.QuickViewButton = ProductQuickViewButton;

export default ProductCard;
