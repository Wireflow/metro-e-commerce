'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ISOStringFormat } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { createContext, useContext } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { Product } from '@/features/products/schemas/products';
import { isDiscountValid } from '@/features/products/utils/validateDiscount';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/utils';

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
  variant?: 'dark' | 'light';
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

const PromoCard = ({ product, variant = 'light', children, label, className }: PromoCardProps) => {
  const isDark = variant === 'dark';

  return (
    <PromoCardContext.Provider value={{ product, variant, label }}>
      <Card
        className={cn(
          `relative p-6 shadow-none ${isDark ? 'bg-theme-primary text-white' : 'border border-gray-200 bg-white'}`,
          className
        )}
      >
        {children}
      </Card>
    </PromoCardContext.Provider>
  );
};

const PromoLabel = () => {
  const { variant, label } = usePromoCard();
  const isDark = variant === 'dark';

  return label ? (
    <span className={`font-medium ${isDark ? 'text-yellow-400' : 'text-primary'}`}>{label}</span>
  ) : null;
};

PromoCard.Label = PromoLabel;

const PromoTitle = () => {
  const { product } = usePromoCard();

  return (
    <div className="flex flex-grow items-start justify-between">
      <div>
        <h2 className="mt-1 truncate text-2xl font-bold">{product?.name}</h2>
      </div>
    </div>
  );
};

PromoCard.Title = PromoTitle;

const PromoAction = () => {
  const { product } = usePromoCard();

  return (
    <Link href={`/products/${product?.id}`}>
      <Button className="mt-4 flex items-center gap-2">
        SHOP NOW
        <ChevronRight size={20} />
      </Button>
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
    <span className="absolute right-4 top-4 rounded bg-yellow-400 px-3 py-1 font-medium text-black">
      {`${formatCurrency(product?.discount ?? 0)} OFF`}
    </span>
  ) : null;
};

PromoCard.Discount = PromoDiscount;

const PromoImage = ({ className }: { className?: string }) => {
  const { product } = usePromoCard();

  return product?.images && product?.images.length > 0 ? (
    <div className={cn('relative mb-4 h-[110px] w-[200px]', className)}>
      <Image
        src={product?.images[0].url ?? PLACEHOLDER_IMG_URL}
        alt={product?.name || 'Placeholder Image'}
        fill
        objectFit="cover"
        className="h-auto w-full rounded object-cover"
      />
    </div>
  ) : null;
};

PromoCard.Image = PromoImage;

export default PromoCard;
