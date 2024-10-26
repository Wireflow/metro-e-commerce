// ServerAuthWrapper.tsx
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

interface ServerAuthWrapperProps {
  children: React.ReactNode;
  /**
   * Where to redirect if user is not authenticated
   * Set to null to disable redirect
   */
  unauthorizedRedirect?: string | null;
  /**
   * Where to redirect if user is authenticated
   * Set to null to disable redirect
   */
  authorizedRedirect?: string | null;
}

async function ServerAuthWrapper({
  children,
  unauthorizedRedirect = null,
  authorizedRedirect = null,
}: ServerAuthWrapperProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect if unauthorized and unauthorizedRedirect is set
  if (!session && unauthorizedRedirect) {
    redirect(unauthorizedRedirect);
  }

  // Redirect if authorized and authorizedRedirect is set
  if (session && authorizedRedirect) {
    redirect(authorizedRedirect);
  }

  return <>{children}</>;
}

export default ServerAuthWrapper;
