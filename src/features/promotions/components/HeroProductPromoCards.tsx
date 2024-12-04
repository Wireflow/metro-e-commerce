import { PromotedProduct } from '@/features/promotions/hooks/queries/usePromotedProducts';

import PromoCard from './PromoCard';

type Props = {
  promotions: PromotedProduct[];
};

const HeroProductPromoCards = ({ promotions }: Props) => {
  return (
    <>
      {promotions.map((promo, index) => (
        <PromoCard
          key={promo.id}
          promotedProduct={promo}
          product={promo?.product}
          label={promo?.label ? promo?.label : (promo?.product?.manufacturer ?? 'New Sales')}
          className="flex w-full justify-between gap-2"
          variant={index % 2 === 0 ? 'dark' : 'light'}
        >
          <div className="flex flex-col">
            <PromoCard.Label />
            <PromoCard.Title className="max-w-[150px] text-wrap text-xl" />
            <PromoCard.Action />
          </div>
          <PromoCard.Discount />
          <PromoCard.Image object="contain" />
        </PromoCard>
      ))}
    </>
  );
};

export default HeroProductPromoCards;
