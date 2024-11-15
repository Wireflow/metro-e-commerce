import { Enum } from '@/types/supabase/enum';

export const formatRole = (role: Enum<'user_role'>) => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'driver':
      return 'Driver';
    case 'independent_sales':
      return 'Independent Sales';
    case 'sales':
      return 'Sales';
    default:
      return 'User';
  }
};
