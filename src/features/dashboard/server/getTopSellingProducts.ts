'use server';

import { format, subDays } from 'date-fns';

import { createClient } from '@/utils/supabase/server';

import { TopSellingProduct } from '../schemas/top-selling-product';
import { DateRange } from './getDailyAnalytics';

const supabase = createClient();

export const getTopSellingProducts = async ({ startDate, endDate }: DateRange = {}) => {
  // Default to last 7 days if no dates provided
  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 7);

  const formattedStartDate = startDate || format(defaultStartDate, 'yyyy-MM-dd');
  const formattedEndDate = endDate || format(defaultEndDate, 'yyyy-MM-dd');

  let query = supabase
    .from('product_sales_analytics')
    .select('*, product:product_id(*, images:product_images(*))')
    .order('sales', { ascending: false });

  if (startDate && endDate) {
    query = query.gte('order_date', formattedStartDate).lte('order_date', formattedEndDate);
  }

  if (startDate && !endDate) {
    query = query.gte('order_date', formattedStartDate);
  }

  if (!startDate && endDate) {
    query = query.lte('order_date', formattedEndDate);
  }

  const { data, error } = await query.returns<TopSellingProduct[]>().limit(5);

  if (error) {
    console.error('Error fetching top selling products:', error);
    throw new Error('Failed to fetch top selling products');
  }

  return data;
};
