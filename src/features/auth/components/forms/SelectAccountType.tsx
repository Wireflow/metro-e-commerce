'use client';

import { Check } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ACCOUNT_TYPES } from '@/data/constants';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';

import { RegisterType } from '../../schemas/sign-up';

type SelectAccountTypeProps = {
  form: UseFormReturn<RegisterType>;
};

const SelectAccountType = ({ form }: SelectAccountTypeProps) => {
  const currentType = form?.watch('business_info.customer_type');

  return (
    <div className="mb-4 space-y-4">
      <Label className="text-lg font-semibold">Select Account Type</Label>
      <div className="grid gap-4">
        {ACCOUNT_TYPES.map(account => (
          <AnimatedDiv key={account.type}>
            <Card
              className={cn(
                'cursor-pointer transition-colors duration-200',
                'group relative min-h-[120px]', // Fixed height prevents layout shift
                currentType === account.type
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              )}
              onClick={() =>
                form.setValue('business_info.customer_type', account.type as Enum<'customer_type'>)
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1.5">
                    <CardTitle className="text-base">{account.label}</CardTitle>
                    <CardDescription className="text-sm">{account.description}</CardDescription>
                  </div>
                  <div
                    className={cn(
                      'rounded-full border p-1 transition-colors',
                      currentType === account.type
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted bg-background text-muted-foreground group-hover:border-primary/50'
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </AnimatedDiv>
        ))}
      </div>
      <CardDescription className="text-xs">
        Note: Select carefully - subject to approval.
      </CardDescription>
    </div>
  );
};

export default SelectAccountType;
