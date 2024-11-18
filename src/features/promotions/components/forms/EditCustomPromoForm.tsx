import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ImageDropzone from '@/components/form/ImageUpload';
import InputField from '@/components/form/InputField';
import TextareaField from '@/components/form/TextareaField';
import QuickDialog from '@/components/quick/Dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useUpdateCustomPromo } from '../../hooks/mutations/useUpdateCustomPromo';
import {
  CustomPromotion,
  EditCustomPromoSchema,
  EditCustomPromoType,
} from '../../schemas/custom-promotions';

type Props = {
  trigger: React.ReactNode;
  promotion?: CustomPromotion;
};

const EditCustomPromoForm = ({ trigger, promotion }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { mutate: updateCustomPromo, isPending } = useUpdateCustomPromo();

  const form = useForm<EditCustomPromoType>({
    resolver: zodResolver(EditCustomPromoSchema),
    defaultValues: {
      id: promotion?.id,
      label: promotion?.label,
      branch_id: promotion?.branch_id,
      title: promotion?.title,
      description: promotion?.description,
      call_to_action: promotion?.call_to_action,
      image: null,
    },
  });

  const isDirty = form.formState.isDirty || !!selectedImage;

  const onSubmit = (data: EditCustomPromoType) => {
    if (!isDirty || !promotion) return;

    updateCustomPromo(data, {
      onSuccess: (data, ctx) => {
        setOpen(false);
        form.reset({
          id: promotion.id,
          label: ctx.label,
          branch_id: ctx.branch_id,
          title: ctx.title,
          description: ctx.description,
          call_to_action: ctx.call_to_action,
        });
      },
    });
  };

  useEffect(() => {
    form.setValue('image', selectedImage);
  }, [selectedImage, form, promotion]);

  if (!promotion) return null;

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Edit Promotion"
      description="Change the main website promotion below"
      className="max-w-[900px]"
      content={
        <Form {...form}>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 pb-4">
              <InputField
                label="Promotion Label"
                name="label"
                placeholder="label here..."
                control={form.control}
              />
              <InputField
                label="Promotion Title"
                name="title"
                placeholder="title here..."
                control={form.control}
              />
              <TextareaField
                label="Promotion Description"
                name="description"
                placeholder="description here..."
                control={form.control}
              />
              <InputField
                label="Call to Action"
                name="call_to_action"
                placeholder="call to action here..."
                control={form.control}
              />
            </div>
            <ImageDropzone
              className="h-full"
              onImageSelect={setSelectedImage}
              image={selectedImage}
              previewUrl={promotion?.image_url ?? ''}
            />
          </form>
        </Form>
      }
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={!isDirty || isPending}>
            {isPending ? 'Updating...' : 'Update Promotion'}
          </Button>
        </div>
      }
    />
  );
};

export default EditCustomPromoForm;
