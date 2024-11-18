import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { Product } from '../../schemas/products';

export const useDiscountedProducts = (limit: number) => {
  return useQuery({
    queryKey: ['products', 'discounted', limit],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('discounted_products')
        .select('*, images:product_images(*), barcodes:barcodes(*)')
        .eq('published', true)
        .order('discount', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data as unknown as Product[];
    },
  });
};
