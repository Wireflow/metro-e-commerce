import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { EditCustomPromoType } from '../../schemas/custom-promotions';
import { SupabaseImage, uploadPromotionImage } from './useUploadPromotionImage';

export const useUpdateCustomPromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-custom-promotion'],
    mutationFn: updateCustomPromo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-promotions'] });
    },
  });
};

const updateCustomPromo = async (newData: EditCustomPromoType) => {
  const supabase = createClient();

  const { image: newImage, ...promotion } = newData;

  let image: SupabaseImage | null = null;

  if (!newData.id) {
    throw new Error('CustomPromo is required');
  }

  if (newImage) {
    image = await uploadPromotionImage(newImage);
  }

  const imageData = {
    image_path: image?.image_path ?? null,
    image_url: image?.public_url ?? null,
  };

  const { data, error } = await supabase
    .from('custom_promotions')
    .update({
      ...promotion,
      ...(image && { ...imageData }),
    })
    .eq('id', newData.id);

  if (error) {
    throw error;
  }

  return data;
};
