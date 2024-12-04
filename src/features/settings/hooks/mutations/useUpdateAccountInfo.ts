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

      if (accountData.email) {
        const { error: emailUpdateError } = await supabase.auth.updateUser({
          email: accountData.email,
        });

        if (emailUpdateError?.code === 'email_exists') {
          throw new Error('email_exists');
        }

        if (emailUpdateError) {
          throw new Error(`Failed to update email: ${emailUpdateError.message}`);
        }
      }

      const { data, error } = await supabase
        .from('customers')
        .update({
          first_name: accountData.first_name,
          last_name: accountData.last_name,
          phone: accountData.phone,
          email: accountData.email,
        })
        .eq('id', user.id)
        .single();

      if (error) {
        throw new Error(`Failed to update account info: ${error.message}`);
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Account info updated successfully');
    },
    onError: error => {
      if (error.message === 'email_exists') {
        toast.error('This email is already in use');
      } else {
        toast.error('Failed to update account info');
      }
      console.error(error);
    },
  });
};
