'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ISOStringFormat } from 'date-fns';
import { ChevronRight, Edit } from 'lucide-react';
import { createContext, useContext } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import WithAuth from '@/features/auth/components/WithAuth';
import { PriceSection } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { isDiscountValid } from '@/features/products/utils/validateDiscount';
import { PromotedProduct } from '@/features/promotions/hooks/queries/usePromotedProducts';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/utils';

import { useIsEditMode } from '../hooks/useIsEditMode';
import EditPromoForm from './forms/EditPromoForm';

interface PromoCardContextType {
  product: Product;
  label?: string;
  variant: 'dark' | 'light';
}

const PromoCardContext = createContext<PromoCardContextType | undefined>(undefined);

const usePromoCard = () => {
  const context = useContext(PromoCardContext);
  if (!context) {
    throw new Error('Promo Card components must be used within a PromoCard');
  }
  return context;
};

interface PromoCardProps {
  product: Product;
  promotedProduct?: PromotedProduct;
  variant?: 'dark' | 'light';
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

const PromoCard = ({
  product,
  variant = 'light',
  children,
  label,
  className,
  promotedProduct,
}: PromoCardProps) => {
  const isInEditMode = useIsEditMode();

  const isDark = variant === 'dark';

  return (
    <PromoCardContext.Provider value={{ product, variant, label }}>
      <Card
        className={cn(
          'relative overflow-hidden p-6 shadow-none',
          isDark ? 'bg-theme-primary text-white' : 'border border-gray-200 bg-white',
          className
        )}
      >
        {children}

        {isInEditMode && (
          <WithAuth rules={{ requiredRole: 'admin' }}>
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 transition-opacity">
              <EditPromoForm
                promotedProduct={promotedProduct}
                trigger={
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-fit gap-2"
                    onClick={() => {
                      // Handle edit action
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Promo
                  </Button>
                }
              />
            </div>
          </WithAuth>
        )}
      </Card>
    </PromoCardContext.Provider>
  );
};

const PromoLabel = () => {
  const { variant, label } = usePromoCard();
  const isDark = variant === 'dark';

  return label ? (
    <span className={`font-medium uppercase ${isDark ? 'text-yellow-400' : 'text-primary'}`}>
      {label}
    </span>
  ) : null;
};

PromoCard.Label = PromoLabel;

const PromoTitle = ({ className }: { className?: string }) => {
  const { product } = usePromoCard();

  return (
    <h2
      className={cn(
        'mt-1 block max-w-[100%] truncate text-2xl font-bold', // Remove flex, make it block
        className
      )}
    >
      {product?.name}
    </h2>
  );
};

PromoCard.Title = PromoTitle;

const PromoPrice = ({
  className,
  prefix,
  suffix,
}: {
  className?: string;
  prefix?: string;
  suffix?: string;
}) => {
  const { product } = usePromoCard();
  const { metadata } = useUser();
  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return (
    <div className={cn('flex gap-1', className)}>
      {prefix && <span className="font-medium text-black">{prefix}</span>}
      <PriceSection
        disableCompare
        isValidDiscount={hasValidDiscount}
        discount={product?.discount}
        type={metadata?.customer_type}
        price={
          metadata?.customer_type === 'wholesale' ? product.wholesale_price : product.retail_price
        }
      />
      {suffix && <span className="font-medium text-black">{suffix}</span>}
    </div>
  );
};

PromoCard.Price = PromoPrice;

const PromoDescription = ({ className }: { className?: string }) => {
  const { product } = usePromoCard();

  return (
    <p
      className={cn(
        'mt-1 flex flex-grow items-start justify-between text-wrap text-sm text-gray-500',
        className
      )}
    >
      {product?.description}
    </p>
  );
};

PromoCard.Description = PromoDescription;

const PromoAction = ({ className }: { className?: string }) => {
  const { product } = usePromoCard();

  return (
    <Link
      href={`/products/${product?.id}`}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'mt-4 flex w-fit items-center gap-2',
        className
      )}
    >
      SHOP NOW
      <ChevronRight size={20} />
    </Link>
  );
};

PromoCard.Action = PromoAction;

const PromoDiscount = () => {
  const { product } = usePromoCard();

  if (!product?.discounted_until) return null;

  const hasValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return hasValidDiscount ? (
    <span className="absolute right-4 top-4 z-20 rounded bg-yellow-400 px-3 py-1 font-medium text-black">
      {`${formatCurrency(product?.discount ?? 0)} OFF`}
    </span>
  ) : null;
};

PromoCard.Discount = PromoDiscount;

const PromoImage = ({
  className,
  object = 'cover',
}: {
  className?: string;
  object?: 'cover' | 'contain';
}) => {
  const { product } = usePromoCard();

  return product?.images && product?.images.length > 0 ? (
    <div className={cn('relative z-10 mb-4 h-[150px] w-[200px]', className)}>
      <Image
        src={product?.images[0].url ?? PLACEHOLDER_IMG_URL}
        alt={product?.name || 'Placeholder Image'}
        fill
        objectFit={object}
        className={cn('h-auto p-4 mix-blend-multiply')}
        style={{
          maskImage: 'linear-gradient(to bottom, black, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
        }}
      />
    </div>
  ) : null;
};

PromoCard.Image = PromoImage;

export default PromoCard;
