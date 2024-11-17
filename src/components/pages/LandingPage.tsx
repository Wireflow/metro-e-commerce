// LandingPage.tsx

import { HydrationBoundary } from '@tanstack/react-query';

import Actions from '../landing/Actions';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import Footer from '../landing/Footer/Footer';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = async () => {
  return (
    <HydrationBoundary>
      <Actions />
      <ProductOptions />
      <SubscribeToNewsLetter />
      <Footer />
    </HydrationBoundary>
  );
};

export default LandingPage;
