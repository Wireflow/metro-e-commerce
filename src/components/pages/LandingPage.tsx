// LandingPage.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { METRO_BRANCH_ID } from '@/data/constants';
import { getCategories } from '@/features/products/server/categories/getCategories';
import getQueryClient from '@/lib/react-query';
import { getBranchById } from '@/server/branches/getBranchById';

import Actions from '../landing/Actions';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import Footer from '../landing/footer/Footer';
import ProductSearchBar from '../landing/ProductSearchBar';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';

const LandingPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['branch', METRO_BRANCH_ID],
    queryFn: async () => {
      const { data: branch, error } = await getBranchById(METRO_BRANCH_ID);

      if (error) {
        throw error;
      }

      return branch;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PromoBanner />
      <SocialsBanner />
      <ProductSearchBar />
      <Actions />
      <ProductOptions />
      <SubscribeToNewsLetter />
      <Footer />
    </HydrationBoundary>
  );
};

export default LandingPage;
