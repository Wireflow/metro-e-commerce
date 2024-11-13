import MinimumSetting from '../MinimumSetting';
import { ShipmentComponentProps } from './ShipmentToggles';

const ShipmentOptions = ({ state, onChange, disabled }: ShipmentComponentProps) => (
  <div className="space-y-4">
    <MinimumSetting
      value={state.shipmentMinimum}
      onChange={value => onChange({ shipmentMinimum: value })}
      disabled={disabled}
      mode="shipment"
    />
  </div>
);

export default ShipmentOptions;
