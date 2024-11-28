import { useQuery } from '@tanstack/react-query';

import { ViewRow } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

interface SummaryItem {
  product_id: string;
  product_name: string;
  quantity: number;
  original_unit_price: number;
  unit_price: number;
  line_total: number;
  is_taxed: boolean;
  tax_amount: number;
  is_discounted: boolean;
  discount_amount: number;
  discount_valid_until: string; // ISO 8601 date string
}

type Summary = ViewRow<'customer_cart_summary'> & {
  cart_items: SummaryItem[];
};

export const useCartSummary = () => {
  return useQuery({
    queryKey: ['cart', 'summary'],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        throw new Error('No session found');
      }

      const { data, error } = await supabase
        .from('customer_cart_summary')
        .select('*')
        .eq('customer_id', session?.user?.id)
        .returns<Summary[]>();

      if (error) {
        throw new Error('Error fetching cart summary');
      }

      if (!data) {
        throw new Error('No cart summary found');
      }

      return data[0];
    },
  });
};
