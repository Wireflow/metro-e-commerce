import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../../server/getUsers';

export const useSalesReps = () => {
  return useQuery({
    queryKey: ['users', 'sales-reps'],
    queryFn: () => getUsers(['independent_sales', 'sales']),
  });
};
