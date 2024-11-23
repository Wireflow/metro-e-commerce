import { create } from 'zustand';

import { Row } from '@/types/supabase/table';

type WishlistState = {
  wishlist: Partial<Row<'wishlist_items'>>[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  setWishlist: (wishlist: Row<'wishlist_items'>[]) => void;
  getWishlistItemById: (productId: string) => Partial<Row<'wishlist_items'>> | undefined;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  addToWishlist: productId => {
    const wishlist = get().wishlist;
    const existingItem = wishlist.find(item => item.product_id === productId);

    if (existingItem) {
      set({
        wishlist: wishlist.map(item => {
          if (item.product_id === productId) {
            return {
              ...item,
            };
          }

          return item;
        }),
      });
    } else {
      set({
        wishlist: [
          ...wishlist,
          {
            customer_id: '',
            product_id: productId,
          },
        ],
      });
    }
  },
  removeFromWishlist: productId => {
    set({
      wishlist: get().wishlist.filter(item => item.product_id !== productId),
    });
  },
  clearWishlist: () => {
    set({
      wishlist: [],
    });
  },
  setWishlist: wishlist => {
    set({
      wishlist,
    });
  },
  getWishlistItemById: productId => {
    return get().wishlist.find(item => item.product_id === productId);
  },
}));
