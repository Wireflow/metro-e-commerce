import { Plus } from 'lucide-react';
import { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import { Button } from '@/components/ui/button';

import AddSalesRepForm from './forms/AddSalesRepForm';

type Props = {};

const AddSalesRepFormDialog = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      title="Add Sales Rep"
      description="Add a new sales rep"
      className="overflow-auto custom-scrollbar"
      trigger={
        <Button variant={'black'}>
          Add Sales Rep <Plus className="h-4 w-4" />
        </Button>
      }
      content={
        <div className="mt-4">
          <AddSalesRepForm onSuccess={() => setOpen(false)} />
        </div>
      }
    />
  );
};
export default AddSalesRepFormDialog;
