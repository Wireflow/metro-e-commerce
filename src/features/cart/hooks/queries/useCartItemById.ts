import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

type Filters = {
  product_id?: string;
  cart_item_id?: string;
};

export const useCartItemById = (filters: Filters) => {
  return useQuery({
    queryKey: ['cart', 'item', JSON.stringify(filters)],
    queryFn: async () => {
      const supabase = createClient();

      if (!filters.product_id && !filters.cart_item_id) {
        throw new Error('No filters provided');
      }

      let query = supabase.from('cart_items').select('*');

      if (filters.product_id) {
        query = query.eq('product_id', filters.product_id);
      }

      if (filters.cart_item_id) {
        query = query.eq('id', filters.cart_item_id);
      }

      // Add user filter to ensure we only get the current user's cart items
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        query = query.eq('customer_id', user.id);
      }

      const { data, error } = await query.single();

      // If no rows found, return null instead of throwing
      if (error?.code === 'PGRST116') {
        return null;
      }

      // For any other errors, throw them
      if (error) {
        throw error;
      }

      return data;
    },
    retry: false,
    // Optionally add staleTime and cacheTime if needed
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
