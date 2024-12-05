import { DollarSign, Package } from 'lucide-react';

import FeatureToggle from '@/components/FeatureToggle';
import { Badge } from '@/components/ui/badge';
import { Row } from '@/types/supabase/table';

import { ShipmentSettingsState } from './ShipmentSettings';

export type ShipmentComponentProps = {
  state: ShipmentSettingsState;
  publishedSettings?: Row<'branch_settings'>;
  onChange: (updates: Partial<ShipmentSettingsState>) => void;
  disabled: boolean;
};

const ShipmentToggles = ({
  state,
  onChange,
  disabled,
  publishedSettings,
}: ShipmentComponentProps) => (
  <div>
    <FeatureToggle
      title="Shipment Orders"
      description="Allow customers to place orders for shipment"
      icon={Package}
      disabled={disabled}
      checked={state.isShipmentAllowed}
      badge={
        <Badge variant={publishedSettings?.is_shipment_allowed ? 'success' : 'error'}>
          {publishedSettings?.is_shipment_allowed ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isShipmentAllowed: checked })}
    />
    <FeatureToggle
      title="Pay On Shipment"
      description="Allow customers to pay upon shipment"
      icon={DollarSign}
      disabled={disabled}
      checked={state.isPayonShipmentAllowed}
      badge={
        <Badge variant={publishedSettings?.is_pay_on_shipment_enabled ? 'success' : 'error'}>
          {publishedSettings?.is_pay_on_shipment_enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isPayonShipmentAllowed: checked })}
    />
  </div>
);

export default ShipmentToggles;
