import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { METRO_BRANCH_ID } from '@/data/constants';
import { Database } from '@/types/supabase/database';

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    const { data: branchSetting } = await supabase
      .from('branch_settings')
      .select('*')
      .eq('branch_id', METRO_BRANCH_ID)
      .single();

    // First, let's create a clearer role check
    const userRole = user?.data.user?.role;
    const isCustomer = userRole === 'customer';
    const isAdmin = userRole === 'admin';

    // Then modify the redirect condition
    if (
      !request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.searchParams.has('edit') &&
      isCustomer && // Check if user is customer
      !isAdmin && // Make sure user is not admin
      branchSetting?.is_app_enabled === false
    ) {
      return NextResponse.redirect(new URL('/disabled', request.url));
    }
    const { data: customer, error } = await supabase
      .from('customers_with_address')
      .select('*')
      .eq('id', user?.data.user?.id as string)
      .single();

    const authError = user?.error || error;

    if (customer && !customer.approved) {
      if (!customer.tax_id || !customer.tax_id_image_url) {
        return NextResponse.redirect(new URL('/customers/approve/retail', request.url));
      }
    }

    // protected routes

    if (request.nextUrl.pathname.startsWith('/customer') && authError) {
      return NextResponse.redirect(new URL('/customers/sign-in', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/cart') && authError) {
      return NextResponse.redirect(new URL('/customers/sign-in', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/wishlist') && authError) {
      return NextResponse.redirect(new URL('/customers/sign-in', request.url));
    }

    return response;
  } catch (error) {
    console.error(error);
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
