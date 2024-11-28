import { create } from 'zustand';

interface CustomerTabsState {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const useCustomerTabs = create<CustomerTabsState>(set => ({
  activeTab: '',
  setActiveTab: activeTab => set({ activeTab }),
}));

export default useCustomerTabs;
