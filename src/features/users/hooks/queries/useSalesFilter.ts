import { useQuery } from '@tanstack/react-query';

import { Enum } from '@/types/supabase/enum';
import { createClient } from '@/utils/supabase/client';

export type IndependentSalesProps = {
  searchQuery?: string;
  enabled?: boolean;
  roles?: Enum<'user_role'>[];
};

export const useSalesFilter = (filters: IndependentSalesProps = {}) => {
  return useQuery({
    queryKey: ['users', 'sales-reps', filters.searchQuery],
    queryFn: () => getUsers(filters),
    enabled: filters.enabled,
  });
};

export const getUsers = async (filters: IndependentSalesProps) => {
  const supabase = createClient();

  let query = supabase.from('users').select('*');

  if (filters.roles && filters.roles.length > 0) {
    query = query.in('role', filters.roles);
  }

  if (filters.searchQuery && filters.searchQuery.length > 0) {
    const searchFields = ['first_name', 'last_name', 'phone', 'email'];

    const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.searchQuery}%`);
    query = query.or(searchConditions.join(','));
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Failed to find independent sales users');
  }

  return data;
};
