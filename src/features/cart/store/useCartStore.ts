import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/features/products/schemas/products';
import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { useUser } from '@/hooks/useUser';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

export type CartItem = Row<'cart_items'> & {
  product: Product;
};

type CartState = {
  cart: CartItem[];
  orderType?: Enum<'order_type'>;
  setOrderType: (orderType?: Enum<'order_type'>) => void;
  notes: string;
  setNotes: (notes: string) => void;
  paymentOption: Enum<'payment_type'>;
  setPaymentOption: (paymentOption: Enum<'payment_type'>) => void;
  setPaymentMethodId: (paymentMethodId: string) => void;
  paymentMethodId?: string;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCart: (productId: string, quantity: number) => void;
  setCart: (cart: CartItem[]) => void;
  getCartItemById: (productId: string) => CartItem | undefined;
  getTotalCartPrice: (customer_type: Enum<'customer_type'>) => number;
  getCartTotals: (
    customer_type: Enum<'customer_type'>,
    branch: Row<'branch_settings'>
  ) => {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
  };
  getCartItemTotals: (
    cartItemId: string,
    customerType: Enum<'customer_type'>
  ) => {
    subtotal: number;
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      orderType: 'pickup',
      notes: '',
      paymentMethodId: '',
      setPaymentMethodId: paymentMethodId => {
        set({
          paymentMethodId,
        });
      },
      setNotes: notes => {
        set({
          notes,
        });
      },
      paymentOption: 'online',
      setPaymentOption: paymentOption => {
        set({
          paymentOption,
        });
      },
      setOrderType: orderType => {
        set({
          orderType,
        });
      },
      removeFromCart: productId => {
        set({
          cart: get().cart.filter(item => item.product_id !== productId),
        });
      },
      clearCart: () => {
        set({
          cart: [],
          paymentMethodId: '',
          paymentOption: 'online',
          orderType: 'pickup',
          notes: '',
        });
      },
      getCartItemTotals: (cartItemId, customer_type) => {
        const cartItem = get().cart.find(item => item.id === cartItemId);

        if (!cartItem) {
          return {
            subtotal: 0,
          };
        }

        const price =
          customer_type === 'wholesale'
            ? (cartItem.product?.wholesale_price ?? 0)
            : (cartItem.product?.retail_price ?? 0);

        if (!price) {
          return {
            subtotal: 0,
          };
        }

        return {
          subtotal: cartItem.quantity * price,
        };
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
      getCartTotals: (customer_type, settings) => {
        const orderType = get().orderType;
        const taxRate = settings?.tax_percentage / 100;
        const priceType = customer_type === 'wholesale' ? 'wholesale_price' : 'retail_price';

        const subtotal = get().cart.reduce(
          (acc, item) => acc + (item.quantity ?? 0) * item.product[priceType],
          0
        );

        const taxableProducts = get().cart.filter(item => item.product.is_taxed);
        const taxableTotal = taxableProducts.reduce(
          (acc, item) => acc + (item.quantity ?? 0) * item.product[priceType],
          0
        );

        const tax = taxableTotal * taxRate;
        const shipping = orderType === 'pickup' ? 0 : 0;
        const discount = 0;

        const total = subtotal + shipping + discount + tax;

        return {
          subtotal,
          shipping,
          discount,
          tax,
          total,
        };
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
    }),
    {
      name: 'cart-storage',
      partialize: state => ({
        cart: state.cart,
        orderType: state.orderType,
        notes: state.notes,
        paymentOption: state.paymentOption,
      }),
    }
  )
);

export const useCartTotals = () => {
  const { getCartTotals } = useCartStore();
  const { metadata } = useUser();
  const { data: settings } = useBranchSettings();

  return getCartTotals(metadata?.customer_type, settings!);
};
