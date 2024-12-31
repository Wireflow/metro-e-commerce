'use client';

import { endOfMonth, startOfMonth } from 'date-fns';
import {
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import * as React from 'react';

import { NavMain } from '@/components/layout/NavMain';
import { NavUser } from '@/components/layout/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useBranch } from '@/hooks/queries/useMetro';
import { useUser } from '@/hooks/useUser';

import AnimatedDiv from '../animation/AnimatedDiv';
import SidebarSkeleton from '../skeletons/SidebarSkeleton';
import { BranchDisplay } from './BranchDisplay';

// Updated navigation structure
const navigationGroups = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Inventory',
    items: [
      {
        title: 'Products',
        url: '/admin/products/all',
        icon: Package,
        items: [
          {
            title: 'All Products',
            url: '/admin/products/all',
          },
          {
            title: 'Add Product',
            url: '/admin/products/add',
          },
        ],
      },
      {
        title: 'Categories',
        url: '/admin/categories/all',
        icon: FolderTree,
        items: [
          {
            title: 'All Categories',
            url: '/admin/categories/all',
          },
          {
            title: 'Add Category',
            url: '/admin/categories/add',
          },
        ],
      },
    ],
  },
  {
    label: 'Financials',
    items: [
      {
        title: 'Sales',
        url: '/sales',
        icon: ShoppingCart,
        items: [
          {
            title: 'Orders',
            url: '/admin/orders/all',
          },
          {
            title: 'Financials',
            url: `/admin/financials?from=${startOfMonth(new Date()).toLocaleDateString()}&to=${endOfMonth(new Date()).toLocaleDateString()}`,
          },
        ],
      },
      {
        title: 'Customers',
        url: '/admin/customers',
        icon: Users,
      },
    ],
  },
  {
    label: 'Store',
    items: [
      {
        title: 'Preferences',
        url: '/admin/store',
        icon: Store,
        items: [
          {
            title: 'Order Controls',
            url: '/admin/controls/orders',
          },
          {
            title: 'Website Controls',
            url: '/admin/controls/website',
          },
          {
            title: 'Sales Reps',
            url: '/admin/users/sales',
          },
        ],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        title: 'Business Settings',
        url: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();
  const { branch, isLoading: isBranchLoading } = useBranch();

  if (isLoading || isBranchLoading) {
    return <SidebarSkeleton />;
  }

  if (!user || !branch) {
    redirect('/');
  }

  return (
    <AnimatedDiv>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <BranchDisplay branch={branch} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain groups={navigationGroups} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </AnimatedDiv>
  );
}
