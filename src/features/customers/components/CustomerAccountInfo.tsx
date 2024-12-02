import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/utils';

type Props = {};

const CustomerAccountInfo = (props: Props) => {
  const { metadata } = useUser();

  return (
    <Card className="">
      {' '}
      <CardHeader className="border-b pb-3 pt-4">
        <CardTitle className="font-medium capitalize">Account info</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{metadata?.first_name?.charAt(0)}</AvatarFallback>
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
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{metadata?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium">{formatPhoneNumber(metadata?.phone)}</p>
            </div>
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
