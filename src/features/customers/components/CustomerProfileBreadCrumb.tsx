'use client';

import { usePathname } from 'next/navigation';

import {
  CreditCard,
  Heart,
  LayoutDashboard,
  MapPin,
  Settings,
  ShoppingCart,
  Store,
} from 'lucide-react';
import { useEffect } from 'react';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';

import useCustomerTabs from '../store/useCustomerTabs';

type CustomerTab =
  | 'dashboard'
  | 'history'
  | 'track'
  | 'cart'
  | 'wishlist'
  | 'cards-address'
  | 'settings';

const CustomerProfileBreadCrumb = () => {
  const { setActiveTab, resetActiveTab } = useCustomerTabs();
  const path = usePathname();

  const tabs = [
    { label: 'Dashboard', href: 'dashboard', icon: <LayoutDashboard size={25} /> },
    { label: 'Order History', href: 'history', icon: <Store size={25} /> },
    { label: 'Track Order', href: 'track', icon: <MapPin size={25} /> },
    { label: 'Shopping Cart', href: 'cart', icon: <ShoppingCart size={25} /> },
    { label: 'Wishlist', href: 'wishlist', icon: <Heart size={25} /> },
    { label: 'Cards & Address', href: 'cards-address', icon: <CreditCard size={25} /> },
    { label: 'Settings', href: 'settings', icon: <Settings size={25} /> },
  ];

  const extractCurrentTab = (
    path: string
  ): { tab: CustomerTab | null; isOrderDetails: boolean } => {
    // Check if we're on an order details page (UUID after history)
    const uuidRegex =
      /^\/customer\/history\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(path)) {
      return { tab: 'history', isOrderDetails: true };
    }

    // Check for regular customer pages
    const customerMatch = path.match(/^\/customer\/([^/]+)/);
    if (customerMatch) {
      return { tab: customerMatch[1] as CustomerTab, isOrderDetails: false };
    }

    // Check for standalone pages
    const standaloneMatch = path.match(/^\/((track))/);
    if (standaloneMatch) {
      return { tab: standaloneMatch[1] as CustomerTab, isOrderDetails: false };
    }

    return { tab: null, isOrderDetails: false };
  };

  const { tab: currentTab, isOrderDetails } = extractCurrentTab(path);

  useEffect(() => {
    if (currentTab) {
      setActiveTab(currentTab);
    } else {
      resetActiveTab();
    }
  }, [path, currentTab, setActiveTab, resetActiveTab]);

  let breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Account', href: '/customer/dashboard' },
  ];

  if (isOrderDetails) {
    breadcrumbs = [
      ...breadcrumbs,
      { label: 'Order History', href: '/customer/history' },
      { label: 'Order', href: path },
    ];
  } else {
    const currentTabLabel = tabs.find(tab => tab.href === currentTab)?.label || 'Customer';
    breadcrumbs.push({ label: currentTabLabel, href: path });
  }

  return <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />;
};

export default CustomerProfileBreadCrumb;
