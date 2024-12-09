'use client';

import { BanIcon, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Row } from '@/types/supabase/table';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranchSettings';

type Props = {
  branchSettings: Row<'branch_settings'>;
};

const CardPaymentControl = ({ branchSettings }: Props) => {
  const { mutate: updateBranchSettings, isPending } = useUpdateBranchSettings();
  const [isCardPaymentAllowed, setIsCardPaymentAllowed] = useState<boolean>(
    branchSettings?.is_card_payment_allowed ?? true
  );

  const hasChanges = isCardPaymentAllowed !== branchSettings?.is_card_payment_allowed;

  useEffect(() => {
    setIsCardPaymentAllowed(branchSettings?.is_card_payment_allowed ?? true);
  }, [branchSettings]);

  const handleStatusChange = (newStatus: boolean) => {
    setIsCardPaymentAllowed(newStatus);
  };

  const handleSave = () => {
    updateBranchSettings({
      is_card_payment_allowed: isCardPaymentAllowed,
    });
  };

  const cardOptions = [
    {
      value: true,
      label: 'Accept Cards',
      icon: CreditCard,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
    {
      value: false,
      label: 'Cards Disabled',
      icon: BanIcon,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Card Payments</CardTitle>
            <CardDescription>Allow customers to pay by card</CardDescription>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <div className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
              {hasChanges && 'You have unsaved changes'}
            </div>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isPending}
              variant="black"
              className="w-full hover:bg-gray-800 sm:w-auto"
            >
              {isPending ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row">
          {cardOptions.map(option => {
            const Icon = option.icon;
            const isSelected = isCardPaymentAllowed === option.value;

            return (
              <button
                key={String(option.value)}
                onClick={() => handleStatusChange(option.value)}
                className={`flex flex-1 items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                  isSelected ? 'border-black bg-gray-50' : 'border-gray-200'
                } hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
              >
                <div className={`rounded-full p-1.5 ${option.bg}`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${option.color}`} />
                </div>
                <span
                  className={`text-sm font-medium ${isSelected ? 'text-black' : 'text-gray-600'}`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPaymentControl;
