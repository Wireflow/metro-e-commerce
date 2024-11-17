'use client';
import Logo from '@/components/branding/Logo';
import { useBranch } from '@/hooks/queries/useMetro';
import { formatAddress, formatPhoneNumber } from '@/utils/utils';

type Props = {};

const FooterBrandInfo = (props: Props) => {
  const { branch } = useBranch();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Logo />
        <p className="text-xl text-white">{branch?.name}</p>
      </div>
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
      </div>
    </div>
  );
};

export default FooterBrandInfo;
