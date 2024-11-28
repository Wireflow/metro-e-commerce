import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CustomerTab =
  | 'dashboard'
  | 'history'
  | 'track'
  | 'cart'
  | 'wishlist'
  | 'cards-address'
  | 'settings';

interface CustomerTabsState {
  activeTab: CustomerTab | null;
  setActiveTab: (tab: CustomerTab) => void;
  resetActiveTab: () => void;
}

const useCustomerTabs = create<CustomerTabsState>()(
  persist(
    set => ({
      activeTab: null, // start with no active tab
      setActiveTab: tab => set({ activeTab: tab }),
      resetActiveTab: () => set({ activeTab: null }), // method to reset active tab
    }),
    {
      name: 'customer-tabs-storage',
      partialize: state => ({ activeTab: state.activeTab }),
    }
  )
);

export default useCustomerTabs;
