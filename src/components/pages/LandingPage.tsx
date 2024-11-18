// LandingPage.tsx

import BestDeals from '@/features/products/components/BestDeals';

import Actions from '../landing/Actions';
import Benefits from '../landing/Benefits';
import HeroSection from '../landing/Hero/HeroSection';

const LandingPage = async () => {
  return (
    <div>
      <Actions />
      <HeroSection />
      <Benefits />
      <BestDeals />
    </div>
  );
};

export default LandingPage;
