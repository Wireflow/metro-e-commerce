import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { CreateAddressType } from '../../schemas/create-address';

export const useCreateAddress = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-address'],
    mutationFn: async (address: CreateAddressType) => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          ...address,
          customer_id: user?.id,
        })
        .single();

      if (error) {
        throw new Error('Failed to create address');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id ?? ''] });
    },
    onSuccess: () => {
      toast.success('Address added successfully');
    },
    onError: () => {
      toast.error('Failed to add address');
    },
  });
};
