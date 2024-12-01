import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { CreateCardType } from '../../schemas/create-card';

export const useCreateCard = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-card'],
    mutationFn: async (cardData: CreateCardType) => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      // const card = await usaepay.token.tokenizeCard({
      //   cardholder: cardData.cardholder,
      //   number: cardData.number,
      //   expiration: cardData.expiration,
      //   cvc: cardData.cvc,
      // });

      //   // TODO: Add card to card to USAePAY API

      //   const { data, error } = await supabase
      //     .from('payment_methods')
      //     .insert({
      //       ...card,
      //       customer_id: user?.id,
      //     })
      //     .single();

      //   if (error) {
      //     throw new Error('Failed to create card');
      //   }

      //   return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', user?.id ?? ''] });
    },
    onSuccess: () => {
      toast.success('Card added successfully');
    },
    onError: () => {
      toast.error('Failed to add card');
    },
  });
};
