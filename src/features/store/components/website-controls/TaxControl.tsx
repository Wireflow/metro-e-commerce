'use client';

import { Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { inputBaseStyles } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranch';

type Props = {
  branchSettings: Row<'branch_settings'>;
};

const TaxControl = ({ branchSettings }: Props) => {
  const { mutate: updateBranchSettings, isPending } = useUpdateBranchSettings();
  const [taxPercentage, setTaxPercentage] = useState<string>(
    (branchSettings?.tax_percentage ?? 0).toString()
  );

  const [error, setError] = useState<string>('');

  // Check if the current value is different from the saved value
  const hasChanges = parseFloat(taxPercentage) !== branchSettings?.tax_percentage;

  useEffect(() => {
    setTaxPercentage((branchSettings?.tax_percentage ?? 0).toString());
  }, [branchSettings]);

  const validateTaxPercentage = (value: string): boolean => {
    const numValue = Number(value);

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return false;
    }
    if (numValue < 0) {
      setError('Tax percentage cannot be negative');
      return false;
    }
    if (numValue > 100) {
      setError('Tax percentage cannot exceed 100%');
      return false;
    }
    setError('');
    return true;
  };

  const handleTaxChange = (value: string) => {
    setTaxPercentage(value);
    validateTaxPercentage(value);
  };

  const handleSave = () => {
    const numValue = Number(taxPercentage);

    if (validateTaxPercentage(taxPercentage)) {
      updateBranchSettings({
        tax_percentage: numValue,
      });
    }
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Tax Rate</CardTitle>
            <CardDescription>Set the tax percentage for all new orders</CardDescription>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <div className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
              {hasChanges && 'You have unsaved changes'}
            </div>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isPending || Boolean(error)}
              variant="black"
              className="w-full hover:bg-gray-800 sm:w-auto"
            >
              {isPending ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
          <div className="flex-1 space-y-2">
            <div className="relative flex items-center">
              <Receipt className="absolute left-3 h-4 w-4 text-gray-500" />
              <CurrencyInput
                type="text"
                suffix="%"
                value={taxPercentage}
                onValueChange={v => handleTaxChange(v ?? '0')}
                className={cn(inputBaseStyles, 'mt-1 pl-9 pr-12')}
                placeholder="Enter tax percentage"
                max={100}
                allowDecimals
                decimalsLimit={2}
                maxLength={3}
              />
              <div className="pointer-events-none absolute right-3 text-sm text-gray-500">%</div>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
          </div>
          <div className="hidden items-center rounded-[2px] border bg-gray-50 p-2.5 text-sm text-gray-500 sm:flex">
            Example: {formatCurrency(100 * (parseFloat(taxPercentage) / 100))} tax on a $100 order
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxControl;
