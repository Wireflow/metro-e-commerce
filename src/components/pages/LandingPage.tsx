// LandingPage.tsx

import { HydrationBoundary } from '@tanstack/react-query';

import BestDeals from '@/features/products/components/BestDeals';
import ShopCategories from '@/features/products/components/ShopCategories';

import Actions from '../landing/Actions';
import Benefits from '../landing/Benefits';
import HeroSection from '../landing/Hero/HeroSection';

const LandingPage = async () => {
  return (
    <HydrationBoundary>
      <Actions />
      <HeroSection />
      <Benefits />
      <BestDeals />
      <ShopCategories />
      {/* <FeaturedCategory />
      <ProductOptions />
      <SubscribeToNewsLetter /> */}
    </HydrationBoundary>
  );
};

export default LandingPage;
