'use client';

import { AlertCircle, CheckCircle, PhoneCall, Pin, X } from 'lucide-react';
import Link from 'next/link';

import { useBranchSettings } from '@/features/store/server/useBranchSettings';
import { useBranch } from '@/hooks/queries/useMetro';
import { cn } from '@/lib/utils';
import { formatPhoneNumber } from '@/utils/utils';

import Container from '../layout/Container';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import CategoryMenu from './CategoryMenu';

const Actions = () => {
  const { branch } = useBranch();
  const formattedPhone = formatPhoneNumber(branch?.phone);
  const { data: branchSettings, isLoading } = useBranchSettings();

  const BranchStatusBanner = ({ status }: { status: string }) => {
    const statusConfig = {
      busy: {
        title: "We're currently experiencing a high volume of orders!",
        variant: 'warning',
      },
      closed: {
        title: "We're currently closed!",
        variant: 'destructive',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    if (!config) return null;

    return (
      <>
        <div className={`h-10 w-full border-b border-gray-400 bg-theme-secondary`}>
          <Alert
            variant={config.variant as 'success' | 'destructive' | 'warning'}
            className="flex items-center justify-center gap-2 rounded-none border-none text-center"
          >
            <span className="font-semibold">{config.title}</span>
          </Alert>
        </div>
      </>
    );
  };

  // if (isLoading) {
  //   return (
  //     <div className="w-20">
  //       <Skeleton className="h-10 w-fit rounded-none border-none" />
  //     </div>
  //   );
  // }
  return (
    <Container>
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
            <div>
              {isLoading ? (
                <Skeleton className="h-10 w-32 rounded-none border-none" />
              ) : (
                <Button
                  className={cn(
                    'h-10 rounded-full px-2 capitalize text-gray-500 hover:text-black md:px-4',
                    branchSettings?.status === 'open' && 'bg-green-500/10 text-green-600',
                    branchSettings?.status === 'closed' && 'bg-red-500/10 text-red-600',
                    branchSettings?.status === 'busy' && 'bg-yellow-500/10 text-yellow-600'
                  )}
                  variant="ghost"
                >
                  {branchSettings?.status === 'open' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : branchSettings?.status === 'closed' ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Pin className="h-5 w-5" />
                  )}
                  {branchSettings?.status === 'open'
                    ? 'We’re open'
                    : branchSettings?.status === 'closed'
                      ? 'We’re closed until further notice'
                      : 'We’re currently experiencing a high volume of orders'}
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
