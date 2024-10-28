import { EllipsisVertical, Pencil, Power } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import PublishProduct from './actions/PublishProduct';
import ToggleProductStock from './actions/ToggleProductStock';

type Props = {
  productId: string;
  published: boolean;
  in_stock: boolean;
  onEdit?: () => void;
};

const ProductActions = ({ productId, published, onEdit, in_stock }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="end">
          <div className="grid gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full items-center justify-start gap-2"
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
          <ToggleProductStock
            productId={productId}
            in_stock={in_stock}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className={`flex w-full items-center justify-start gap-2 ${
                  in_stock
                    ? 'text-red-600 hover:text-red-600'
                    : 'text-green-600 hover:text-green-600'
                }`}
              >
                <Power className="h-4 w-4" />
                {in_stock ? 'Mark Out of Stock' : 'Mark In Stock'}
              </Button>
            }
          />
          <PublishProduct
            productId={productId}
            published={published}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className={`flex w-full items-center justify-start gap-2 ${
                  published
                    ? 'text-orange-600 hover:text-orange-600'
                    : 'text-green-600 hover:text-green-600'
                }`}
              >
                <Power className="h-4 w-4" />
                {published ? 'Unpublish' : 'Publish'}
              </Button>
            }
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProductActions;
