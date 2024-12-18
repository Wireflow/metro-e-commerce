import { useQuery } from '@tanstack/react-query';

import { TopSellingProduct } from '../schemas/top-selling-product';
import { getTopSellingProducts } from '../server/getTopSellingProducts';

export const useTopSellingProducts = (limit: number, placeholderData?: TopSellingProduct[]) => {
  return useQuery({
    queryKey: ['top-selling-products', limit],
    queryFn: () => getTopSellingProducts({ limit }),
    placeholderData: placeholderData,
    staleTime: 1000 * 60 * 5,
  });
};
