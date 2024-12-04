import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { ChangePasswordType } from '../../schema/change-password';

export const useChangePassword = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (password: ChangePasswordType) => {
      if (password.new_password !== password.confirm_password) {
        throw new Error('New passwords do not match');
      }

      if (!user) {
        throw new Error('User not found');
      }

      const supabase = createClient();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email || '',
        password: password.old_password,
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      const { data, error } = await supabase.auth.updateUser({
        password: password.new_password,
      });

      if (error) {
        throw new Error('Failed to change password');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to change password');
    },
  });
};
