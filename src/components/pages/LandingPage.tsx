// LandingPage.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { METRO_BRANCH_ID } from '@/data/constants';
import getQueryClient from '@/lib/react-query';
import { getBranchById } from '@/server/branches/getBranchById';

import ProductSearchBar from '../landing/ProductSearchBar';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PromoBanner />
      <SocialsBanner />
      <ProductSearchBar />
    </HydrationBoundary>
  );
};

export default LandingPage;