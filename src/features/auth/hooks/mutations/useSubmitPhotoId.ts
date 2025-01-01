import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { updateCustomer } from '@/features/customers/server/updateCustomer';
import { getUser } from '@/utils/supabase/client';

import { PhotoIdType } from '../../schemas/photo-id';
import { uploadPhotoIdImage } from '../../server/uploadPhotoIdImage';

export const useSubmitPhotoId = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'submit-photo-id'],
    mutationFn: async (data: PhotoIdType) => {
      const {
        data: { user },
      } = await getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      if (!data.photo_id_image) {
        throw new Error('No image selected');
      }

      const image = await uploadPhotoIdImage(data.photo_id_image, user.id);

      if (!image.public_url) {
        throw new Error('Failed to upload photo id image');
      }

      const { success, data: updatedCustomer } = await updateCustomer({
        id: user.id,
        photo_id_image_url: image.public_url,
      });

      if (!success) {
        throw new Error('Failed to submit photo id');
      }

      return updatedCustomer;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Photo id submitted successfully');
      router.push('/');
    },
    onError: error => {
      toast.error(error.message ?? 'There was an error submitting your photo id');
    },
  });
};
