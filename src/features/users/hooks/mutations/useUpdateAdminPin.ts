import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export type UpdateAdminPin = {
  pin: string;
  branch_id: string;
};

export const useUpdateAdminPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-admin-pin'],
    mutationFn: async (data: UpdateAdminPin) => {
      const supbase = createClient();
      const { data: updatedpassword, error } = await supbase
        .from('users')
        .update({
          admin_pin: data.pin,
        })
        .eq('role', 'admin')
        .eq('branch_id', data.branch_id);
      if (error) {
        throw new Error('Failed to update admin pin');
      }

      return updatedpassword;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'admin'] });
    },
    onSuccess: () => {
      toast.success('Successfully updated admin pin');
    },
    onError: () => {
      toast.error('Failed to update admin pin');
    },
  });
};
