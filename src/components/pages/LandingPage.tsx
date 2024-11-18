// LandingPage.tsx

import { HydrationBoundary } from '@tanstack/react-query';

import BestDeals from '@/features/products/components/BestDeals';

import Actions from '../landing/Actions';
import Benefits from '../landing/Benefits';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import HeroSection from '../landing/Hero/HeroSection';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = async () => {
  return (
    <HydrationBoundary>
      <Actions />
      <HeroSection />
      <Benefits />
      <BestDeals />
      <ProductOptions />
      <SubscribeToNewsLetter />
    </HydrationBoundary>
  );
};

export default LandingPage;
