'use client';

import { UseFormReturn } from 'react-hook-form';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InputField from '@/components/form/InputField';
import { Label } from '@/components/ui/label';

import { RegisterType } from '../../schemas/sign-up';

type PersonalInfoProps = {
  form: UseFormReturn<RegisterType>;
};

const PersonalInfo = ({ form }: PersonalInfoProps) => {
  return (
    <AnimatedDiv>
      <div className="mb-4 space-y-4">
        <Label className="text-lg font-semibold">Personal Information</Label>
        <InputField
          name="personal_info.first_name"
          label="First Name"
          control={form.control}
          type="text"
        />
        <InputField
          name="personal_info.last_name"
          label="Last Name"
          control={form.control}
          type="text"
        />
        <InputField
          name="personal_info.phone"
          label="Phone Number"
          control={form.control}
          type="text"
          maxLength={10}
          onChange={e => form.setValue('personal_info.phone', e.target.value.replace(/\D/g, ''))}
        />
      </div>
    </AnimatedDiv>
  );
};

export default PersonalInfo;
