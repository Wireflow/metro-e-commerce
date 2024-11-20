import { create } from 'zustand';

type CartStore = {
  cartItems: Record<string, number>; // productId -> quantity
  setCartItems: (items: Record<string, number>) => void;
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartStore>(set => ({
  cartItems: {},
  setCartItems: items => set({ cartItems: items }),
  addItem: (productId, quantity) =>
    set(state => ({
      cartItems: { ...state.cartItems, [productId]: quantity },
    })),
  removeItem: productId =>
    set(state => {
      const { [productId]: _, ...rest } = state.cartItems;
      return { cartItems: rest };
    }),
}));
