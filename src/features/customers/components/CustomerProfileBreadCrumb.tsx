'use client';
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  MapPin,
  Settings,
  ShoppingCart,
  Store,
} from 'lucide-react';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';

import useCustomerTabs from '../store/useCustomerTabs';

type Props = {};

const CustomerProfileBreadCrumb = (props: Props) => {
  const { activeTab } = useCustomerTabs();
  const tabs = [
    { label: 'Dashboard', href: 'dashboard', icon: <LayoutDashboard size={25} /> },
    { label: 'Order History', href: 'history', icon: <Store size={25} /> },
    { label: 'Track Order', href: 'track', icon: <MapPin size={25} /> },
    { label: 'Shopping Cart', href: 'cart', icon: <ShoppingCart size={25} /> },
    { label: 'Wishlist', href: 'wishlist', icon: <Heart size={25} /> },
    { label: 'Cards & Address', href: 'cards-address', icon: <CreditCard size={25} /> },
    { label: 'Settings', href: 'settings', icon: <Settings size={25} /> },
  ];
  const activeTabHref = tabs.find(tab => tab.label === activeTab)?.href;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: `${activeTab}`, href: `${activeTabHref}` },
  ];
  return <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />;
};

export default CustomerProfileBreadCrumb;
