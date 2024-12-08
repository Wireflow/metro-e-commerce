import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { CategoryWithProducts } from '../schemas/category';

export const usePromotedCategory = () => {
  return useQuery({
    queryKey: ['categories', 'promoted'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select(
          '*, products(*, images:product_images(*), barcodes:barcodes(barcode, id)), sub_categories:categories(id, name, image_url)'
        )
        .eq('promoted', true)
        .eq('products.published', true)
        .single();

      if (error) {
        throw new Error('Faild to fetch featured category');
      }
      if (!data) {
        throw new Error('No data returned from useFeaturedCategory');
      }
      return data as unknown as CategoryWithProducts;
    },
  });
};
