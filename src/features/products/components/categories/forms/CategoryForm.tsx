'use client';

import { Plus, Save, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CreateCategoryFormData } from '@/features/products/schemas/create-category';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';

import CategoryGeneralInfo from './CategoryGeneralInfo';
import CategorySettings from './CategorySettings';
import CategoryThumbnail from './CategoryThumbnail';
import ParentCategory from './ParentCategory';
import SubCategories from './SubCategories';

type Props = {
  form: UseFormReturn<CreateCategoryFormData>;
  onSubmit: (data: CreateCategoryFormData) => void;
  onCancel: () => void;
  subCategories: Pick<Row<'categories'>, 'id' | 'name' | 'image_url'>[];
  isMutating: boolean;
  setSelectedImage: (image: File | null) => void;
  selectedImage: File | null;
  isDirty?: boolean;
  mode: 'add' | 'update';
  previewUrl?: string;
};

const CategoryForm = ({
  form,
  onSubmit,
  onCancel,
  isMutating,
  setSelectedImage,
  selectedImage,
  previewUrl,
  mode,
  subCategories,
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
                  ? 'Add Category'
                  : 'Save Changes'}
            </Button>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="flex-1">
              <CategoryGeneralInfo control={form.control} />
              {mode === 'update' && subCategories.length > 0 && (
                <div className="mt-6">
                  <SubCategories
                    subCategories={subCategories ?? []}
                    parentCategoryName={form.getValues('name') ?? ''}
                  />
                </div>
              )}
            </div>
            <div className="flex-[0.5] space-y-6">
              <CategoryThumbnail
                onImageSelect={setSelectedImage}
                image={selectedImage}
                previewUrl={previewUrl}
              />
              <ParentCategory control={form.control} />
              {mode === 'update' && <CategorySettings control={form.control} />}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
