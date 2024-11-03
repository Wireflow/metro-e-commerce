'use server';

import { format, subDays } from 'date-fns';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export type DateRange = {
  startDate?: string;
  endDate?: string;
};

export const getSales = async ({ startDate, endDate }: DateRange = {}) => {
  try {
    // Default to last 7 days if no dates provided
    const defaultEndDate = new Date();
    const defaultStartDate = subDays(defaultEndDate, 7);

    const formattedStartDate = startDate || format(defaultStartDate, 'yyyy-MM-dd');
    const formattedEndDate = endDate || format(defaultEndDate, 'yyyy-MM-dd');

    let query = supabase
      .from('daily_branch_analytics')
      .select('*')
      .order('order_date', { ascending: true });

    if (startDate && endDate) {
      query = query.gte('order_date', formattedStartDate).lte('order_date', formattedEndDate);
    }

    if (startDate && !endDate) {
      query = query.gte('order_date', formattedStartDate);
    }

    if (!startDate && endDate) {
      query = query.lte('order_date', formattedEndDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching analytics:', error);
      throw new Error('Failed to fetch analytics data');
    }

    return data;
  } catch (error) {
    console.error('Error in getDailyAnalytics:', error);
    throw new Error('Failed to fetch analytics data');
  }
};
