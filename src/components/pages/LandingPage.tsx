'use client';
// LandingPage.tsx

import { useCart } from '@/features/cart/hooks/queries/useCart';
import BestDeals from '@/features/products/components/BestDeals';
import ShopCategories from '@/features/products/components/sections/ShopCategories';
import DualPromotions from '@/features/promotions/components/DualPromotions';
import LargePromotion from '@/features/promotions/components/LargePromotion';
import { useWishList } from '@/features/wishlist/hooks/queries/wishlist-query-hooks';

import Benefits from '../landing/Benefits';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import FeaturedCategory from '../landing/featured-category/FeaturedCategory';
import FeaturedProducts from '../landing/featured-products/FeaturedProducts';
import HeroSection from '../landing/Hero/HeroSection';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = () => {
  useCart();
  useWishList();

  return (
    <div className="md:space-y-4">
      <HeroSection />
      <Benefits />
      <BestDeals />
      <ShopCategories />
      <FeaturedProducts />
      <DualPromotions />
      <FeaturedCategory />
      <LargePromotion />
      <ProductOptions />
      <SubscribeToNewsLetter />
    </div>
  );
};

export default LandingPage;
