import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/hooks/useUser';
import { createPaymentApi } from '@/utils/payments/makePaymentRequest';
import { createClient } from '@/utils/supabase/client';

import { CreateCardType } from '../../schemas/create-card';

export const useCreateCard = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-card'],
    mutationFn: async (cardData: CreateCardType) => {
      const supabase = createClient();
      const paymentApi = createPaymentApi();

      if (!user) {
        throw new Error('User not found');
      }

      const { data: billingAddress, error: billingAddressError } = await supabase
        .from('addresses')
        .select('*')
        .eq('type', 'billing')
        .eq('id', cardData.billing_address_id)
        .single();

      if (billingAddressError || !billingAddress) {
        throw new Error('Billing address not found');
      }

      const { data: card, error } = await paymentApi.tokenizeCard({
        cardholder: cardData.cardholder,
        number: cardData.number,
        expiration: cardData.expiration,
        cvc: cardData.cvc,
        avs_street: billingAddress.street,
        avs_postalcode: billingAddress.zip_code,
      });

      if (error || !card) {
        throw new Error(error ?? 'Failed to tokenize card');
      }

      const { data: paymentMethod, error: paymentMethodError } = await supabase
        .from('payment_methods')
        .insert({
          billing_address_id: cardData.billing_address_id ?? null,
          token: card.token ?? '',
          customer_id: user.id,
          card_holder: card?.holderName ?? cardData.cardholder,
          last_four: card?.maskedNumber?.slice(-4) ?? cardData.number.slice(-4),
          expiration: `${card.expiryMonth}/${card.expiryYear}`,
          provider: card.cardType ?? 'unknown',
        });

      if (paymentMethodError) {
        throw new Error('Failed to create card');
      }

      return paymentMethod;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onSuccess: () => {
      toast.success('Card added successfully');
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to add card');
    },
  });
};
