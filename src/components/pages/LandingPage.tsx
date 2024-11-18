// LandingPage.tsx

import { HydrationBoundary } from '@tanstack/react-query';

import Actions from '../landing/Actions';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import FeaturedCategory from '../landing/featured-category/FeaturedCategory';
import HeroSection from '../landing/Hero/HeroSection';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = async () => {
  return (
    <HydrationBoundary>
      <Actions />
      <HeroSection />
      <FeaturedCategory />
      <ProductOptions />
      <SubscribeToNewsLetter />
    </HydrationBoundary>
  );
};

export default LandingPage;
