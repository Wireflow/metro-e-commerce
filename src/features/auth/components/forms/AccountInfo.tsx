'use client';

import { UseFormReturn } from 'react-hook-form';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InputField from '@/components/form/InputField';
import { Label } from '@/components/ui/label';

import { RegisterType } from '../../schemas/sign-up';

type AccountInfoProps = {
  form: UseFormReturn<RegisterType>;
};

const AccountInfo = ({ form }: AccountInfoProps) => {
  return (
    <AnimatedDiv>
      <div className="mb-4 space-y-4">
        <Label className="text-lg font-semibold">Account Information</Label>
        <InputField name="account_info.email" label="Email" control={form.control} type="email" />
        <InputField
          name="account_info.password"
          label="Password"
          control={form.control}
          type="password"
        />
        <InputField
          name="account_info.confirm_password"
          label="Confirm Password"
          control={form.control}
          type="password"
        />
      </div>
    </AnimatedDiv>
  );
};

export default AccountInfo;
