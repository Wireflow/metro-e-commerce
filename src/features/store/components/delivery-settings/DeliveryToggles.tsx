import { DollarSign, Package } from 'lucide-react';

import FeatureToggle from '@/components/FeatureToggle';
import { Badge } from '@/components/ui/badge';
import { Row } from '@/types/supabase/table';

import { DeliverySettingsState } from './DeliverySettings';

export type DeliveryComponentProps = {
  state: DeliverySettingsState;
  publishedSettings?: Row<'branch_settings'>;
  onChange: (updates: Partial<DeliverySettingsState>) => void;
  disabled: boolean;
};

const DeliveryToggles = ({
  state,
  onChange,
  disabled,
  publishedSettings,
}: DeliveryComponentProps) => (
  <div className="space-y-4">
    <FeatureToggle
      title="Delivery Orders"
      description="Allow customers to place orders for delivery"
      icon={Package}
      disabled={disabled}
      checked={state.isDeliveryAllowed}
      badge={
        <Badge variant={publishedSettings?.is_delivery_allowed ? 'success' : 'error'}>
          {publishedSettings?.is_delivery_allowed ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isDeliveryAllowed: checked })}
    />
    <FeatureToggle
      title="Pay On Delivery"
      description="Allow customers to pay upon delivery"
      icon={DollarSign}
      disabled={disabled}
      checked={state.isPayOnDeliveryAllowed}
      badge={
        <Badge variant={publishedSettings?.is_pay_on_delivery_allowed ? 'success' : 'error'}>
          {publishedSettings?.is_pay_on_delivery_allowed ? 'Enabled' : 'Disabled'}
        </Badge>
      }
      onCheckedChange={checked => onChange({ isPayOnDeliveryAllowed: checked })}
    />
  </div>
);

export default DeliveryToggles;
