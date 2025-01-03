'use client';

import { AlertCircle, CheckCircle, CircleX, ClockAlert, PhoneCall, Pin } from 'lucide-react';
import Link from 'next/link';

import { useBranch } from '@/hooks/queries/useMetro';
import { cn } from '@/lib/utils';
import { formatPhoneNumber } from '@/utils/utils';

import Container from '../layout/Container';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import CategoryMenu from './CategoryMenu';

const Actions = () => {
  const { branch, isLoading } = useBranch();
  const formattedPhone = formatPhoneNumber(branch?.phone);

  return (
    <Container className="space-y-3 lg:space-y-0">
      <div className="block w-full lg:hidden">
        {isLoading ? (
          <Skeleton className="h-10 w-full rounded-none border-none" />
        ) : (
          <Button
            className={cn(
              'h-10 w-full rounded-full px-2 capitalize text-gray-500 hover:text-black md:px-4',
              branch?.branch_settings?.status === 'open' && 'bg-green-500/10 text-green-600',
              branch?.branch_settings?.status === 'closed' && 'bg-red-500/10 text-red-600',
              branch?.branch_settings?.status === 'busy' && 'bg-yellow-500/10 text-yellow-600'
            )}
            variant="ghost"
          >
            {branch?.branch_settings?.status === 'open' ? (
              <CheckCircle className="h-5 w-5" />
            ) : branch?.branch_settings?.status === 'closed' ? (
              <CircleX className="h-5 w-5" />
            ) : (
              <ClockAlert className="h-5 w-5" />
            )}
            {branch?.branch_settings?.status === 'open'
              ? 'We’re open'
              : branch?.branch_settings?.status === 'closed'
                ? 'We’re closed'
                : 'Rush hour'}
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 md:gap-4 md:px-0">
        <div className="flex w-full items-center justify-between gap-2 md:justify-start md:gap-4">
          <CategoryMenu />

          <div className="flex gap-4">
            <Link href="/track">
              <Button className="h-12 px-2 text-gray-500 hover:text-black md:px-4" variant="ghost">
                <Pin className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Track Order</span>
              </Button>
            </Link>

            <Link href={'/FAQ'}>
              <Button className="h-12 px-2 text-gray-500 hover:text-black md:px-4" variant="ghost">
                <AlertCircle className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Need Help</span>
              </Button>
            </Link>
            <div className="hidden lg:block">
              {isLoading ? (
                <Skeleton className="h-10 w-32 rounded-none border-none" />
              ) : (
                <Button
                  className={cn(
                    'h-10 w-full rounded-full px-2 capitalize text-gray-500 hover:text-black md:px-4',
                    branch?.branch_settings?.status === 'open' && 'bg-green-500/10 text-green-600',
                    branch?.branch_settings?.status === 'closed' && 'bg-red-500/10 text-red-600',
                    branch?.branch_settings?.status === 'busy' && 'bg-yellow-500/10 text-yellow-600'
                  )}
                  variant="ghost"
                >
                  {branch?.branch_settings?.status === 'open' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : branch?.branch_settings?.status === 'closed' ? (
                    <CircleX className="h-5 w-5" />
                  ) : (
                    <ClockAlert className="h-5 w-5" />
                  )}
                  {branch?.branch_settings?.status === 'open'
                    ? 'We’re open'
                    : branch?.branch_settings?.status === 'closed'
                      ? 'We’re closed'
                      : 'Rush hour'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex md:min-w-[200px]">
          <Link href={`tel:+1${formattedPhone}`} className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            <p className="hidden text-base font-semibold md:block">+1 {formattedPhone}</p>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Actions;
