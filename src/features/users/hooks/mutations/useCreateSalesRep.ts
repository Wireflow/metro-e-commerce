import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { generateSchemaCompliantPassword } from '@/utils/passwordUtils';

import { CreateUserType } from '../../schemas/create-user';
import { createUser } from '../../server/createUser';

export const useCreateSalesRep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-sales-rep'],
    mutationFn: async (data: CreateUserType) => {
      const tempPassword = generateSchemaCompliantPassword();
      const {
        data: newUser,
        success,
        error,
      } = await createUser({
        ...data,
        password: tempPassword,
        confirmPassword: tempPassword,
      });

      if (!success) {
        throw new Error(error);
      }

      return newUser;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'sales-reps'] });
    },
    onSuccess: () => {
      toast.success('Sales rep added successfully');
    },
    onError: () => {
      toast.error('Failed to add sales rep');
    },
  });
};
