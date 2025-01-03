import { v4 as uuidv4 } from 'uuid';

import { useAddToCart } from '@/features/cart/hooks/mutations/useAddToCart';
import { useRemoveFromCart } from '@/features/cart/hooks/mutations/useRemoveFromCart';
import { useAddToWishlist } from '@/features/wishlist/hooks/mutations/useAddToWishlist';
import { useDeleteFromWishList } from '@/features/wishlist/hooks/mutations/useDeleteFromWishlist';

import { Product } from '../schemas/products';
import { useQuickViewStore } from '../store/useQuickViewStore';

export const useProductActions = (product: Product) => {
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: removeFromCart, isPending: isRemovingFromCart } = useRemoveFromCart();
  const { mutate: addToWishlist, isPending: isAddingToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } = useDeleteFromWishList();
  const setQuickView = useQuickViewStore(state => state.setProductAndOpen);

  return {
    cart: {
      add: () => addToCart({ product_id: product.id, quantity: 1, id: uuidv4() }),
      remove: () => removeFromCart(product.id),
      isLoading: isAddingToCart || isRemovingFromCart,
    },
    wishlist: {
      add: () => addToWishlist(product.id),
      remove: () => removeFromWishlist(product.id),
      isLoading: isAddingToWishlist || isRemovingFromWishlist,
    },
    quickView: {
      open: () => setQuickView(product),
    },
  };
};
