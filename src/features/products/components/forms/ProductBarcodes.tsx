import { Plus, Trash2 } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CreateProductFormData } from '../../schemas/create-product';

interface ProductBarcodesProps {
  control: Control<CreateProductFormData>;
  onRemove?: (barcodeId: string) => void;
}

const ProductBarcodes = ({ control, onRemove }: ProductBarcodesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'barcodes',
  });

  const handleRemove = (barcodeId: string | undefined, index: number) => {
    if (barcodeId) {
      onRemove?.(barcodeId);
    }
    remove(index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Barcodes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative flex items-center gap-2">
            <div className="flex-1">
              <InputField
                control={control}
                name={`barcodes.${index}.barcode`}
                label={`Barcode ${index + 1}`}
                placeholder="Enter barcode"
                disabled={field.disabled}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => handleRemove(field?.barcode_id, index)}
              className="absolute right-2 top-[38px] h-7 w-7"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ barcode: '', disabled: false })}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Barcode
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductBarcodes;
