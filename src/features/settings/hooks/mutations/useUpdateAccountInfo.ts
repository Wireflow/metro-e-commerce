import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { UpdateAccountType } from '../../schema/update-account';

export const useUpdateAccountInfo = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-account-info'],
    mutationFn: async (accountData: UpdateAccountType) => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('customers')
        .update({
          ...accountData,
        })
        .eq('id', user?.id)
        .single();

      if (error) {
        throw new Error('Failed to update account info');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Account info updated successfully');
    },
    onError: () => {
      toast.error('Failed to update account info');
    },
  });
};
