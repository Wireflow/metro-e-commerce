import { create } from 'zustand';

import { Product } from '@/features/products/schemas/products';
import { Insert } from '@/types/supabase/table';

export type CartItem = Partial<Insert<'order_items'>>;

type CartState = {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getCartItem: (productId: string) => CartItem | null;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  setCart: cart => set({ cart }),
  addToCart: product => {
    const existingItem = get().cart.find(i => i.product_id === product.id);

    if (existingItem) {
      get().increaseQuantity(product.id);
      return;
    }

    const item: CartItem = {
      product_id: product.id,
      quantity: 1,
      unit_price: product.retail_price,
    };

    set(state => ({ cart: [...state.cart, item] }));
  },
  removeFromCart: productId =>
    set(state => ({
      cart: state.cart.filter(i => !(i.product_id === productId)),
    })),
  increaseQuantity: productId =>
    set(state => ({
      cart: state.cart.map(item =>
        item.product_id === productId ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
      ),
    })),
  decreaseQuantity: productId =>
    set(state => ({
      cart: state.cart
        .map(item =>
          item.product_id === productId
            ? { ...item, quantity: Math.max((item.quantity ?? 0) - 1, 0) }
            : item
        )
        .filter(item => (item.quantity ?? 0) > 0), // Remove item if quantity becomes 0
    })),
  getCartItem: productId => get().cart.find(item => item.product_id === productId) ?? null,
  getTotalPrice: () =>
    get().cart.reduce((acc, item) => acc + (item.unit_price ?? 0) * (item.quantity ?? 0), 0),
  getTotalQuantity: () => get().cart.reduce((acc, item) => acc + (item.quantity ?? 0), 0),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
