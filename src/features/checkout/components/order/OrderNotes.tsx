import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/features/cart/store/useCartStore';

const OrderNotes = () => {
  const setNotes = useCartStore(state => state.setNotes);
  const notes = useCartStore(state => state.notes);

  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Additional Information</p>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Order Notes</Label>
          <Textarea
            placeholder="Notes about your order, e.g. special notes for delivery"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={7}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderNotes;
