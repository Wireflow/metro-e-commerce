import { create } from 'zustand';

type CustomerPermissionsStoreState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useCustomrPermissionsStore = create<CustomerPermissionsStoreState>()(set => ({
  open: false,
  setOpen: open => set({ open }),
}));
