import React, { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';

import AddCardForm from './AddCardForm';

type Props = {
  trigger: React.ReactNode;
};

const AddCardFormDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      title="Add New Card"
      description="Add a new card to your account"
      className="max-w-[500px] overflow-y-auto custom-scrollbar md:max-w-[800px]"
      trigger={trigger}
      content={
        <div className="mt-4 pb-1">
          <AddCardForm setOpen={setOpen} />
        </div>
      }
    />
  );
};

export default AddCardFormDialog;
