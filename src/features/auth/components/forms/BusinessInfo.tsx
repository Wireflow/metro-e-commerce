'use client';

import { UseFormReturn } from 'react-hook-form';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InputField from '@/components/form/InputField';
import { SelectField } from '@/components/form/SelectField';
import { Label } from '@/components/ui/label';
import { STATES } from '@/data/constants';

import { RegisterType } from '../../schemas/sign-up';

type BusinessInfoProps = {
  form: UseFormReturn<RegisterType>;
};

const BusinessInfo = ({ form }: BusinessInfoProps) => {
  return (
    <AnimatedDiv>
      <div className="mb-4 space-y-4">
        <Label className="text-lg font-semibold">Business Information</Label>
        <InputField
          name="business_info.business_name"
          label="Business Name"
          control={form.control}
          type="text"
        />
        <InputField
          name="business_info.street"
          label="Street Address"
          control={form.control}
          type="text"
          maxLength={50}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            name="business_info.city"
            label="City"
            control={form.control}
            type="text"
            maxLength={48}
          />
          <SelectField
            name="business_info.state"
            label="State"
            placeholder="Select a state"
            control={form.control}
            options={STATES}
          />
        </div>

        <InputField
          name="business_info.zip_code"
          label="Zip Code"
          control={form.control}
          type="text"
          maxLength={5}
          onChange={e => form.setValue('business_info.zip_code', e.target.value.replace(/\D/g, ''))}
        />
      </div>
    </AnimatedDiv>
  );
};

export default BusinessInfo;
