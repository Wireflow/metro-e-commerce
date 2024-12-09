import { Check, Clock, LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranchSettings';

type Props = {
  branchSettings: Row<'branch_settings'>;
};

const StoreStatus = ({ branchSettings }: Props) => {
  const { mutate: updateBranchSettings, isPending } = useUpdateBranchSettings();
  const [status, setStatus] = useState<Enum<'branch_status'>>(branchSettings?.status ?? 'open');

  const hasChanges = status !== branchSettings?.status;

  const statusOptions = [
    { value: 'open', label: 'Open', icon: Check, color: 'text-green-500', bg: 'bg-green-100' },
    { value: 'busy', label: 'Busy', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    {
      value: 'closed',
      label: 'Closed',
      icon: LockKeyhole,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  ] as const;

  useEffect(() => {
    setStatus(branchSettings?.status ?? 'open');
  }, [branchSettings]);

  const handleStatusChange = (newStatus: Enum<'branch_status'>) => {
    setStatus(newStatus);
  };

  const handleSave = () => {
    updateBranchSettings({
      status,
    });
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Store Status</CardTitle>
            <CardDescription>
              This is the status that shows at the top of your website to all customers
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {statusOptions.map(option => {
            const Icon = option.icon;
            const isSelected = status === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value as Enum<'branch_status'>)}
                className={`rounded-lg border-2 p-3 transition-all sm:p-4 ${
                  isSelected ? 'border-black' : 'border-gray-200'
                } hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
              >
                <div className="flex items-center space-x-3 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-2">
                  <div className={`rounded-full p-2 ${option.bg}`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${option.color}`} />
                  </div>
                  <span
                    className={`text-sm font-medium sm:text-base ${isSelected ? 'text-black' : 'text-gray-600'}`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreStatus;
