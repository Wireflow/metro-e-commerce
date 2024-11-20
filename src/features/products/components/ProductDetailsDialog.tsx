'use client';

import QuickDialog from '@/components/quick/Dialog';

import { useQuickViewStore } from '../store/useQuickViewStore';
import ProductInfo from './ProductInfo';

const ProductDetailsDialog = () => {
  const { product, open, setOpen, reset } = useQuickViewStore();

  if (!product) return null;

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      className="max-w-[1000px]"
      content={
        <div className="mt-2">
          <ProductInfo product={product} />
        </div>
      }
      onClose={() => {
        setTimeout(() => {
          reset();
        }, 300);
      }}
    />
  );
};

export default ProductDetailsDialog;
