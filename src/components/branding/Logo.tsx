import Image from 'next/image';
import Link from 'next/link';

import { Store } from 'lucide-react';

import { useBranch } from '@/hooks/queries/useMetro';

const Logo = () => {
  const { branch } = useBranch();

  return (
    <Link href={'/'}>
      {branch?.logoUrl ? (
        <Image src={branch?.logoUrl} alt="logo" width={40} height={40} />
      ) : (
        <Store className="h-7 w-7 text-red-500" />
      )}
    </Link>
  );
};

export default Logo;
