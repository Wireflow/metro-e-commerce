'use client';

import Link from 'next/link';

import { AlertCircle, PhoneCall, Pin } from 'lucide-react';

import { useBranch } from '@/hooks/queries/useMetro';
import { formatPhoneNumber } from '@/utils/utils';

import Container from '../layout/Container';
import { Button } from '../ui/button';
import CategoryMenu from './CategorySelector';

type Props = {};

const Actions = (props: Props) => {
  const { branch } = useBranch();
  const formattedPhone = formatPhoneNumber(branch?.phone);

  return (
    <Container>
      <div className="flex items-center justify-between gap-2 md:gap-4 md:px-0">
        <div className="flex items-center gap-2 md:gap-4">
          <CategoryMenu />

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

        <div className="flex items-center gap-2">
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
