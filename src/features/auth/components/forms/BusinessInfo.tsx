'use client';

import { UseFormReturn } from 'react-hook-form';

import AddressAutocomplete, { ParsedAddress } from '@/components/AddressAutocomplete';
import Animate from '@/components/animation/Animate';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InputField from '@/components/form/InputField';
import { SelectField } from '@/components/form/SelectField';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { STATES } from '@/data/constants';

import { RegisterType } from '../../schemas/sign-up';

type BusinessInfoProps = {
  form: UseFormReturn<RegisterType>;
  setShowManualFields: (showManualFields: boolean) => void;
  setIsAddressFromGoogle: (isAddressFromGoogle: boolean) => void;
  showManualFields: boolean;
  isAddressFromGoogle: boolean;
};

const BusinessInfo = ({
  form,
  setShowManualFields,
  setIsAddressFromGoogle,
  showManualFields,
  isAddressFromGoogle,
}: BusinessInfoProps) => {
  const handleAutoCompleteSelect = (address: ParsedAddress) => {
    form.setValue('business_info.street', address.streetAddress);
    form.setValue('business_info.city', address.city);
    form.setValue('business_info.state', address.state);
    form.setValue('business_info.zip_code', address.zipCode);
    setShowManualFields(true);
    setIsAddressFromGoogle(true);
  };

  const handleManualEntry = () => {
    setShowManualFields(true);
    setIsAddressFromGoogle(false);
  };

  const handleUseAutocomplete = () => {
    setShowManualFields(true);
    setIsAddressFromGoogle(true);
  };

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Address</Label>
            {!showManualFields && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={handleManualEntry}
              >
                Enter manually
              </Button>
            )}
          </div>

          <AddressAutocomplete onAddressSelect={handleAutoCompleteSelect} />

          {showManualFields && isAddressFromGoogle && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Using address from Google Maps</span>
              <Button
                type="button"
                variant="outline"
                className="h-8 text-xs"
                size="sm"
                onClick={() => setIsAddressFromGoogle(false)}
              >
                Edit manually
              </Button>
            </div>
          )}

          {showManualFields && !isAddressFromGoogle && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Manual entry mode</span>
              <Button
                type="button"
                variant="outline"
                className="h-8 text-xs"
                size="sm"
                onClick={handleUseAutocomplete}
              >
                Use Google Maps
              </Button>
            </div>
          )}
        </div>

        <Animate show={showManualFields}>
          <div className="space-y-4">
            <InputField
              name="business_info.street"
              label="Street Address"
              placeholder='e.g. "123 Main St"'
              control={form.control}
              type="text"
              maxLength={50}
              disabled={isAddressFromGoogle}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                name="business_info.city"
                label="City"
                placeholder='e.g. "San Francisco"'
                control={form.control}
                type="text"
                maxLength={48}
                disabled={isAddressFromGoogle}
              />
              <SelectField
                name="business_info.state"
                label="State"
                placeholder="Select a state"
                control={form.control}
                options={STATES}
                disabled={isAddressFromGoogle}
              />
            </div>

            <InputField
              name="business_info.zip_code"
              label="Zip Code"
              control={form.control}
              type="text"
              maxLength={5}
              disabled={isAddressFromGoogle}
              onChange={e => {
                if (!isAddressFromGoogle) {
                  form.setValue('business_info.zip_code', e.target.value.replace(/\D/g, ''));
                }
              }}
            />
          </div>
        </Animate>
      </div>
    </AnimatedDiv>
  );
};

export default BusinessInfo;
