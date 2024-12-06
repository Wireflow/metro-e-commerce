import { NextRequest, NextResponse } from 'next/server';

import { User } from '@supabase/supabase-js';

import { createClient } from './server';

export interface AuthenticatedRequest extends NextRequest {
  user?: User; // Replace 'any' with your user type
}

/**
 * Middleware to verify user authentication using Supabase
 * Checks for a valid Bearer token in the Authorization header
 */

export async function validateUserSession(req: AuthenticatedRequest): Promise<{
  isValid: boolean;
  user?: User; // Replace 'any' with your user type
  error?: string;
}> {
  try {
    const authorization = req.headers.get('Authorization');

    if (!authorization?.startsWith('Bearer ')) {
      return { isValid: false, error: 'Invalid authorization header format' };
    }

    const token = authorization.split('Bearer ')[1];

    if (!token) {
      return { isValid: false, error: 'No token provided' };
    }

    const supabase = createClient();

    // Verify the token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { isValid: false, error: 'Invalid or expired token' };
    }

    return { isValid: true, user };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return { isValid: false, error: 'Authentication error' };
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const { isValid, user, error } = await validateUserSession(req as AuthenticatedRequest);

    if (!isValid) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
    }

    // Add the user to the request object
    (req as AuthenticatedRequest).user = user;

    return handler(req as AuthenticatedRequest);
  };
}
