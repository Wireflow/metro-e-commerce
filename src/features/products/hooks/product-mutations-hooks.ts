/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteProductImage } from '../server/images/deleteProductImage';
import { updateProduct } from '../server/products/updateProduct';

export const usePublishProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['publish-product'],
    mutationFn: async (isPublished: boolean) => {
      //@ts-ignore
      return await updateProduct({ id: productId, general_info: { published: isPublished } });
    },
    onSuccess: (data, isPublished) => {
      if (data?.success) {
        if (isPublished) {
          toast.success('Product published!');
        } else {
          toast.warning('Product unpublished!');
        }
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProductImage = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-product-image'],
    mutationFn: async (imageId: string) => {
      return await deleteProductImage(imageId);
    },
    onSuccess: data => {
      if (data?.success) {
        toast.success('Product image deleted!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
    },
  });
};

export const useProductToggleStock = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['publish-product'],
    mutationFn: async (isInStock: boolean) => {
      //@ts-ignore
      return await updateProduct({ id: productId, general_info: { in_stock: isInStock } });
    },
    onSuccess: data => {
      if (data?.success) {
        toast.success('Product updated!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
