'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUpdateBranchSettings } from '../../hooks/mutations/useUpdateBranch';
import { useBranchSettings } from '../../hooks/queries/useBranchSettings';
import ShipmentOptions from './ShipmentOptions';
import ShipmentToggles from './ShipmentToggles';

export type ShipmentSettingsState = {
  isShipmentAllowed: boolean;
  shipmentMinimum: number;
};

const ShipmentSettings = () => {
  const { data: branchSettings, isLoading: isLoadingBranchSettings } = useBranchSettings();
  const { isPending, mutate: updateBranchSettings } = useUpdateBranchSettings();

  const [settings, setSettings] = useState<ShipmentSettingsState>({
    isShipmentAllowed: branchSettings?.is_shipment_allowed ?? false,
    shipmentMinimum: branchSettings?.shipment_minimum ?? 0,
  });

  useEffect(() => {
    if (branchSettings) {
      setSettings({
        isShipmentAllowed: branchSettings.is_shipment_allowed ?? false,
        shipmentMinimum: branchSettings.shipment_minimum ?? 0,
      });
    }
  }, [branchSettings]);

  const handleOnChange = (updates: Partial<ShipmentSettingsState>) => {
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
      is_shipment_allowed: settings.isShipmentAllowed,
      shipment_minimum: settings.shipmentMinimum,
    });
  };

  const isDirty =
    settings.isShipmentAllowed !== branchSettings?.is_shipment_allowed ||
    settings.shipmentMinimum !== branchSettings?.shipment_minimum;

  return (
    <Card className="shadow-none">
      <CardHeader className="flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Shipment Settings</CardTitle>
          <CardDescription>Manage your shipment settings</CardDescription>
        </div>
        <Button variant={'black'} onClick={handleSave} disabled={!isDirty}>
          {isPending ? 'Saving...' : isDirty ? 'Save Changes' : 'Saved'}
        </Button>
      </CardHeader>
      <CardContent>
        <ShipmentToggles
          state={settings}
          publishedSettings={branchSettings}
          onChange={handleOnChange}
          disabled={isPending}
        />

        <div className="flex flex-col gap-4">
          <ShipmentOptions
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

export default ShipmentSettings;
