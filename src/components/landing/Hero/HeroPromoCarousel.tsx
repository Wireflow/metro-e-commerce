import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { mockCustomPromotion } from '@/features/promotions/constants/custom-promotion-fallback';
import { useCustomPromos } from '@/features/promotions/hooks/queries/useCustomPromos';

import HeroCard from './HeroCard';

type Props = {};

const HeroPromoCarousel = (props: Props) => {
  const { data: customPromos, isLoading: isLoadingCustomPromos } = useCustomPromos([1, 2, 3]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  if (isLoadingCustomPromos) {
    return (
      <Container className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <Skeleton className="h-[340px] w-full min-w-[250px] flex-1" />
        <div className="flex w-full flex-col gap-4 xl:w-96">
          <Skeleton className="h-[162px] w-full" />
          <Skeleton className="h-[162px] w-full" />
        </div>
      </Container>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          <CarouselItem className="pl-2 md:pl-4">
            <HeroCard
              promotion={
                customPromos && customPromos.length > 0 ? customPromos[0] : mockCustomPromotion
              }
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">
            <HeroCard
              promotion={
                customPromos && customPromos.length > 0 ? customPromos[1] : mockCustomPromotion
              }
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">
            <HeroCard
              promotion={
                customPromos && customPromos.length > 0 ? customPromos[2] : mockCustomPromotion
              }
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center space-x-2">
        {[...Array(count)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${current === index ? 'bg-primary' : 'bg-neutral-500'} `}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroPromoCarousel;
