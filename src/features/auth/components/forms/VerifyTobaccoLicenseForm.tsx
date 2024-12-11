'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useController, useForm } from 'react-hook-form';

import ImageDropzone from '@/components/form/ImageUpload';
import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useSubmitTobaccoLicense } from '../../hooks/mutations/useSubmitTobaccoLicense';
import { TobaccoLicenseSchema, TobaccoLicenseType } from '../../schemas/tobacco-approve';

const VerifyTobaccoLicenseForm = () => {
  const router = useRouter();
  const { mutate: submitTobaccoLicense, isPending } = useSubmitTobaccoLicense();

  const form = useForm<TobaccoLicenseType>({
    resolver: zodResolver(TobaccoLicenseSchema),
    defaultValues: {
      licenseNumber: '',
      image: undefined,
    },
    mode: 'onChange',
  });

  const { field: taxIdImage } = useController({
    control: form.control,
    name: 'image',
  });

  const handleImageSelect = (file: File | null) => {
    taxIdImage.onChange(file);
  };

  const onSubmit = (data: TobaccoLicenseType) => {
    submitTobaccoLicense(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <InputField
            control={form.control}
            name="licenseNumber"
            placeholder="License Number"
            label="Tobacco License Number"
            type="text"
          />

          <div>
            <ImageDropzone
              className="h-full"
              onImageSelect={handleImageSelect}
              image={form.getValues('image')}
            />
            <p className="mt-2 text-sm text-gray-500">
              Skip if you will not be purchasing tobacco products
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full"
            size="lg"
          >
            {isPending ? 'Submitting...' : 'Finish'} <Check className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            disabled={isPending}
            className="w-full"
            size="lg"
            variant={'outline'}
            onClick={() => router.push('/')}
          >
            Skip
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyTobaccoLicenseForm;
