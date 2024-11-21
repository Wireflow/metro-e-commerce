import { create } from 'zustand';

import { Product } from '../schemas/products';

type QuickViewState = {
  product?: Product;
  setProduct: (product: Product) => void;
  setProductAndOpen: (product: Product) => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  reset: () => void;
};

export const useQuickViewStore = create<QuickViewState>(set => ({
  product: undefined,
  setProduct: product => set(() => ({ product })),
  open: false,
  setOpen: open => set(() => ({ open })),
  reset: () => set(() => ({ product: undefined, open: false })),
  setProductAndOpen: product => set(() => ({ product, open: true })),
}));
