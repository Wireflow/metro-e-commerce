'use client';

import { Loader2, Package } from 'lucide-react';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import FeatureToggle from '@/components/FeatureToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, inputBaseStyles } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { useUpdateBranchSettings } from '../hooks/mutations/useUpdateBranch';
import { useBranchSettings } from '../hooks/queries/useBranchSettings';

type Props = {};

const DeliverySettings = (props: Props) => {
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryRadius, setDeliveryRadius] = useState(0);
  const [deliveryMinimumAmount, setDeliveryMinimumAmount] = useState(0);

  const { data: branchSettings, isLoading: isLoadingBranchSettings } = useBranchSettings();
  const { data: isLoading, mutate: updateBranchSettings } = useUpdateBranchSettings();

  if (isLoadingBranchSettings) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const handleDeliveryToggle = (value: boolean) => {
    const data = { is_delivery_disabled: value };
    updateBranchSettings(data);
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Delivery Settings</CardTitle>
        <CardDescription>Manage your delivery settings</CardDescription>
      </CardHeader>
      <CardContent>
        <FeatureToggle
          title="Allow Delivery"
          description="Allow customers to place orders for delivery"
          icon={Package}
          disabled={isLoadingBranchSettings}
          checked={branchSettings?.is_delivery_disabled ?? false}
          onCheckedChange={() => handleDeliveryToggle(!branchSettings?.is_delivery_disabled)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="w-full">Delivery Fee Percentage</Label>
            <CurrencyInput
              className={cn(inputBaseStyles)}
              suffix="%"
              maxLength={3}
              groupSeparator=""
              max={100}
              decimalsLimit={2}
              min={0}
              placeholder="ex. 5%"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="w-full">Delivery Minimum Amount</Label>
            <CurrencyInput
              className={cn(inputBaseStyles)}
              prefix="$"
              decimalsLimit={2}
              placeholder="ex. $500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="w-full">Delivery Radius (Miles)</Label>
            <Input
              placeholder="ex. 10"
              type="number"
              inputMode="numeric"
              max={100}
              min={0}
              onKeyDown={e => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                  e.preventDefault();
                }
              }}
              maxLength={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliverySettings;
