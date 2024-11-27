import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/utils';

type Props = {};

const CustomerAccountInfo = (props: Props) => {
  const { metadata } = useUser();
  return (
    <Card>
      <div className="border-b p-5 text-lg font-semibold">Account Info</div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">
              {metadata?.first_name + ' ' + metadata?.last_name}
            </p>
            <p className="text-md capitalize text-neutral-600">{metadata.customer_type} Account</p>
          </div>
        </div>
        <div>
          <p>
            Email: <span className="text-neutral-600">{metadata?.email}</span>
          </p>
          <p>
            Phone: <span className="text-neutral-600">+1 {formatPhoneNumber(metadata?.phone)}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CustomerAccountInfo;
