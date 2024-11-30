import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/utils';

type Props = {};

const CustomerAccountInfo = (props: Props) => {
  const { metadata } = useUser();

  return (
    <Card className="">
      {' '}
      <div className="border-b p-5 text-lg font-semibold">Account Info</div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">
                {metadata?.first_name + ' ' + metadata?.last_name}
              </p>
              <p className="text-sm capitalize text-neutral-600">
                {metadata.customer_type} Account
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm">
              Email: <span className="text-neutral-600">{metadata?.email}</span>
            </p>
            <p className="text-sm">
              Phone:{' '}
              <span className="text-neutral-600">+1 {formatPhoneNumber(metadata?.phone)}</span>
            </p>
          </div>
        </div>
        <div>
          <Link className="" href={'/customer/settings'}>
            <Button variant={'outline-primary'}>Edit Account</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CustomerAccountInfo;
