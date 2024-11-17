import { useQuery } from '@tanstack/react-query';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { Product } from '../../schemas/products';

type PromotedProduct = Row<'promoted_products'> & {
  product: Product;
};

export const usePromotedProductById = (promotedProductId: number) => {
  return useQuery({
    queryKey: ['products', 'promoted', promotedProductId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('promoted_products')
        .select('*, product:products(*, images:product_images(*), barcodes:barcodes(*))')
        .eq('id', promotedProductId)
        .returns<PromotedProduct>()
        .single();

      console.log(data);
      console.log(error);

      if (error) {
        throw error;
      }

      return data;
    },
    refetchOnWindowFocus: true,
  });
};
