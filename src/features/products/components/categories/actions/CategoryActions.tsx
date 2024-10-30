import { EllipsisVertical, Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
  categoryId: string;
  published: boolean;
  onEdit?: () => void;
};

const CategoryActions = ({ categoryId, published, onEdit }: Props) => {
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
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CategoryActions;
