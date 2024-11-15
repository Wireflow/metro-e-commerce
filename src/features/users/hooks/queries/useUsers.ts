import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../../server/getUsers';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
