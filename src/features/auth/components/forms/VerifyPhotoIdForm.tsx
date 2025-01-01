'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useController, useForm } from 'react-hook-form';

import ImageDropzone from '@/components/form/ImageUpload';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useSubmitPhotoId } from '../../hooks/mutations/useSubmitPhotoId';
import { PhotoIdSchema, PhotoIdType } from '../../schemas/photo-id';

const VerifyPhotoIdForm = () => {
  const router = useRouter();
  const { mutate: submitPhotoId, isPending } = useSubmitPhotoId();

  const form = useForm<PhotoIdType>({
    resolver: zodResolver(PhotoIdSchema),
    defaultValues: {
      photo_id_image: undefined,
    },
    mode: 'onChange',
  });

  const { field: taxIdImage } = useController({
    control: form.control,
    name: 'photo_id_image',
  });

  const handleImageSelect = (file: File | null) => {
    taxIdImage.onChange(file);
  };

  const onSubmit = (data: PhotoIdType) => {
    submitPhotoId(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div>
            <ImageDropzone
              className="h-full"
              onImageSelect={handleImageSelect}
              image={form.getValues('photo_id_image')}
            />
            <p className="mt-2 text-sm text-gray-500">Front of your Photo ID (Required)</p>
          </div>

          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full"
            size="lg"
          >
            {isPending ? 'Submitting...' : 'Submit Photo ID'} <Check className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyPhotoIdForm;
