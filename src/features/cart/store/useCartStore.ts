import { create } from 'zustand';

import { Product } from '@/features/products/schemas/products';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

export type CartItem = Row<'cart_items'> & {
  product: Product;
};

type CartState = {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCart: (productId: string, quantity: number) => void;
  setCart: (cart: CartItem[]) => void;
  getCartItemById: (productId: string) => CartItem | undefined;
  getTotalCartPrice: (customer_type: Enum<'customer_type'>) => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  removeFromCart: productId => {
    set({
      cart: get().cart.filter(item => item.product_id !== productId),
    });
  },

  clearCart: () => {
    set({
      cart: [],
    });
  },
  updateCart: (productId, quantity) => {
    set({
      cart: get().cart.map(item => {
        if (item.product_id === productId) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      }),
    });
  },
  setCart: cart => {
    set({
      cart,
    });
  },
  getCartItemById: productId => {
    return get().cart.find(item => item.product_id === productId);
  },
  getTotalCartPrice: customer_type => {
    const priceType = customer_type === 'wholesale' ? 'wholesale_price' : 'retail_price';

    return get().cart.reduce(
      (acc, item) => acc + (item.quantity ?? 0) * item.product[priceType],
      0
    );
  },
}));
