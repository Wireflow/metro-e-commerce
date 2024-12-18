import { create } from 'zustand';

import { Customer } from '../schemas/customer';

type CustomerPermissionsStoreState = {
  open: boolean;
  customer?: Customer;
  setOpen: (open: boolean) => void;
  setCustomer: (customer: Customer) => void;
  setCustomerAndOpen: (customer: Customer) => void;
};

export const useCustomrPermissionsStore = create<CustomerPermissionsStoreState>()(set => ({
  open: false,
  setOpen: open => set({ open }),
  customer: undefined,
  setCustomer: customer => set({ customer }),
  setCustomerAndOpen: customer => set({ customer, open: true }),
}));
