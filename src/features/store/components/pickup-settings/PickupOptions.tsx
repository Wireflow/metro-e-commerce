import MinimumSetting from '../MinimumSetting';
import { PickupComponentProps } from './PickupToggles';

const PickupOptions = ({ state, onChange, disabled }: PickupComponentProps) => (
  <div className="space-y-4">
    <MinimumSetting
      value={state.pickupMinimum}
      onChange={value => onChange({ pickupMinimum: value })}
      disabled={disabled}
      mode="pickup"
    />
  </div>
);

export default PickupOptions;
