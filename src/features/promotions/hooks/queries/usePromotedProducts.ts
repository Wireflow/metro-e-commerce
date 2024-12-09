import { useQuery } from '@tanstack/react-query';

import { Row } from '@/types/supabase/table';

import { Product } from '../../../products/schemas/products';
import { getPromotedProducts } from '../../server/getPromotedProducts';

export type PromotedProduct = Row<'promoted_products'> & {
  product: Product;
};

export const usePromotedProducts = (promotionIds: number[]) => {
  return useQuery({
    queryKey: ['products', 'promoted', promotionIds],
    queryFn: () => getPromotedProducts(promotionIds),
  });
};
