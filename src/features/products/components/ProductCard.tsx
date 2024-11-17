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
            'text-sm text-gray-500 line-through': isValidDiscount,
          })}
        >
          {formatCurrency(price)}
        </p>
        {isValidDiscount && discount && (
          <p className={cn('text-theme-primary')}>{formatCurrency(price - discount)}</p>
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

const ProductTitle = ({ product }: { product: Product }) => {
  return (
    <p className="truncate">
      {product.name} | {product.manufacturer} | {product.unit}
    </p>
  );
};

ProductCard.Title = ProductTitle;

const ProductDescription = ({ product }: { product: Product }) => {
  return <p className="text-sm text-gray-500">{product.description}</p>;
};

ProductCard.Description = ProductDescription;

const ProductSaleBadge = ({ product }: { product: Product }) => {
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  if (!hasValidDiscount) {
    return null;
  }

  return (
    <Badge variant={hasValidDiscount && 'success'} className="w-fit rounded-none">
      {hasValidDiscount ? 'Sale' : 'Discount'}
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
    <div className={cn('relative h-[70px] w-[70px]', className)}>
      {hasValidDiscount && disableSaleBadge !== true && (
        <Badge variant={'success'} className="rounded-none">
          Sale
        </Badge>
      )}
      <Image
        alt={product.name}
        src={product.images[0]?.url ?? PLACEHOLDER_IMG_URL}
        objectFit="cover"
        fill
      />
    </div>
  );
};

ProductCard.Image = ProductImage;

const ProductPrice = ({ product }: { product: Product }) => {
  const { metadata } = useUser();
  console.log(metadata);
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
