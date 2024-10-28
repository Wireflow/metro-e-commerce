import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/utils/supabase/client';

type UserResponse = {
  user?: User | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isAuthenticated: boolean;
};

export const useUser = (): UserResponse => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await getUser();

      if (error) {
        throw error;
      }

      return user;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    user,
    isLoading,
    isError,
    error: error as Error | null,
    isAuthenticated: !!user,
  };
};
