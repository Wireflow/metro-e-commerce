import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';

const ORDER_TYPES: Enum<'order_type'>[] = ['pickup', 'delivery', 'shipment'];

type Props = {
  onSelect: (orderType: Enum<'order_type'>) => void;
  selected: Enum<'order_type'>;
};

const OrderTypeSelector = ({ onSelect, selected }: Props) => {
  return (
    <div className="flex w-full">
      {ORDER_TYPES.map(orderType => (
        <Button
          key={orderType}
          onClick={() => onSelect(orderType)}
          className={cn('flex-1 rounded-none capitalize')}
          variant={orderType === selected ? 'default' : 'soft'}
          size={'lg'}
        >
          {orderType}
        </Button>
      ))}
    </div>
  );
};

export default OrderTypeSelector;
