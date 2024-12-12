import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { CartItem, useCartStore } from '../../store/useCartStore';
import { useDefaultCart } from './useDefaultCart';

export const useCart = () => {
  const setCart = useCartStore(state => state.setCart);
  const { data: cartData, error: cartError } = useDefaultCart();

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const supabase = createClient();

      if (cartError) {
        throw new Error('Error fetching cart');
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data, error } = await supabase
        .from('cart_items')
        .select('*, product:products(*, images:product_images(*), barcodes:barcodes(*))')
        .order('created_at', { ascending: false })
        .eq('cart_id', cartData.id)
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
