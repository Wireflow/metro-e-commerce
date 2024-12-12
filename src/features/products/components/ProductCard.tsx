'use client';

import { Clock, Eye, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';

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
import { useDeleteFromWishList } from '@/features/wishlist/hooks/mutations/useDeleteFromWishlist';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { formatCurrency, truncate } from '@/utils/utils';

import { Product } from '../schemas/products';
import { useQuickViewStore } from '../store/useQuickViewStore';
import { validateProductDiscount } from '../utils/validateDiscount';
import TobaccoBadge from './TobaccoBadge';

type ProductCardProps = {
  children?: ReactNode[];
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

type CustomRenderProps = {
  preDiscount: number;
  afterDiscount: number;
  isValidDiscount: boolean;
  discount: number | null;
};

export const PriceSection = ({
  label,
  product,
  disableCompare,
  signInClassname,
  customRender,
}: {
  product?: Product;
  label?: string;
  disableCompare?: boolean;
  signInClassname?: string;
  customRender?: (data: CustomRenderProps) => React.ReactNode;
}) => {
  const { user, metadata } = useUser();
  const isValidDiscount = validateProductDiscount(product);

  const price =
    metadata?.customer_type === 'wholesale'
      ? (product?.wholesale_price ?? 0)
      : (product?.retail_price ?? 0);

  const discount =
    metadata?.customer_type === 'wholesale'
      ? (product?.wholesale_discount ?? 0)
      : (product?.retail_discount ?? 0);

  const type = metadata?.customer_type;

  return (
    <WithAuth
      rules={{
        customCheck: (metadata: UserMetadata) =>
          metadata?.customer_type === type && !!metadata.approved,
      }}
      fallback={
        user ? (
          <div className="mt-1 flex w-fit items-center gap-2 rounded-md bg-yellow-50 px-3 py-2 text-sm text-yellow-800 shadow-sm ring-1 ring-inset ring-yellow-600/20 md:w-fit">
            <Clock className="h-3.5 w-3.5 flex-shrink-0 md:h-4 md:w-4" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-xs font-medium md:text-xs">Pending Approval</span>
            </div>
          </div>
        ) : (
          <SignInButton
            className={cn('mt-1 w-full flex-1', signInClassname)}
            text={'Sign in for pricing'}
            variant={'soft'}
          />
        )
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
};

const ProductCard = ({ children, className, onClick }: ProductCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn('overflow-hidden rounded-[2px] border-gray-100 p-4 shadow-none', className)}
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
  const isTobacco = product?.is_tobacco;

  return (
    <div className="space-y-1">
      <div className="flex flex-col items-start gap-2 md:flex-row">
        <TobaccoBadge isTobacco={isTobacco} />
        <WithAuth
          disableAdmin
          rules={{
            customCheck: m => !m.approved_tobacco && isTobacco && m.role !== 'admin',
          }}
        >
          <Badge variant={'info'} className="rounded-sm text-[10px] font-medium">
            Needs Approval
          </Badge>
        </WithAuth>
        <WithAuth
          disableAdmin
          rules={{
            customCheck: m => !product?.is_tobacco && m.role !== 'admin',
          }}
        >
          <Badge variant={'info'} className="rounded-sm text-[10px] font-medium">
            <p className="max-w-[75px] overflow-hidden truncate md:max-w-[50px]">
              {product?.manufacturer}
            </p>
          </Badge>
        </WithAuth>
      </div>
      <p
        className={cn(
          'truncate',
          { 'text-sm': size === 'sm', 'text-base': size === 'md' },
          className
        )}
      >
        {product?.name} | {product?.manufacturer} | {product?.unit}
      </p>
    </div>
  );
};

ProductCard.Title = ProductTitle;

const ProductDescription = ({ product, className }: { product: Product; className?: string }) => {
  return (
    <p className={cn('text-sm text-gray-500', className)}>
      {truncate(product?.description as string)}
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
  const { metadata } = useUser();
  const hasValidDiscount = validateProductDiscount(product);

  const discount =
    metadata?.customer_type === 'wholesale'
      ? (product?.wholesale_discount ?? 0)
      : (product?.retail_discount ?? 0);

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
        ? `-${formatCurrency(discount ?? 0)} Off`
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
  object = 'contain',
}: {
  product: Product;
  className?: string;
  disableSaleBadge?: boolean;
  disableHoverEffect?: boolean;
  object?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}) => {
  const hasValidDiscount = validateProductDiscount(product);
  const getWishlistItemById = useWishlistStore(state => state.getWishlistItemById);
  const wishlistItem = getWishlistItemById(product?.id);

  return (
    <div className={cn('relative aspect-square h-full w-full', className)}>
      <div className="absolute inset-0">
        <Image
          alt={product?.name}
          src={(product && product?.images && product?.images[0]?.url) ?? PLACEHOLDER_IMG_URL}
          objectFit={object}
          className="p-4 mix-blend-multiply"
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
        <WithAuth rules={{ customCheck: metadata => !!metadata?.approved }}>
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 hover:opacity-100">
            <div className="flex items-center justify-center gap-1.5">
              {product?.in_stock && (
                <ProductAddToCartButton
                  product={product}
                  size={'icon'}
                  className={cn(
                    'group/cart h-9 w-9 rounded-full bg-white group-hover/cart:bg-primary',
                    {
                      'bg-destructive': !product?.in_stock,
                    }
                  )}
                >
                  <ShoppingCart
                    className={cn('h-5 w-5 text-black group-hover/cart:text-white', {
                      'text-white': !product?.in_stock,
                    })}
                  />
                </ProductAddToCartButton>
              )}
              <ProductWishlistButton
                product={product}
                size={'icon'}
                className={cn('group/wishlist rounded-full border-none bg-white hover:bg-primary', {
                  'bg-red-200': !!wishlistItem,
                })}
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
  return <PriceSection signInClassname={className} product={product} />;
};

ProductCard.Price = ProductPrice;

const ProductRemoveFromCartButton = ({
  children,
  product,
  ...props
}: ButtonProps & { children?: React.ReactNode; product: Product }) => {
  const { mutate: removeFromCart, isPending } = useRemoveFromCart();

  const handleRemoveFromCart = () => {
    removeFromCart(product?.id);
  };

  return (
    <WithAuth rules={{ customCheck: metadata => !!metadata?.approved }}>
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
      product_id: product?.id,
      quantity: 1,
    });
  };

  const cartItem = getCartItemById(product?.id);

  const defaultChildren = !product?.in_stock
    ? 'Out of Stock'
    : !!cartItem
      ? 'In Cart'
      : isPending
        ? 'Adding...'
        : 'Add to Cart';

  return (
    <WithAuth
      disableAdmin
      rules={{
        customCheck: metadata => {
          if (product?.is_tobacco) {
            return !!metadata?.approved && !!metadata?.approved_tobacco;
          } else {
            return !!metadata?.approved;
          }
        },
      }}
    >
      <Button
        className={cn('w-full', props.className)}
        variant={product?.in_stock ? undefined : 'destructive'}
        disabled={!product?.in_stock || isPending || !!cartItem}
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

const ProductAdminEditButton = ({
  product,
  children,
  ...props
}: ButtonProps & { product: Product; children?: React.ReactNode }) => {
  return (
    <WithAuth rules={{ requiredRole: 'admin' }}>
      <Link
        href={`/admin/products/${product?.id}`}
        onClick={e => e.stopPropagation()}
        target="_blank"
      >
        <Button className={cn('w-full', props.className)} variant={'soft'} {...props}>
          {children ?? 'Edit Product'}
        </Button>
      </Link>
    </WithAuth>
  );
};

ProductCard.AdminEditButton = ProductAdminEditButton;

const ProductWishlistButton = ({
  product,
  children,
  ...props
}: ButtonProps & { product: Product }) => {
  const { mutate: addToWishlist, isPending } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isPendingRemove } = useDeleteFromWishList();
  const getWishlistItemById = useWishlistStore(state => state.getWishlistItemById);

  const wishlistItem = getWishlistItemById(product?.id);

  const handleWishlist = () => {
    if (wishlistItem) {
      removeFromWishlist(product?.id);
    } else {
      addToWishlist(product?.id);
    }
  };

  return (
    <WithAuth
      disableAdmin
      rules={{
        customCheck: metadata => {
          if (product?.is_tobacco) {
            return !!metadata?.approved && !!metadata?.approved_tobacco;
          } else {
            return !!metadata?.approved;
          }
        },
      }}
    >
      <Button
        className={cn('border-none bg-theme-beige text-black', props.className, {
          'bg-red-200': !!wishlistItem,
        })}
        onClick={e => {
          e.stopPropagation();
          handleWishlist();
        }}
        disabled={isPending || isPendingRemove}
        size={'icon'}
        variant={'outline'}
        {...props}
      >
        {children ?? (
          <Heart
            className={cn('h-5 w-5 text-black group-hover/wishlist:text-white', {
              'fill-red-500 text-red-500': !!wishlistItem,
            })}
          />
        )}
      </Button>
    </WithAuth>
  );
};

ProductCard.WishlistButton = ProductWishlistButton;

const ProductQuickViewButton = ({
  product,
  children,
  ...props
}: ButtonProps & { product: Product }) => {
  const setProductAndOpen = useQuickViewStore(state => state.setProductAndOpen);
  const { metadata } = useUser();

  const handleQuickView = () => {
    setProductAndOpen(product);
  };

  const notApprovedTobacco = product?.is_tobacco && !metadata?.approved_tobacco;

  return (
    <Button
      className={cn(
        'border-none bg-theme-beige text-black',
        {
          'w-full': notApprovedTobacco && metadata.role !== 'admin',
        },
        props.className
      )}
      onClick={e => {
        e.stopPropagation();
        handleQuickView();
      }}
      size={notApprovedTobacco ? 'default' : 'icon'}
      variant={'outline'}
      {...props}
    >
      {notApprovedTobacco && metadata.role !== 'admin' ? (
        (children ?? <Eye className="h-5 w-5 text-black group-hover/quickview:text-white" />)
      ) : (
        <Eye className="h-5 w-5 text-black group-hover/quickview:text-white" />
      )}
    </Button>
  );
};

ProductCard.QuickViewButton = ProductQuickViewButton;

export default ProductCard;
