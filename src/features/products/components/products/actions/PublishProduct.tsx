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
import { usePublishProduct } from '@/features/products/hooks/product-mutations-hooks';

type Props = {
  productId: string;
  published: boolean;
  trigger?: React.ReactNode;
};

const PublishProduct = ({ productId, published, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = usePublishProduct(productId);

  const handleTogglePublish = () => {
    setOpen(!open);
  };

  const handlePublish = () => {
    mutate(!published, {
      onSuccess: data => {
        if (data.success) {
          handleTogglePublish();
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
            {published
              ? 'This will make the product invisible to customers.'
              : 'This will make the product visible to customers.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={
              published ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'
            }
            onClick={handlePublish}
            disabled={isPending}
          >
            {published ? 'Unpublish' : 'Publish'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishProduct;
