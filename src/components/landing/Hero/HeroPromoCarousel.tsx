import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';

import Container from '@/components/layout/Container';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { mockCustomPromotion } from '@/features/promotions/constants/custom-promotion-fallback';
import { useCustomPromos } from '@/features/promotions/hooks/queries/useCustomPromos';

import HeroCard from './HeroCard';

const HeroPromoCarousel = () => {
  const { data: customPromos, isLoading: isLoadingCustomPromos } = useCustomPromos([1, 2, 3]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: emblaRoot => emblaRoot.parentElement,
    })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off('select', () => {});
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      plugin.current.reset();
    }
  };

  if (isLoadingCustomPromos) {
    return (
      <Container className="flex h-full w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <Skeleton className="h-full min-h-[400px] w-full min-w-[250px] flex-1" />
      </Container>
    );
  }

  return (
    <div className="relative h-full">
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center space-x-2">
        {[...Array(count)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              index === current ? 'bg-primary shadow-md' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Carousel
        opts={{
          loop: true,
          watchDrag: true,
        }}
        plugins={[plugin.current]}
        setApi={setApi}
        className="h-full w-full"
      >
        <CarouselContent className="h-full" wrapperClassName="h-full">
          {customPromos?.map((promo, index) => (
            <CarouselItem key={promo.id || index} className="h-full pl-2 md:pl-4">
              <HeroCard promotion={promo || mockCustomPromotion} />
            </CarouselItem>
          )) || (
            <>
              {[...Array(3)].map((_, index) => (
                <CarouselItem key={index} className="h-full pl-2 md:pl-4">
                  <HeroCard promotion={mockCustomPromotion} />
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroPromoCarousel;
