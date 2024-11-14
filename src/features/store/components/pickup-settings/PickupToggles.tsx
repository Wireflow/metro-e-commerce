import { DollarSign, Package } from 'lucide-react';

import FeatureToggle from '@/components/FeatureToggle';
import { Badge } from '@/components/ui/badge';
import { Row } from '@/types/supabase/table';

import { PickupSettingsState } from './PickupSettings';

export type PickupComponentProps = {
  state: PickupSettingsState;
  publishedSettings?: Row<'branch_settings'>;
  onChange: (updates: Partial<PickupSettingsState>) => void;
  disabled: boolean;
};

const PickupToggles = ({ state, onChange, disabled, publishedSettings }: PickupComponentProps) => (
  <div>
    <FeatureToggle
      title="Pickup Orders"
      description="Allow customers to place orders for pickup"
      icon={Package}
      disabled={disabled}
      checked={state.isPayOnPickupAllowed}
      badge={
        <Badge variant={publishedSettings?.is_pickup_allowed ? 'success' : 'error'}>
          {publishedSettings?.is_pickup_allowed ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isPickupAllowed: checked })}
    />
    <FeatureToggle
      title="Pay On Pickup"
      description="Allow customers to pay upon pickup"
      icon={DollarSign}
      disabled={disabled}
      checked={state.isPayOnPickupAllowed}
      badge={
        <Badge variant={publishedSettings?.is_pay_on_pickup_allowed ? 'success' : 'error'}>
          {publishedSettings?.is_pay_on_pickup_allowed ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isPayOnPickupAllowed: checked })}
    />
  </div>
);

export default PickupToggles;
