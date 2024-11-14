'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrentBranch } from '@/hooks/queries/useCurrentBranch';
import { Enum } from '@/types/supabase/enum';
import { formatAddress } from '@/utils/utils';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranch';
import { useBranchSettings } from '../../hooks/queries/useBranchSettings';
import DeliveryOptions from './DeliveryOptions';
import RadiusMapDisplay from './DeliveryRadiusMap';
import DeliveryToggles from './DeliveryToggles';

export type DeliverySettingsState = {
  isDeliveryAllowed: boolean;
  isPayOnDeliveryAllowed: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
  deliveryRadius: number;
  feeType: Enum<'delivery_fee_type'>;
};

const DeliverySettings = () => {
  const { branch, isLoading: isLoadingBranch } = useCurrentBranch();
  const { data: branchSettings, isLoading: isLoadingBranchSettings } = useBranchSettings();
  const { isPending, mutate: updateBranchSettings } = useUpdateBranchSettings();

  const [settings, setSettings] = useState<DeliverySettingsState>({
    isDeliveryAllowed: branchSettings?.is_delivery_allowed ?? false,
    isPayOnDeliveryAllowed: branchSettings?.is_pay_on_delivery_allowed ?? false,
    deliveryFee: branchSettings?.delivery_fee ?? 0,
    deliveryMinimum: branchSettings?.delivery_minimum ?? 0,
    deliveryRadius: branchSettings?.delivery_miles_radius ?? 0,
    feeType: branchSettings?.delivery_fee_type ?? 'fixed',
  });

  useEffect(() => {
    if (branchSettings) {
      setSettings({
        isDeliveryAllowed: branchSettings.is_delivery_allowed ?? false,
        isPayOnDeliveryAllowed: branchSettings.is_pay_on_delivery_allowed ?? false,
        deliveryFee: branchSettings.delivery_fee ?? 0,
        deliveryMinimum: branchSettings.delivery_minimum ?? 0,
        deliveryRadius: branchSettings.delivery_miles_radius ?? 0,
        feeType: branchSettings.delivery_fee_type ?? 'fixed',
      });
    }
  }, [branchSettings]);

  const handleOnChange = (updates: Partial<DeliverySettingsState>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  if (isLoadingBranchSettings || isLoadingBranch) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!branchSettings) {
    return <div>No store settings found</div>;
  }

  const handleSave = () => {
    updateBranchSettings({
      is_delivery_allowed: settings.isDeliveryAllowed,
      is_pay_on_delivery_allowed: settings.isPayOnDeliveryAllowed,
      delivery_fee: settings.deliveryFee,
      delivery_minimum: settings.deliveryMinimum,
      delivery_miles_radius: settings.deliveryRadius,
      delivery_fee_type: settings.feeType,
    });
  };

  const isDirty =
    settings.deliveryFee !== branchSettings?.delivery_fee ||
    settings.deliveryMinimum !== branchSettings?.delivery_minimum ||
    settings.deliveryRadius !== branchSettings?.delivery_miles_radius ||
    settings.isDeliveryAllowed !== branchSettings?.is_delivery_allowed ||
    settings.isPayOnDeliveryAllowed !== branchSettings?.is_pay_on_delivery_allowed;

  return (
    <Card className="shadow-none">
      <CardHeader className="flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Delivery Settings</CardTitle>
          <CardDescription>Manage your delivery settings</CardDescription>
        </div>
        <Button variant={'black'} onClick={handleSave} disabled={!isDirty}>
          {isPending ? 'Saving...' : isDirty ? 'Save Changes' : 'Saved'}
        </Button>
      </CardHeader>
      <CardContent>
        <DeliveryToggles
          state={settings}
          publishedSettings={branchSettings}
          onChange={handleOnChange}
          disabled={isPending}
        />

        <div className="flex flex-col gap-4">
          <DeliveryOptions
            state={settings}
            publishedSettings={branchSettings}
            onChange={handleOnChange}
            disabled={isPending}
          />

          <RadiusMapDisplay
            initialAddress={
              branch &&
              formatAddress({
                street: branch.address,
                ...branch,
              })
            }
            radiusMiles={branchSettings?.delivery_miles_radius}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliverySettings;
