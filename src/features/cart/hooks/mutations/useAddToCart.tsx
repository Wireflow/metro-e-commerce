import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import ProductToast from '@/components/toasts/ProductToast';
import { useDeleteFromWishList } from '@/features/wishlist/hooks/mutations/useDeleteFromWishlist';
import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { CartItem } from '../../store/useCartStore';
import { useDefaultCart } from '../queries/useDefaultCart';

export const useAddToCart = () => {
  const { mutateAsync: removeFromWishlist } = useDeleteFromWishList({ disableToast: true });
  const { data: cartData, error: cartError } = useDefaultCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart', 'add'],
    mutationFn: async (item: Pick<Row<'cart_items'>, 'product_id' | 'quantity' | 'id'>) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      let isNewItem: boolean = false;

      if (cartError) {
        throw new Error('Error fetching cart');
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data: cartItem, error: cartItemError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .match({ product_id: item.product_id, customer_id: user?.id, cart_id: cartData.id })
        .single();

      if (cartItemError && cartItemError?.code !== 'PGRST116') {
        throw new Error('Failed to find product in cart');
      }

      if (cartItem) {
        const { data, error } = await supabase
          .from('cart_items')
          .update({
            quantity: 1 + (cartItem?.quantity ?? 0),
          })
          .eq('id', cartItem.id)
          .select('*')
          .single();

        if (error) {
          throw new Error(error.message ?? 'Failed to update product in cart');
        }

        return { data, isNewItem };
      }

      const newId = uuidv4();

      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          id: item.id ?? newId,
          product_id: item.product_id,
          customer_id: user?.id,
          quantity: item.quantity ?? 1,
          cart_id: cartData.id,
        })
        .select('*, product:products(*, images:product_images(*), barcodes:barcodes(id, barcode))')
        .single();

      if (error) {
        throw new Error(error.message ?? 'Failed to add product to cart');
      }

      removeFromWishlist(item.product_id);

      isNewItem = true;

      return { data: data as unknown as CartItem, isNewItem };
    },
    onMutate: async newItem => {
      // Cancel any outgoing refetches to avoid optimistic update being overwritten
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']) ?? [];

      // Find if the item already exists in the cart
      const existingItemIndex = previousCart.findIndex(
        cartItem => cartItem.product_id === newItem.product_id
      );

      // Create new cart data
      const updatedCart = [...previousCart];

      if (existingItemIndex !== -1) {
        // Update existing item
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity ?? 0) + (newItem.quantity ?? 1),
        };
      } else {
        // Add new item
        updatedCart.push({
          ...newItem,
          quantity: newItem.quantity ?? 1,
          product: {}, // You might want to add product details if available
          created_at: new Date().toISOString(),
          id: newItem.id, // Temporary ID for new items
        } as CartItem);
      }

      // Optimistically update the cache
      queryClient.setQueryData(['cart'], updatedCart);

      return { previousCart };
    },
    onSuccess: result => {
      const data = result.data as unknown as CartItem;
      if (data?.product) {
        toast.custom(
          () => {
            return <ProductToast variant="success" product={data.product!} />;
          },
          {
            duration: 3000,
            className: 'bg-white rounded-lg shadow-lg px-4 pt-4 pb-0 w-full',
          }
        );
      }
    },
    onError: (error, item, context) => {
      // Revert to the previous state if there was an error
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      toast.error(error.message ?? 'Failed to add product to cart');
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache is in sync
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'summary'] });
    },
  });
};
