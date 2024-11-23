import { useQuery } from '@tanstack/react-query';

import { Product } from '@/features/products/schemas/products';
import { createClient, getSession } from '@/utils/supabase/client';

export const useWishList = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const supabase = createClient();
      const session = await getSession();

      // Changed from .single() to get all wishlist items
      const { data, error } = await supabase.from('wishlist_items').select(
        `
          *,
          product:products (
            *,
            images:product_images(*),
            barcodes:barcodes(*)
          )
        `
      );

      if (error) {
        throw new Error('Error getting wishlist: ' + error.message);
      }

      if (!data) {
        return { product: [] };
      }

      // Map the data to get an array of products
      const products = data.map(item => item.product as Product);

      return {
        product: products.filter(Boolean), // Remove any null values
      };
    },
  });
};
