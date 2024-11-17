import { useQuery } from '@tanstack/react-query';

import { getCustomerById } from '@/features/customers/server/getCustomerById';
import { useUser } from '@/hooks/useUser';

export const useCurrentCustomer = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['customer', user?.id],
    queryFn: async () => {
      if (!user || !user.id) return null;

      return await getCustomerById(user?.id);
    },
    enabled: !!user?.id,
  });
};
