import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-address'],
    mutationFn: async (id: string) => {
      const supabase = createClient();

      const { data, error } = await supabase.from('addresses').delete().match({ id }).single();

      if (error) {
        throw new Error('Failed to delete address');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onSuccess: () => {
      toast.success('Address deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete address');
    },
  });
};
