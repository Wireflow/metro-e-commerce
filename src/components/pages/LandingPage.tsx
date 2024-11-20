// LandingPage.tsx

import BestDeals from '@/features/products/components/BestDeals';
import ShopCategories from '@/features/products/components/sections/ShopCategories';
import DualPromotions from '@/features/promotions/components/DualPromotions';
import LargePromotion from '@/features/promotions/components/LargePromotion';

import Actions from '../landing/Actions';
import Benefits from '../landing/Benefits';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import FeaturedCategory from '../landing/featured-category/FeaturedCategory';
import HeroSection from '../landing/Hero/HeroSection';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = async () => {
  return (
    <div className="space-y-16">
      <Actions />
      <HeroSection />
      <Benefits />
      <BestDeals />
      <ShopCategories />
      <DualPromotions />
      <FeaturedCategory />
      <LargePromotion />
      <ProductOptions />
      <SubscribeToNewsLetter />
    </div>
  );
};

export default LandingPage;
