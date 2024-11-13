'use server';

import { format, subDays } from 'date-fns';

import { createClient } from '@/utils/supabase/server';

import { DailyAnalytics } from '../schemas/daily-analytics';

const supabase = createClient();

export type DateRange = {
  startDate?: string;
  endDate?: string;
};

export const getDailyAnalytics = async ({ startDate, endDate }: DateRange = {}) => {
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

    const totalRevenue = data.reduce((acc, day) => acc + (day.revenue ? day?.revenue : 0), 0);

    const totalProductsSold = data.reduce(
      (acc, day) => acc + (day.total_products_sold ? day?.total_products_sold : 0),
      0
    );
    const totalCogsSold = data.reduce((acc, day) => acc + (day.cogs ? day?.cogs : 0), 0);

    const totalNewCustomers = data.reduce(
      (acc, day) => acc + (day.new_customers ? day?.new_customers : 0),
      0
    );

    const transformedData: DailyAnalytics = {
      cogs: totalCogsSold,
      branch_id: data[0]?.branch_id,
      order_date: data[0]?.order_date,
      revenue: totalRevenue,
      total_products_sold: totalProductsSold,
      new_customers: totalNewCustomers,
    };

    return transformedData;
  } catch (error) {
    console.error('Error in getDailyAnalytics:', error);
    throw new Error('Failed to fetch analytics data');
  }
};
