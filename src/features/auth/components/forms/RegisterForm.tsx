'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import DangerAlert from '@/components/quick/DangerAlert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { RegisterSchema, RegisterType } from '../../schemas/sign-up';
import { registerCustomerAction } from '../../server/registerCustomerAction';
import AccountInfo from './AccountInfo';
import BusinessInfo from './BusinessInfo';
import PersonalInfo from './PersonalInfo';
import SelectAccountType from './SelectAccountType';

const RegisterForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [pendingHref, setPendingHref] = useState('');
  const [showManualFields, setShowManualFields] = useState(false);
  const [isAddressFromGoogle, setIsAddressFromGoogle] = useState(false);

  const router = useRouter();

  const { execute, isExecuting } = useAction(registerCustomerAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        toast.error(data?.message || 'An error occurred during registration');
        return;
      }
      toast.success('Registration successful');
      router.push('/');
    },

    onError: () => {
      toast.error('An unexpected error occurred');
    },
  });

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      personal_info: {
        first_name: '',
        last_name: '',
        phone: '',
      },
      business_info: {
        business_name: '',
        customer_type: 'retail',
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'US',
      },
      account_info: {
        email: '',
        password: '',
        confirm_password: '',
      },
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterType) => {
    execute(data);
  };

  const formSteps = [
    <SelectAccountType key="account-type" form={form} />,
    <PersonalInfo key="personal-info" form={form} />,
    <BusinessInfo
      key="business-info"
      form={form}
      setShowManualFields={setShowManualFields}
      showManualFields={showManualFields}
      setIsAddressFromGoogle={setIsAddressFromGoogle}
      isAddressFromGoogle={isAddressFromGoogle}
    />,
    <AccountInfo key="account-info" form={form} />,
  ];

  const { step, isFirstStep, isLastStep, next, back, handleSubmit } = useMultiStepForm({
    form,
    steps: formSteps,
    onSubmit,
  });

  const handleNext = () => {
    next();
  };

  const handleNavigate = (href: string) => {
    if (form.formState.isDirty) {
      setShowAlert(true);
      setPendingHref(href);
    } else {
      router.push(href);
    }
  };

  return (
    <div>
      <div className="min-h-[340px]">
        <Form {...form}>
          <form>{step}</form>
        </Form>
      </div>

      <div className="mt-4 flex gap-3">
        {!isFirstStep && (
          <Button type="button" variant="outline" className="w-full" size="lg" onClick={back}>
            Back
          </Button>
        )}
        {isLastStep ? (
          <Button
            type="submit"
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={isExecuting}
          >
            {isExecuting ? 'Registering...' : 'Register'}
          </Button>
        ) : (
          <Button type="button" className="w-full" size="lg" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>

      <Button
        type="button"
        className="mt-4 w-full"
        size="lg"
        variant="ghost"
        onClick={() => handleNavigate('/sign-in')}
      >
        Already have an account? Sign in
      </Button>

      <DangerAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          router.push(pendingHref);
          setShowAlert(false);
        }}
      />
    </div>
  );
};

export default RegisterForm;
