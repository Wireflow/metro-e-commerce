import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { config } from '@/config';
import { generateNewSalesEmail } from '@/lib/resend/emails/generateNewSalesEmail';
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

      console.log(newUser);

      if (newUser?.user.email) {
        const email = generateNewSalesEmail({
          email: newUser?.user.email,
          first_name: data.firstName,
          last_name: data.lastName,
          temporary_password: tempPassword,
          login_url: config?.salesAppUrl,
        });

        console.log(email);

        const { data: emailData, status } = await axios.post('/api/email/send', {
          to: newUser?.user.email,
          subject: email.subject,
          html: email.html,
        });

        console.log(status);
        console.log(emailData);

        if (status !== 200) {
          throw new Error(emailData?.error);
        }
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
