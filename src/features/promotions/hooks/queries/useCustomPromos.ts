import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { CustomPromotion } from '../../schemas/custom-promotions';

export const useCustomPromos = (promotionIds: number[]) => {
  return useQuery({
    queryKey: ['custom-promotions', promotionIds],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('custom_promotions')
        .select('*')
        .in('id', promotionIds);

      if (error) {
        throw error;
      }

      return data as unknown as CustomPromotion[];
    },
  });
};
