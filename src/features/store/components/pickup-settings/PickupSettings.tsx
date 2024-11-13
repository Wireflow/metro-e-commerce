'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranch';
import { useBranchSettings } from '../../hooks/queries/useBranchSettings';
import PickupOptions from './PickupOptions';
import PickupToggles from './PickupToggles';

export type PickupSettingsState = {
  isPickupAllowed: boolean;
  isPayOnPickupAllowed: boolean;
  pickupMinimum: number;
};

const PickupSettings = () => {
  const { data: branchSettings, isLoading: isLoadingBranchSettings } = useBranchSettings();
  const { isPending, mutate: updateBranchSettings } = useUpdateBranchSettings();

  const [settings, setSettings] = useState<PickupSettingsState>({
    isPickupAllowed: branchSettings?.is_pickup_allowed ?? false,
    isPayOnPickupAllowed: branchSettings?.is_pay_on_pickup_allowed ?? false,
    pickupMinimum: branchSettings?.pickup_minimum ?? 0,
  });

  useEffect(() => {
    if (branchSettings) {
      setSettings({
        isPickupAllowed: branchSettings.is_pickup_allowed ?? false,
        isPayOnPickupAllowed: branchSettings.is_pay_on_pickup_allowed ?? false,
        pickupMinimum: branchSettings.pickup_minimum ?? 0,
      });
    }
  }, [branchSettings]);

  const handleOnChange = (updates: Partial<PickupSettingsState>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  if (isLoadingBranchSettings) {
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
      is_pickup_allowed: settings.isPayOnPickupAllowed,
      is_pay_on_pickup_allowed: settings.isPayOnPickupAllowed,
      pickup_minimum: settings.pickupMinimum,
    });
  };

  const isDirty =
    settings.isPayOnPickupAllowed !== branchSettings?.is_pay_on_pickup_allowed ||
    settings.isPickupAllowed !== branchSettings?.is_pickup_allowed ||
    settings.pickupMinimum !== branchSettings?.pickup_minimum;

  return (
    <Card className="shadow-none">
      <CardHeader className="flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Pickup Settings</CardTitle>
          <CardDescription>Manage your pickup settings</CardDescription>
        </div>
        <Button variant={'black'} onClick={handleSave} disabled={!isDirty}>
          {isPending ? 'Saving...' : isDirty ? 'Save Changes' : 'Saved'}
        </Button>
      </CardHeader>
      <CardContent>
        <PickupToggles
          state={settings}
          publishedSettings={branchSettings}
          onChange={handleOnChange}
          disabled={isPending}
        />

        <div className="flex flex-col gap-4">
          <PickupOptions
            state={settings}
            publishedSettings={branchSettings}
            onChange={handleOnChange}
            disabled={isPending}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupSettings;
