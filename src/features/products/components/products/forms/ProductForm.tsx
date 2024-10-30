'use client';

import { Plus, Save, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { ImageFile } from '@/components/form/MultiImageUpload';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { CreateProductFormData } from '../../../schemas/create-product';
import ProductBarcodes from './ProductBarcodes';
import ProductCategory from './ProductCategory';
import ProductDiscount from './ProductDiscount';
import GeneralInfo from './ProductGeneralInfo';
import ProductMedia from './ProductMedia';
import ProductPricing from './ProductPricing';
import ProductSettings from './ProductSettings';

type Props = {
  form: UseFormReturn<CreateProductFormData>;
  onSubmit: (data: CreateProductFormData) => void;
  onCancel: () => void;
  isMutating: boolean;
  setSelectedImages: (images: ImageFile[]) => void;
  selectedImages: ImageFile[];
  handleRemoveImage?: (id?: string) => void;
  handleRemoveBarcode?: (barcodeId: string) => void;
  isDirty?: boolean;
  mode: 'add' | 'update';
};

const ProductForm = ({
  form,
  onSubmit,
  onCancel,
  isMutating,
  setSelectedImages,
  selectedImages,
  handleRemoveImage,
  handleRemoveBarcode,
  mode,
  isDirty = false,
}: Props) => {
  return (
    <div className="relative">
      <Form {...form}>
        <form
          className={cn('flex flex-col gap-4', {
            '-mt-0 lg:-mt-16': mode === 'add',
          })}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row md:self-end">
            <Button
              variant={'outline'}
              className="w-full flex-1 md:w-auto"
              disabled={isMutating}
              onClick={onCancel}
              type="button"
            >
              <X className="h-5 w-5" /> {mode === 'add' ? 'Cancel' : 'Undo Changes'}
            </Button>

            <Button
              variant={'black'}
              className="w-full flex-1 md:w-auto"
              disabled={isMutating || (mode === 'update' && !isDirty)}
            >
              {mode === 'add' ? <Plus className="h-5 w-5" /> : <Save className="h-5 w-5" />}{' '}
              {isMutating
                ? mode === 'add'
                  ? 'Creating...'
                  : 'Updating...'
                : mode === 'add'
                  ? 'Add Product'
                  : 'Save Changes'}
            </Button>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="grid flex-1 gap-6">
              <GeneralInfo control={form.control} />
              <ProductMedia
                images={selectedImages}
                onImagesSelect={setSelectedImages}
                onRemoveImage={handleRemoveImage}
              />
              <ProductPricing control={form.control} />
            </div>
            <div className="flex flex-[0.5] flex-col gap-6">
              <ProductCategory control={form.control} />
              <ProductBarcodes control={form.control} onRemove={handleRemoveBarcode} />
              {mode === 'update' && (
                <>
                  <ProductSettings control={form.control} />
                  <ProductDiscount control={form.control} />
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
