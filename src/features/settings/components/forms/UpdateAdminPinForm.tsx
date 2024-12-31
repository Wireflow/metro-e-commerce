import { ChevronLeft, Delete, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useUpdateAdminPin } from '@/features/users/hooks/mutations/useUpdateAdminPin';
import { useBranch } from '@/hooks/queries/useMetro';

const UpdateAdminPinForm = () => {
  const [open, setOpen] = useState<boolean | null>(null);
  const { mutate: updateAdminPin, isPending } = useUpdateAdminPin();
  const { branch } = useBranch();

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'pin' | 'confirm'>('pin');

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (pin.length === 4 && step === 'pin') {
      const timer = setTimeout(() => setStep('confirm'), 300);
      return () => clearTimeout(timer);
    }
  }, [pin, step]);

  useEffect(() => {
    if (!open) {
      setPin('');
      setConfirmPin('');
      setStep('pin');
      setError('');
    }
  }, [open]);

  const handlePress = (num: string) => {
    const currentPin = step === 'pin' ? pin : confirmPin;
    if (currentPin.length < 4) {
      if (step === 'pin') {
        setPin(prev => prev + num);
      } else {
        setConfirmPin(prev => prev + num);
      }
      setError('');
    }
  };

  const handleDelete = () => {
    if (step === 'pin') {
      setPin(prev => prev.slice(0, -1));
    } else {
      setConfirmPin(prev => prev.slice(0, -1));
    }
    setError('');
  };

  const handleClear = () => {
    if (step === 'pin') {
      setPin('');
    } else {
      setConfirmPin('');
    }
    setError('');
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('pin');
      setConfirmPin('');
      setError('');
      setPin('');
    }
  };

  const handleSubmit = () => {
    if (pin !== confirmPin) {
      setError('PINs do not match');
      const timer = setTimeout(() => {
        setConfirmPin('');
      }, 300);
      return () => clearTimeout(timer);
    }
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    updateAdminPin(
      { pin, branch_id: branch?.id as string },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: () => {
          setError('Failed to update PIN');
        },
      }
    );
  };

  const renderPinDots = (value: string) => {
    return (
      <div className="my-4 flex justify-center gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={`pin-dot-${index}`}
            className={`h-4 w-4 rounded-full ${
              error ? 'bg-red-500' : value.length > index ? 'bg-black' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderKeypadButton = (
    value: string | React.ReactNode,
    onPress: () => void,
    keyId: string
  ) => (
    <Button
      key={`keypad-${keyId}`}
      onClick={onPress}
      variant="ghost"
      className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-200"
      type="button"
    >
      {typeof value === 'string' ? <span className="text-2xl font-medium">{value}</span> : value}
    </Button>
  );

  const renderKeypadRow = (numbers: (string | React.ReactNode)[], handlers: (() => void)[]) => (
    <div className="flex justify-center gap-4">
      {numbers.map((num, index) =>
        renderKeypadButton(num, handlers[index], typeof num === 'string' ? num : `special-${index}`)
      )}
    </div>
  );

  if (open === null) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} variant="outline">
        Change Admin PIN
      </Button>

      <DialogContent className="max-w-[400px]">
        <DialogTitle>Update Admin PIN</DialogTitle>
        <div className="px-6 py-2">
          <div className="space-y-6">
            <div className="min-h-[120px]">
              {step === 'pin' && <div className="animate-fadeIn">{renderPinDots(pin)}</div>}
              <div className="mb-6 flex items-center justify-center">
                {step === 'confirm' && (
                  <ChevronLeft onClick={handleBack} className="absolute left-4 h-8 w-8" />
                )}
                <h2 className="text-2xl font-semibold">
                  {step === 'pin' ? 'Enter New PIN' : 'Confirm New PIN'}
                </h2>
              </div>

              <div className="animate-fadeIn">
                <div className="mb-2 text-center text-sm text-gray-500">
                  {step === 'pin'
                    ? 'Please enter a secure pin'
                    : 'Please enter your PIN again to confirm'}
                </div>
                {step === 'confirm' && renderPinDots(confirmPin)}
              </div>

              {error && (
                <div className="animate-fadeIn mt-2 text-center text-sm text-red-500">{error}</div>
              )}
            </div>

            <div className="space-y-4">
              {renderKeypadRow(
                ['1', '2', '3'],
                ['1', '2', '3'].map(num => () => handlePress(num))
              )}
              {renderKeypadRow(
                ['4', '5', '6'],
                ['4', '5', '6'].map(num => () => handlePress(num))
              )}
              {renderKeypadRow(
                ['7', '8', '9'],
                ['7', '8', '9'].map(num => () => handlePress(num))
              )}
              {renderKeypadRow(
                [<X key="clear" size={44} />, '0', <Delete key="delete" size={44} />],
                [handleClear, () => handlePress('0'), handleDelete]
              )}
            </div>

            {step === 'confirm' && (
              <div className="animate-fadeIn flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={confirmPin.length !== 4 || isPending}
                  className="h-14 w-full"
                  variant="soft"
                >
                  {isPending ? 'Updating...' : 'Update PIN'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdminPinForm;
