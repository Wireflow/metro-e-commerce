import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getProductByBarcode } from '../../server/products/getProductByBarcode';
import { useQuickViewStore } from '../../store/useQuickViewStore';

export const useProductByBarcode = (sku: string | null) => {
  const setQuickViewProduct = useQuickViewStore(state => state.setProductAndOpen);
  return useQuery({
    queryKey: ['products', sku],
    queryFn: async () => {
      const product = await getProductByBarcode(sku);

      if (!product) {
        toast.error('Product not found');
        return null;
      }

      setQuickViewProduct(product);

      return product;
    },
    enabled: !!sku,
    retry: false,
  });
};
