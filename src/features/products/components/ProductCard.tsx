'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ISOStringFormat } from 'date-fns';
import { Eye, Heart } from 'lucide-react';
import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button, ButtonProps } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import SignInButton from '@/features/auth/components/SignInButton';
import WithAuth, { UserMetadata } from '@/features/auth/components/WithAuth';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';
import { formatCurrency } from '@/utils/utils';

import { Product } from '../schemas/products';
import { isDiscountValid } from '../utils/validateDiscount';

type ProductCardProps = {
  children?: ReactNode[];
  className?: string;
  onClick?: () => void;
};

const PriceSection = ({
  type,
  price,
  label,
  isValidDiscount,
  discount,
}: {
  type: Enum<'customer_type'>;
  price: number;
  label?: string;
  isValidDiscount: boolean;
  discount: number | null;
}) => (
  <WithAuth
    rules={{
      customCheck: (metadata: UserMetadata) => metadata?.customer_type === type,
    }}
    fallback={<SignInButton />}
  >
    <div>
      {label && <p className="text-xs">{label}</p>}
      <div className="flex items-center gap-2">
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
      </div>
    </div>
  </WithAuth>
);

const ProductCard = ({ children, className, onClick }: ProductCardProps) => {
  return (
    <Card onClick={onClick} className={cn('rounded-[2px] p-4 shadow-none', className)}>
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
        'truncate text-wrap',
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
  return <p className={cn('text-sm text-gray-500', className)}>{product.description}</p>;
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
}: {
  product: Product;
  className?: string;
  disableSaleBadge?: boolean;
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

      <div className="absolute left-0 top-0 z-10 flex w-full justify-between">
        {hasValidDiscount && disableSaleBadge !== true && (
          <Badge variant="yellow" className="rounded-none">
            Sale
          </Badge>
        )}
        {product.in_stock === false && (
          <Badge variant="error" className="ml-auto rounded-none">
            Out of Stock
          </Badge>
        )}
      </div>
    </div>
  );
};

ProductCard.Image = ProductImage;

const ProductPrice = ({ product }: { product: Product }) => {
  const { metadata } = useUser();
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return (
    <div className="flex gap-4">
      <PriceSection
        isValidDiscount={hasValidDiscount}
        discount={product?.discount}
        type={metadata?.customer_type}
        price={
          metadata?.customer_type === 'wholesale' ? product.wholesale_price : product.retail_price
        }
      />
    </div>
  );
};

ProductCard.Price = ProductPrice;

const ProductAddToCartButton = ({ product, ...props }: ButtonProps & { product: Product }) => {
  const handleAddToCart = () => {
    // TODO: Add to cart logic
    console.log('add to cart');
  };

  return (
    <Button className={cn('w-full', props.className)} onClick={handleAddToCart} {...props}>
      Add to Cart
    </Button>
  );
};

ProductCard.AddToCartButton = ProductAddToCartButton;

const ProductWishlistButton = ({ product, ...props }: ButtonProps & { product: Product }) => {
  const handleWishlist = () => {
    // TODO: Add to wishlist logic
    console.log('add to wishlist');
  };

  return (
    <div>
      <Button
        className={cn('border-none bg-theme-beige text-black', props.className)}
        onClick={handleWishlist}
        size={'icon'}
        variant={'outline'}
        {...props}
      >
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  );
};

ProductCard.WishlistButton = ProductWishlistButton;

const ProductQuickViewButton = ({ product, ...props }: ButtonProps & { product: Product }) => {
  const handleQuickView = () => {
    // TODO: Add to quick view logic
    console.log('quick view');
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Button
        className={cn('border-none bg-theme-beige text-black', props.className)}
        onClick={handleQuickView}
        size={'icon'}
        variant={'outline'}
        {...props}
      >
        <Eye className="h-5 w-5" />
      </Button>
    </Link>
  );
};

ProductCard.QuickViewButton = ProductQuickViewButton;

export default ProductCard;
