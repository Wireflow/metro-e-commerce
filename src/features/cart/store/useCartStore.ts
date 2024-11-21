import { create } from 'zustand';

import { Row } from '@/types/supabase/table';

type CartState = {
  cart: Partial<Row<'cart_items'>>[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCart: (productId: string, quantity: number) => void;
  setCart: (cart: Row<'cart_items'>[]) => void;
  getCartItemById: (productId: string) => Partial<Row<'cart_items'>> | undefined;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (productId, quantity) => {
    const cart = get().cart;
    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem) {
      set({
        cart: cart.map(item => {
          if (item.product_id === productId) {
            return {
              ...item,
              quantity: (item?.quantity ?? 0) + quantity,
            };
          }

          return item;
        }),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            customer_id: '',
            product_id: productId,
            quantity,
          },
        ],
      });
    }
  },
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
}));
