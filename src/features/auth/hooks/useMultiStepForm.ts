import { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface UseMultiStepFormProps<T> {
  form: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  steps: React.ReactElement[];
  onSubmit: (data: T) => void | Promise<void>;
}

interface UseMultiStepFormReturn {
  currentStep: number;
  step: React.ReactElement;
  steps: React.ReactElement[];
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  handleSubmit: () => void;
}

export const useMultiStepForm = <T extends Record<string, unknown>>({
  form,
  steps,
  onSubmit,
}: UseMultiStepFormProps<T>): UseMultiStepFormReturn => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const fields = steps[currentStep].props.fields;

    // If fields are specified for the current step, validate only those fields
    if (fields) {
      const result = await form.trigger(fields);
      if (!result) return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const goTo = (step: number) => {
    const targetStep = Math.max(0, Math.min(step, steps.length - 1));
    setCurrentStep(targetStep);
  };

  const handleSubmit = async () => {
    // Validate all fields on final submission
    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();
    await onSubmit(data as T);
  };

  return {
    currentStep,
    step: steps[currentStep],
    steps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    next,
    back,
    goTo,
    handleSubmit,
  };
};
