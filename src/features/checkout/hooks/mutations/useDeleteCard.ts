import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-card'],
    mutationFn: async (id: string) => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('payment_methods')
        .delete()
        .match({ id })
        .single();

      if (error) {
        throw new Error('Failed to delete card');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onSuccess: () => {
      toast.success('Card deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete card');
    },
  });
};
