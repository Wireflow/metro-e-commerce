'use client';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { useBranch } from '@/hooks/queries/useMetro';
import { formatPhoneNumber } from '@/utils/utils';

const MaintenancePage = () => {
  const { branch } = useBranch();
  const { data: branchSettings } = useBranchSettings();

  const redirect = useRouter();

  useEffect(() => {
    if (branchSettings?.is_app_enabled === true) {
      redirect.push('/');
    }
  }, [branchSettings, redirect]);

  const handleCallClick = () => {
    if (branch?.phone) {
      window.location.href = `tel:${branch.phone.replace(/\D/g, '')}`;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Metro Logo"
            width={100}
            height={100}
            className="h-auto max-w-full"
          />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">Under Maintenance</h1>

        <p className="mb-6 text-base text-gray-600 sm:text-lg">
          We&apos;re currently performing scheduled maintenance to improve our services. We&apos;ll
          be back online shortly.
        </p>

        <div
          onClick={handleCallClick}
          className="flex cursor-pointer items-center justify-center space-x-3 rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100"
        >
          <Phone className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
          <span className="text-sm font-semibold text-blue-800 sm:text-base">
            Urgent Help? Call {formatPhoneNumber(branch?.phone)}
          </span>
        </div>

        <div className="mt-6 text-xs text-gray-500 sm:text-sm">
          We apologize for any inconvenience.
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
