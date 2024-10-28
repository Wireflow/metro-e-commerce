'use client';

import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useProductToggleStock } from '@/features/products/hooks/product-mutations-hooks';

type Props = {
  productId: string;
  in_stock: boolean;
  trigger?: React.ReactNode;
};

const ToggleProductStock = ({ productId, in_stock, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useProductToggleStock(productId);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handlePublish = () => {
    mutate(!in_stock, {
      onSuccess: data => {
        if (data.success) {
          handleToggleOpen();
        }
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger className="w-full">{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {in_stock
              ? 'This will make the product out of stock to customers.'
              : 'This will make the product in stock to customers.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={in_stock ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            onClick={handlePublish}
            disabled={isPending}
          >
            {in_stock ? 'Mark Out of Stock' : 'Mark In Stock'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ToggleProductStock;
