/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { useUser } from '@/hooks/useUser';
import { Enum } from '@/types/supabase/enum';

type UserRole = Enum<'user_role'> | 'customer';
export type UserMetadata = {
  id: string;
  sub: string;
  city: string;
  email: string;
  phone: string;
  state: string;
  street: string;
  tax_id: number;
  blocked: boolean;
  country: string;
  approved: boolean;
  zip_code: number;
  branch_id: string;
  last_name: string;
  belongs_to: Enum<'customer_belongs_to'>;
  created_at: string;
  first_name: string;
  updated_at: string;
  approved_at: string;
  business_name: string;
  customer_type: Enum<'customer_type'>;
  opted_in_text: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  tobacco_license: number;
  tax_id_image_url: string;
  approved_tobacco: boolean;
  role: Enum<'user_role'>;
};

type AuthRules = {
  requiredRole?: UserRole;
  approved?: boolean;
  approvedTobacco?: boolean;
  customCheck?: (metadata: UserMetadata) => boolean;
};

type WithAuthProps = {
  children: ReactNode;
  loadingPlaceholder?: ReactNode;
  rules?: AuthRules;
  fallback?: ReactNode;
};

const WithAuth = ({ children, loadingPlaceholder = null, rules = {}, fallback }: WithAuthProps) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <>{loadingPlaceholder}</>;
  }

  if (!user) {
    return <>{fallback}</>;
  }

  const metadata = user.user_metadata as UserMetadata;
  const isAdmin = metadata.role === 'admin';

  if (isAdmin) {
    return <>{children}</>;
  }

  const checksFailed = [
    rules.requiredRole && metadata.role !== rules.requiredRole,
    rules.approved && !metadata.approved,
    rules.approvedTobacco && !metadata.approved_tobacco,
    rules.customCheck && !rules.customCheck(metadata),
  ].some(check => check === true);

  if (checksFailed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// HOC creator for convenient wrapping
export const withAuth = (rules?: AuthRules) => {
  return function WithAuthWrapper(WrappedComponent: React.ComponentType<any>) {
    return function WithAuthComponent(props: any) {
      return (
        <WithAuth rules={rules}>
          <WrappedComponent {...props} />
        </WithAuth>
      );
    };
  };
};

export default WithAuth;
