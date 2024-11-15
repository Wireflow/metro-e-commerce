import { Row } from '@/types/supabase/table';

export const getUserFullName = (user: Row<'users'>) => {
  return `${user.first_name} ${user.last_name}`;
};
