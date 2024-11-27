'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

import SignOutButton from '@/features/auth/components/SignOutButton';

import useCustomerTabs from '../store/useCustomerTabs';

type Props = {};

const CustomerAccountSideBar = (props: Props) => {
  const { activeTab, setActiveTab } = useCustomerTabs();
  const pathName = usePathname();

  const tabs = [
    { label: 'Dashboard', href: 'dashboard', icon: <LayoutDashboard size={25} /> },
    { label: 'Order History', href: 'history', icon: <Store size={25} /> },
    { label: 'Track Order', href: '/track', icon: <MapPin size={25} /> },
    { label: 'Shopping Cart', href: '/cart', icon: <ShoppingCart size={25} /> },
    { label: 'Wishlist', href: '/wishlist', icon: <Heart size={25} /> },
    { label: 'Cards & Address', href: 'cards-address', icon: <CreditCard size={25} /> },
    { label: 'Settings', href: 'settings', icon: <Settings size={25} /> },
  ];

  const matchingHref = tabs.find(tab => pathName.includes(tab.href))?.href;

  return (
    <div>
      {' '}
      <div className="flex flex-col items-start border py-5">
        <div>
          {tabs.map((tab, index) => {
            return (
              <div key={index}>
                <Link
                  className={`text-md flex w-80 items-center gap-5 px-5 py-3 ${activeTab === tab.label || matchingHref === tab.href ? 'bg-primary text-white' : 'text-neutral-500 hover:text-primary'}`}
                  onClick={() => setActiveTab(tab.href)}
                  href={tab.href}
                >
                  {tab.icon} {tab.label}
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <SignOutButton
            variant={'none'}
            className="text-md mt-2 flex w-36 items-center gap-5 px-5 py-3 text-neutral-500 [&_svg]:size-6"
          >
            <LogOut size={55} className="h-10" /> Logout
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountSideBar;
