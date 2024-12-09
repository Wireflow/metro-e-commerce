'use server';

import { createClient } from '@/utils/supabase/server';

import { CustomPromotion } from '../schemas/custom-promotions';

export const getCustomPromos = async (promotionIds: number[]) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('custom_promotions')
    .select('*')
    .order('id', { ascending: true })
    .in('id', promotionIds);

  if (error) {
    throw error;
  }

  return data as unknown as CustomPromotion[];
};
