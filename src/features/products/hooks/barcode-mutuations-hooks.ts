import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteBarcode } from '../server/barcodes/deleteBarcode';

export const useDeleteBarcode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-barcode'],
    mutationFn: deleteBarcode,
    onSuccess: data => {
      if (data?.success) {
        toast.success('Barcode deleted!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
