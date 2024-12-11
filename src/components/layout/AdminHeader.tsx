'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';

import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { Skeleton } from '../ui/skeleton';

const AdminHeader = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <AdminHeaderSkeleton />;
  }

  const fullName = `${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`;
  const initials = fullName
    .split(' ')
    .map(word => word[0])
    .join('');

  return (
    <div className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-sidebar p-2 pr-3">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <Link href={'/?edit=true'}>
          <Button variant={'gradient'} className="mr-2 shadow-none" size="sm">
            Edit Website
            <Sparkles className="h-4 w-4" />
          </Button>
        </Link>
        <Avatar className="flex items-center justify-center bg-gray-200">
          <p className="text-sm">{initials}</p>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{fullName}</span>
          <span className="truncate text-xs capitalize">{user?.user_metadata?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

const AdminHeaderSkeleton = () => {
  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-2">
      <SidebarTrigger />
      <div className="flex h-full items-center gap-2">
        <div className="grid flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-3 w-32" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};
