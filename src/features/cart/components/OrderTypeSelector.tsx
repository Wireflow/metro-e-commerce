import { useEffect } from 'react';

import Conditional from '@/components/Conditional';
import QuickAlert from '@/components/quick/QuickAlert';
import { Button } from '@/components/ui/button';
import { useStoreStatus } from '@/hooks/useStoreStatus';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';

type Props = {
  onSelect: (orderType?: Enum<'order_type'>) => void;
  selected?: Enum<'order_type'>;
};

const OrderTypeSelector = ({ onSelect, selected }: Props) => {
  const {
    isOrderingAllowed,
    reason,
    settings,
    isOrderTypeEnabled,
    getEnabledOrderType,
    availableOrderTypes,
  } = useStoreStatus();

  useEffect(() => {
    if (!selected && settings) {
      const enabledType = getEnabledOrderType();
      onSelect(enabledType);
    }

    if (selected && !isOrderTypeEnabled(selected)) {
      const enabledType = getEnabledOrderType();
      onSelect(enabledType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <div className="space-y-4">
      <div className="flex w-full">
        {availableOrderTypes.map(orderType => (
          <Button
            key={orderType.id}
            onClick={() => onSelect(orderType.id)}
            className={cn('flex-1 rounded-none capitalize')}
            variant={orderType.id === selected ? 'default' : 'soft'}
            disabled={orderType.disabled || !isOrderingAllowed}
            size={'lg'}
          >
            {orderType.name}
          </Button>
        ))}
      </div>
      <Conditional condition={!isOrderingAllowed}>
        <QuickAlert
          variant="warning"
          title="Look here!"
          description={reason ?? 'Our store is currently unavailable'}
        />
      </Conditional>
      <Conditional condition={isOrderingAllowed && !selected}>
        <QuickAlert
          variant="warning"
          title="No Order Type Selected"
          description={'Please select an order type to proceed'}
        />
      </Conditional>
    </div>
  );
};

export default OrderTypeSelector;
