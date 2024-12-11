// hooks/mutations/useResetPassword.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ResetPasswordType } from '../../schemas/reset-password';
import { resetPasswordAction } from '../../server/resetPassword';

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (data: ResetPasswordType) => {
      const { error, data: result } = await resetPasswordAction(data);

      if (error) {
        throw new Error(error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      router.push('/customers/sign-in');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
