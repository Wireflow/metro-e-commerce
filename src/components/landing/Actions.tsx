'use client';

import { AlertCircle, PhoneCall, Pin } from 'lucide-react';
import Link from 'next/link';

import { useBranch } from '@/hooks/queries/useMetro';
import { formatPhoneNumber } from '@/utils/utils';

import Container from '../layout/Container';
import { Button } from '../ui/button';
import CategoryMenu from './CategoryMenu';

const Actions = () => {
  const { branch } = useBranch();
  const formattedPhone = formatPhoneNumber(branch?.phone);

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
