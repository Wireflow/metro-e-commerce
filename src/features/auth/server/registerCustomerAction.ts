'use server';

import { METRO_BRANCH_ID } from '@/data/constants';
import { sendEmail } from '@/lib/resend';
import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/utils/supabase/server';

import { RegisterSchema } from '../schemas/sign-up';

export const registerCustomerAction = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { personal_info, business_info, account_info } = parsedInput;

    if (account_info.password !== account_info.confirm_password) {
      throw new Error('Passwords do not match');
    }

    const { data, error } = await supabase.auth.signUp({
      email: account_info.email,
      password: account_info.password,
      options: {
        data: {
          first_name: personal_info.first_name.trim(),
          last_name: personal_info.last_name.trim(),
          phone: personal_info.phone,
          business_name: business_info.business_name.trim(),
          customer_type: business_info.customer_type,
          street: business_info.street.trim(),
          city: business_info.city.trim(),
          state: business_info.state.trim(),
          zip_code: business_info.zip_code,
          country: business_info.country.trim(),
          branch_id: METRO_BRANCH_ID,
          email: account_info.email,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }

    if (data?.user?.email) {
      await sendEmail({
        to: data.user?.email,
        subject: 'Welcome to Metro Cash & Carry',
        html: `<p>Welcome to Metro Cash & Carry!</p>`,
      });
    }

    return { success: true, user: data };
  });
