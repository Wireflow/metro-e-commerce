'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import ImageDropzone from '@/components/form/ImageUpload';
import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { formatTaxId } from '@/utils/utils';

import { useSubmitTaxID } from '../../hooks/mutations/useSubmitTaxID';
import { TaxIdApproveSchema, TaxIdApproveType } from '../../schemas/tax-id-approve';

const VerifyTaxIDForm = () => {
  const [formattedTaxId, setFormattedTaxId] = useState('');

  const { mutate: submitTaxID, isPending } = useSubmitTaxID();

  const form = useForm<TaxIdApproveType>({
    resolver: zodResolver(TaxIdApproveSchema),
    defaultValues: {
      tax_id: '',
      tax_id_image: undefined,
    },
    mode: 'onChange',
  });

  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatTaxId(input);
    setFormattedTaxId(formatted);
    form.setValue('tax_id', formatted, { shouldDirty: true });
  };

  const { field: taxIdImage } = useController({
    control: form.control,
    name: 'tax_id_image',
  });

  const handleImageSelect = (file: File | null) => {
    taxIdImage.onChange(file);
  };

  const onSubmit = (data: TaxIdApproveType) => {
    submitTaxID(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <InputField
            control={form.control}
            name="tax_id"
            label="Tax ID / EIN"
            type="text"
            placeholder="89-1234567"
            value={formattedTaxId}
            onChange={handleTaxIdChange}
            pattern="\d{2}-\d{7}"
          />

          <ImageDropzone
            className="h-full"
            onImageSelect={handleImageSelect}
            image={form.getValues('tax_id_image')}
          />

          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full"
            size="lg"
          >
            {isPending ? 'Submitting...' : 'Next'} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyTaxIDForm;
