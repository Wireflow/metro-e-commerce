'use client';

import {
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  ShoppingCart,
  Store,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import SignOutButton from '@/features/auth/components/SignOutButton';

import useCustomerTabs from '../store/useCustomerTabs';

export type CustomerTab =
  | 'dashboard'
  | 'history'
  | 'track'
  | 'cart'
  | 'wishlist'
  | 'cards-address'
  | 'settings';

const CustomerAccountSideBar = () => {
  const { setActiveTab, resetActiveTab } = useCustomerTabs();
  const pathName = usePathname();

  const tabs = [
    { label: 'Dashboard', href: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Order History', href: 'history', icon: <Store size={20} /> },
    { label: 'Track Order', href: 'track', icon: <MapPin size={20} /> },
    { label: 'Shopping Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
    { label: 'Wishlist', href: '/wishlist', icon: <Heart size={20} /> },
    { label: 'Cards & Address', href: 'cards-address', icon: <CreditCard size={20} /> },
    { label: 'Settings', href: 'settings', icon: <Settings size={20} /> },
  ];

  const extractCurrentTab = (path: string): CustomerTab | null => {
    const customerMatch = path.match(/^\/customer\/([^/]+)/);
    if (customerMatch) {
      return customerMatch[1] as CustomerTab;
    }

    const standaloneMatch = path.match(/^\/((track))/);
    if (standaloneMatch) {
      return standaloneMatch[1] as CustomerTab;
    }

    return null;
  };

  const currentTab = extractCurrentTab(pathName);

  useEffect(() => {
    if (currentTab) {
      setActiveTab(currentTab);
    } else {
      resetActiveTab();
    }
  }, [pathName, currentTab, setActiveTab, resetActiveTab]);

  return (
    <div className="md:sticky md:py-10">
      <div className="flex w-full flex-col items-start border py-5">
        <div className="w-full">
          {tabs.map((tab, index) => (
            <div key={`${index}-${tab}`} className="w-full">
              <Link
                className={`flex w-full items-center gap-5 px-5 py-3 text-sm md:w-80 ${
                  currentTab === tab.href
                    ? 'bg-primary text-white'
                    : 'text-neutral-500 hover:text-primary'
                }`}
                href={
                  tab.href === 'track' || tab.href === 'cart' || tab.href === 'wishlist'
                    ? `/${tab.href}`
                    : `/customer/${tab.href}`
                }
              >
                {tab.icon} {tab.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full">
          <SignOutButton
            variant={'none'}
            className="mt-2 flex items-center gap-5 px-5 py-3 text-sm text-neutral-500 shadow-none [&_svg]:size-6"
          >
            <LogOut size={25} className="h-10" /> Logout
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountSideBar;
