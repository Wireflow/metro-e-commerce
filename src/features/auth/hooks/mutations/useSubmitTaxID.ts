import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { updateCustomer } from '@/features/customers/server/updateCustomer';
import { getUser } from '@/utils/supabase/client';

import { TaxIdApproveType } from '../../schemas/tax-id-approve';
import { uploadTaxIDImage } from '../../server/uploadTaxIDImage';

export const useSubmitTaxID = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'submit-tax-id'],
    mutationFn: async (data: TaxIdApproveType) => {
      const {
        data: { user },
      } = await getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      if (!data.tax_id_image) {
        throw new Error('No image selected');
      }

      const image = await uploadTaxIDImage(data.tax_id_image, user.id);

      if (!image.public_url) {
        throw new Error('Failed to upload Tax ID image');
      }

      const { success, data: updatedCustomer } = await updateCustomer({
        id: user.id,
        tax_id: data.tax_id,
        tax_id_image_url: image.public_url,
      });

      if (!success) {
        throw new Error('Failed to submit Tax ID');
      }

      return updatedCustomer;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Tax ID submitted successfully');
      router.push('/customers/approve/tobacco');
    },
    onError: error => {
      toast.error(error.message ?? 'There was an error submitting your Tax ID');
    },
  });
};
