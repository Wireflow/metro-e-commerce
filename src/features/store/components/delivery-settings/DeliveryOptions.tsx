import MinimumSetting from '../MinimumSetting';
import DeliveryFee from './DeliveryFee';
import DeliveryRadius from './DeliveryRadius';
import { DeliveryComponentProps } from './DeliveryToggles';

const DeliveryOptions = ({ state, onChange, disabled }: DeliveryComponentProps) => (
  <div className="space-y-4">
    <DeliveryFee
      deliveryFee={state.deliveryFee}
      feeType={state.feeType}
      onChange={(fee, type) => onChange({ deliveryFee: fee, feeType: type })}
      disabled={disabled}
    />
    <MinimumSetting
      value={state.deliveryMinimum}
      onChange={value => onChange({ deliveryMinimum: value })}
      disabled={disabled}
      mode="delivery"
    />
    <DeliveryRadius
      value={state.deliveryRadius}
      onChange={value => onChange({ deliveryRadius: value })}
      disabled={disabled}
    />
  </div>
);

export default DeliveryOptions;
