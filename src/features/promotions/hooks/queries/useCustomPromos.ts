import { useQuery } from '@tanstack/react-query';

import { getCustomPromos } from '../../server/getCustomPromos';

export const useCustomPromos = (promotionIds: number[]) => {
  return useQuery({
    queryKey: ['custom-promotions', promotionIds],
    queryFn: () => getCustomPromos(promotionIds),
  });
};
