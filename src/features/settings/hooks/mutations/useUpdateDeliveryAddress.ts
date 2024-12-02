import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { UpdateAddressType } from '../../schema/update-delivery-address';

export const useUpdateDeliveryAddress = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-delivery-address'],
    mutationFn: async (address: UpdateAddressType) => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('addresses')
        .update({
          ...address,
          customer_id: user?.id,
        })
        .eq('type', 'delivery')
        .single();

      if (error) {
        throw new Error('Failed to update delivery address');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onSuccess: () => {
      toast.success('Delivery address updated successfully');
    },
    onError: () => {
      toast.error('Failed to update delivery address');
    },
  });
};
