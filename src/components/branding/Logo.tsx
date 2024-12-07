import Link from 'next/link';

import { Store } from 'lucide-react';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Store className="text-red-500" />
    </Link>
  );
};

export default Logo;
