'use server';

import { format, subDays } from 'date-fns';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export type DateRange = {
  startDate?: string;
  endDate?: string;
};

export const getSalespersonSales = async ({ startDate, endDate }: DateRange = {}) => {
  try {
    const defaultEndDate = new Date();
    const defaultStartDate = subDays(defaultEndDate, 7);

    const formattedStartDate = startDate || format(defaultStartDate, 'yyyy-MM-dd');
    const formattedEndDate = endDate || format(defaultEndDate, 'yyyy-MM-dd');

    let query = supabase
      .from('wholesale_salesperson_branch_analytics')
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
      console.error('Error fetching saleperson Sales:', error);
      throw new Error('Failed to fetch salesperson sales data');
    }

    return data;
  } catch (error) {
    console.error('Error in getSalespersonSales:', error);
    throw new Error('Failed to fetch salesperson sales data');
  }
};