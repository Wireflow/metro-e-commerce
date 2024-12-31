import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import BranchForm from './forms/EditBranchForm';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const EditBranchButton = ({ open, setOpen }: Props) => {
  return (
    <div>
      <Button
        className="text-theme-blue bg-transparent hover:bg-gray-100"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-theme-blue">Edit</h2>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[550px] max-w-[800px]">
          <DialogTitle>
            <h2 className="text-theme-blue">Edit Business Info</h2>
          </DialogTitle>
          <BranchForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBranchButton;
