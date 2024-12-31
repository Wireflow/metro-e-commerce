'use client';
import React, { useState } from 'react';

import { Card } from '@/components/ui/card';
import { useBranch } from '@/hooks/queries/useMetro';
import { AddressParams, formatAddress, formatPhoneNumber } from '@/utils/utils';

import EditBranchButton from './EditBranchButton';
import UpdateAdminPinForm from './forms/UpdateAdminPinForm';

interface InfoSectionProps {
  label: string;
  value: string | undefined;
  containerClassName?: string;
  valueClassName?: string;
}

type Props = {};

const InfoSection: React.FC<InfoSectionProps> = ({
  label,
  value,
  containerClassName,
  valueClassName,
}) => (
  <div className={`mb-4 ${containerClassName}`}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`text-lg font-semibold ${valueClassName}`}>{value}</p>
  </div>
);

const AdminInfo = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const { branch } = useBranch();

  const formattedAddress = formatAddress({
    street: branch?.address,
    city: branch?.city,
    state: branch?.state,
    zip_code: branch?.zip_code,
    country: branch?.country,
  } as AddressParams);

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-semibold text-black">Business Information</p>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[200px] flex-1">
          <InfoSection label="Business Name" value={branch?.name} />
          <InfoSection label="Phone Number" value={formatPhoneNumber(branch?.phone as string)} />
          <InfoSection
            label="Business Address"
            value={formattedAddress}
            valueClassName="max-w-sm"
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <InfoSection label="Email" value={branch?.email} />
          <InfoSection
            label="Notifications Email"
            value={branch?.orders_notified_email as string}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <UpdateAdminPinForm />
        <EditBranchButton open={open} setOpen={setOpen} />
      </div>
    </Card>
  );
};

export default AdminInfo;
