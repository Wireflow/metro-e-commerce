import Link from 'next/link';

import { Store } from 'lucide-react';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={'/'}>
      <Store className="text-red-500" />
    </Link>
  );
};

export default Logo;
