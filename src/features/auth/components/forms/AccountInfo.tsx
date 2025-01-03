'use client';

import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import CheckboxField from '@/components/form/CheckboxField';
import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
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
        <CheckboxField
          name="account_info.terms_and_conditions"
          label="I agree to the terms and conditions"
          control={form.control}
        />
        <Link href="/tos" target="_blank">
          <Button variant="link" className="px-0 text-sm" type="button">
            Terms and conditions
          </Button>
        </Link>
      </div>
    </AnimatedDiv>
  );
};

export default AccountInfo;
