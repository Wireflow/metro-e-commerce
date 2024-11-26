import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCustomer } from '@/features/customers/server/updateCustomer';
import { getUser } from '@/utils/supabase/client';

import { TobaccoLicenseType } from '../../schemas/tobacco-approve';
import { uploadTobaccoLicenseImage } from '../../server/uploadTobaccoLicenseImage';

export const useSubmitTobaccoLicense = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'submit-tobacco-license'],
    mutationFn: async (data: TobaccoLicenseType) => {
      const {
        data: { user },
      } = await getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      if (!data.image) {
        throw new Error('No image selected');
      }

      const image = await uploadTobaccoLicenseImage(data.image, user.id);

      if (!image.public_url) {
        throw new Error('Failed to upload tobacco license image');
      }

      const { success, data: updatedCustomer } = await updateCustomer({
        id: user.id,
        tobacco_license: data.licenseNumber,
        tobacco_license_image_url: image.public_url,
      });

      if (!success) {
        throw new Error('Failed to submit tobacco license');
      }

      return updatedCustomer;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: () => {
      toast.success('Tobacco license submitted successfully');
      router.push('/');
    },
    onError: error => {
      toast.error(error.message ?? 'There was an error submitting your tobacco license');
    },
  });
};
