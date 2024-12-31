import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

import { UpdatePasswordType } from '../../schemas/create-user';

export const useUpdateSalesPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-password'],
    mutationFn: async (data: UpdatePasswordType) => {
      const supbase = createClient();
      const { data: updatedpassword, error } = await supbase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        throw new Error('Failed to update password');
      }

      return updatedpassword;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'sales-reps'] });
    },
    onSuccess: () => {
      toast.success('Sales rep password updated successfully');
    },
    onError: () => {
      toast.error('Failed to update sales rep password');
    },
  });
};
