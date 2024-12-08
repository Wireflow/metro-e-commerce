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
          className="flex w-full flex-col justify-between gap-8 sm:flex-row"
          variant={index % 2 === 0 ? 'dark' : 'light'}
        >
          <div className="flex flex-col">
            <PromoCard.Label />
            <PromoCard.Title className="text-wrap text-xl" />
            <PromoCard.Action />
          </div>

          <div className="md:flex">
            {' '}
            <PromoCard.Discount />
            <PromoCard.Image object="contain" />
          </div>
        </PromoCard>
      ))}
    </>
  );
};

export default HeroProductPromoCards;
