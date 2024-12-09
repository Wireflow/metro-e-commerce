import { Power, PowerOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Row } from '@/types/supabase/table';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranchSettings';

type Props = {
  branchSettings: Row<'branch_settings'>;
};

const AppAvailability = ({ branchSettings }: Props) => {
  const { mutate: updateBranchSettings, isPending } = useUpdateBranchSettings();
  const [isEnabled, setIsEnabled] = useState<boolean>(branchSettings?.is_app_enabled ?? true);

  const hasChanges = isEnabled !== branchSettings?.is_app_enabled;

  const statusOptions = [
    {
      value: true,
      label: 'App Enabled',
      description: 'Customers can place orders and browse normally',
      icon: Power,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
    {
      value: false,
      label: 'App Disabled',
      description: 'Customers cannot place new orders',
      icon: PowerOff,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  ] as const;

  const handleStatusChange = (newStatus: boolean) => {
    setIsEnabled(newStatus);
  };

  useEffect(() => {
    setIsEnabled(branchSettings?.is_app_enabled ?? true);
  }, [branchSettings]);

  const handleSave = () => {
    updateBranchSettings({
      is_app_enabled: isEnabled,
    });
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">App Availability</CardTitle>
            <CardDescription>
              Control whether customers can access your app and place orders
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
        {/* Status Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {statusOptions.map(option => {
            const Icon = option.icon;
            const isSelected = isEnabled === option.value;

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

export default AppAvailability;
