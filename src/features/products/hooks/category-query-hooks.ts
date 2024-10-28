import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../server/categories/getCategories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
