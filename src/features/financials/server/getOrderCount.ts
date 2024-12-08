'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export const getOrdersCount = async ({ startDate, endDate }: DateRange = {}) => {
  try {
    // Default to last 7 days if no dates provided
    // const defaultEndDate = new Date().toISOString();
    // const defaultStartDate = subDays(defaultEndDate, 7).toISOString();

    const formattedStartDate = startDate?.toISOString();
    const formattedEndDate = endDate?.toISOString();

    let query = supabase.from('orders').select('created_at', { count: 'exact' });

    if (startDate && endDate) {
      query = query.gte('created_at', formattedStartDate).lte('created_at', formattedEndDate);
    }

    if (startDate && !endDate) {
      query = query.gte('created_at', formattedStartDate);
    }

    if (!startDate && endDate) {
      query = query.lte('created_at', formattedEndDate);
    }

    const { error, count } = await query;

    if (error) {
      console.error('Error fetching order count:', error);
      throw new Error('Failed to fetch orders count');
    }

    return count;
  } catch (error) {
    console.error('Error in getOrderCount:', error);
    throw new Error('Failed to fetch orders data');
  }
};
