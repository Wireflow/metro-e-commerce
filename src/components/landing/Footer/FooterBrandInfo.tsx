'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import Logo from '@/components/branding/Logo';
import { useBranch } from '@/hooks/queries/useMetro';
import { formatAddress, formatPhoneNumber } from '@/utils/utils';

const FooterBrandInfo = () => {
  const { branch } = useBranch();

  return (
    <div className="flex flex-col gap-3">
      <Link href="/">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <Logo />
          <p className="text-xl text-white">{branch?.name}</p>{' '}
        </div>
      </Link>

      <div>
        <p className="text-sm text-gray-400">Customer Support</p>
        <p className="text-lg text-gray-200">{formatPhoneNumber(branch?.phone)}</p>
      </div>
      <div>
        <p className="text-md max-w-[250px] text-gray-400">
          {formatAddress({
            street: branch?.address as string,
            city: branch?.city as string,
            state: branch?.state as string,
            zip_code: branch?.zip_code as string,
            country: branch?.country as string,
          })}
        </p>
      </div>
      <div>
        <p className="text-md max-w-[250px] text-gray-200">{branch?.email}</p>
        <Link
          href={'/admin/sign-in'}
          className="mt-2 flex items-center gap-2 text-xs text-white hover:underline"
        >
          <p>Admin Login</p>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default FooterBrandInfo;
