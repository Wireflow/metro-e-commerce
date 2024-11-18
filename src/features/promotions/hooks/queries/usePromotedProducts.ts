import { useQuery } from '@tanstack/react-query';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { Product } from '../../../products/schemas/products';

export type PromotedProduct = Row<'promoted_products'> & {
  product: Product;
};

export const usePromotedProducts = (promotionIds: number[]) => {
  return useQuery({
    queryKey: ['products', 'promoted', promotionIds],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('promoted_products')
        .select('*, product:products(*, images:product_images(*), barcodes:barcodes(*))')
        .in('id', promotionIds);

      if (error) {
        throw error;
      }

      return data as unknown as PromotedProduct[];
    },
  });
};
