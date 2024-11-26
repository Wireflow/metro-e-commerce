import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { getCustomerById } from '@/features/customers/server/getCustomerById';
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
    const customer = await getCustomerById(user.data.user?.id ?? '');

    if (customer && !customer.approved) {
      if (!customer.tax_id || !customer.tax_id_image_url) {
        return NextResponse.redirect(new URL('/customers/approve/retail', request.url));
      }
    }

    // protected routes
    if (request.nextUrl.pathname.startsWith('/customer') && user.error) {
      return NextResponse.redirect(new URL('/customers/sign-in', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/cart') && user.error) {
      return NextResponse.redirect(new URL('/customers/sign-in', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/wishlist') && user.error) {
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
