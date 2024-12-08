import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: async (data: Update<'categories'>) => {
      if (!data.id) {
        throw new Error('Category not selected!');
      }

      const { data: category, error } = await supabase
        .from('categories')
        .update({
          promoted: data.promoted,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error('Failed to update category');
      }

      return category;
    },
    onSuccess: () => {
      toast.success('Category changes saved!');
    },
    onError: error => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'promoted'] });
    },
  });
};
