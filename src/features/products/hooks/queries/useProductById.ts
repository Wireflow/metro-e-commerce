import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../../server/products/getProductById';

export const useProductById = (productId: string) => {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};
