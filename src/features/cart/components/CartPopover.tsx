import { ArrowRight, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatCurrency } from '@/utils/utils';

type Props = {};

const CartPopover = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <ShoppingCart className="h-6 w-6 text-white md:h-7 md:w-7" />
      </PopoverTrigger>
      <PopoverContent align="end" className="mt-3 p-0">
        <div className="border-b border-b-gray-300 px-4 py-3">
          Shopping Cart <span className="text-gray-500">(2)</span>
        </div>
        <div className="p-4">
          <p>Product 1</p>
          <p>Product 1</p>
          <p>Product 1</p>
        </div>
        <div className="border-t border-t-gray-300 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p>{formatCurrency(10312)}</p>
          </div>
          <Button>
            CHECKOUT NOW <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
