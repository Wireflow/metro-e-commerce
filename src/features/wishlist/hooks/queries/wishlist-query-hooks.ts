import { useQuery } from '@tanstack/react-query';

import { Product } from '@/features/products/schemas/products';
import { createClient } from '@/utils/supabase/client';

import { useWishlistStore } from '../../store/useWishlistStore';

export const useWishList = () => {
  const setWishlist = useWishlistStore(state => state.setWishlist);

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const supabase = createClient();

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

      setWishlist(data);

      const products = data.map(item => item.product as Product);

      return {
        product: products.filter(Boolean),
      };
    },
  });
};
