import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { updateCustomer } from '@/features/customers/server/updateCustomer';
import { getUser } from '@/utils/supabase/client';

import { TaxIdApproveType } from '../../schemas/tax-id-approve';
import { uploadPhotoIdImage } from '../../server/uploadPhotoIdImage';
import { uploadTaxIDImage } from '../../server/uploadTaxIDImage';

export const useSubmitTaxID = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'submit-tax-id', 'submit-photo-id'],
    mutationFn: async (data: TaxIdApproveType) => {
      const {
        data: { user },
      } = await getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      if (!data.tax_id_image) {
        throw new Error('No tax id image selected');
      }

      if (!data.photo_id_image) {
        throw new Error('No photo id image selected');
      }
      const image = await uploadTaxIDImage(data.tax_id_image, user.id);
      const photoIdImage = await uploadPhotoIdImage(data.photo_id_image, user.id);

      if (!photoIdImage.public_url) {
        throw new Error('Failed to upload Photo ID image');
      }

      if (!image.public_url) {
        throw new Error('Failed to upload Tax ID image');
      }

      const { success, data: updatedCustomer } = await updateCustomer({
        id: user.id,
        tax_id: data.tax_id,
        tax_id_image_url: image.public_url,
        photo_id_image_url: photoIdImage.public_url,
      });

      if (!success) {
        throw new Error('Failed to submit Tax ID and Photo ID');
      }

      return updatedCustomer;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Tax ID and Photo ID submitted successfully');
      router.push('/customers/approve/tobacco');
    },
    onError: error => {
      toast.error(error.message ?? 'There was an error submitting your Tax ID and Photo ID');
    },
  });
};
