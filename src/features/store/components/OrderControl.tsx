'use client';

import { BanIcon, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUpdateBranchSettings } from '../hooks/mutations/useUpdateBranchSettings';
import { useBranchSettings } from '../hooks/queries/useBranchSettings';

const OrderControl = () => {
  const { mutate: updateBranchSettings, isPending } = useUpdateBranchSettings();
  const { data: branchSettings } = useBranchSettings();
  const [isOrderingAllowed, setIsOrderingAllowed] = useState<boolean>(
    branchSettings?.is_ordering_allowed ?? true
  );

  const hasChanges = isOrderingAllowed !== branchSettings?.is_ordering_allowed;

  const statusOptions = [
    {
      value: true,
      label: 'Accept Orders',
      description: 'Customers can place new orders normally',
      icon: ShoppingBag,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
    {
      value: false,
      label: 'Pause Orders',
      description: 'Temporarily stop accepting new orders',
      icon: BanIcon,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  ] as const;

  useEffect(() => {
    setIsOrderingAllowed(branchSettings?.is_ordering_allowed ?? true);
  }, [branchSettings]);

  const handleStatusChange = (newStatus: boolean) => {
    setIsOrderingAllowed(newStatus);
  };

  const handleSave = () => {
    updateBranchSettings({
      is_ordering_allowed: isOrderingAllowed,
    });
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Order Settings</CardTitle>
            <CardDescription>
              Control whether your store is currently accepting new orders
            </CardDescription>
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
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {statusOptions.map(option => {
            const Icon = option.icon;
            const isSelected = isOrderingAllowed === option.value;

            return (
              <button
                key={String(option.value)}
                onClick={() => handleStatusChange(option.value)}
                className={`rounded-lg border-2 p-3 transition-all sm:p-4 ${
                  isSelected ? 'border-black' : 'border-gray-200'
                } hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${option.bg}`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${option.color}`} />
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-sm font-medium sm:text-base ${isSelected ? 'text-black' : 'text-gray-600'}`}
                    >
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 sm:text-sm">{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderControl;
