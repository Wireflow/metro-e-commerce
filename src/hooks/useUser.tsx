import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { UserMetadata } from '@/features/auth/components/WithAuth';
import { getUser } from '@/utils/supabase/client';

type UserResponse = {
  user?: User | null;
  isLoading: boolean;
  isError: boolean;
  metadata: UserMetadata;
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
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    user,
    metadata: (user?.user_metadata as UserMetadata) ?? {},
    isLoading,
    isError,
    error: error as Error | null,
    isAuthenticated: !!user,
  };
};
