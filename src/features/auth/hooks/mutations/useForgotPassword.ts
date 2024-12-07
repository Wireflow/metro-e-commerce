import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { RecoverPasswordType } from '../../schemas/forgot-password';
import { forgotPasswordAction } from '../../server/forgotPassword';

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (data: RecoverPasswordType) => {
      const { error, data: result } = await forgotPasswordAction(data);

      if (error) {
        throw new Error(error);
      }

      return result;
    },
    onSuccess: data => {
      toast.success(data || 'Reset email sent successfully');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
