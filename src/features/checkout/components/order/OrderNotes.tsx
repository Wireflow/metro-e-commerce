import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type OrderNotesProps = {
  onNotesChange: (notes: string) => void;
  notes: string;
};

const OrderNotes = ({ onNotesChange, notes }: OrderNotesProps) => {
  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Additional Information</p>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Order Notes</Label>
          <Textarea
            placeholder="Notes about your order, e.g. special notes for delivery"
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            rows={7}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderNotes;
