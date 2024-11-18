import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

export const useUpdatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-promotion'],
    mutationFn: updatePromo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'promoted'] });
    },
    onSuccess: () => {
      toast.success('Promotion updated!');
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to update promotion!');
    },
  });
};

const updatePromo = async (newData: Update<'promoted_products'>) => {
  const supabase = createClient();

  if (!newData.id) {
    throw new Error('Promo is required');
  }

  const { data, error } = await supabase
    .from('promoted_products')
    .update(newData)
    .eq('id', newData.id);

  if (error) {
    throw error;
  }

  return data;
};
