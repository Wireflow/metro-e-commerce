import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { CartItem, useCartStore } from '../../store/useCartStore';

export const useCart = () => {
  const setCart = useCartStore(state => state.setCart);

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, product:products(*, images:product_images(*), barcodes:barcodes(*))')
        .returns<CartItem[]>();

      if (error) {
        throw new Error('Error fetching cart items');
      }
      if (!data) {
        throw new Error('No cart items found');
      }

      setCart(data);
      return data;
    },
  });
};
