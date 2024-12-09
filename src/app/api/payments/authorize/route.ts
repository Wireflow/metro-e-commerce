import { NextResponse } from 'next/server';

import { z } from 'zod';

import usaepay from '@/lib/usaepay';
import { AuthenticatedRequest, withAuth } from '@/utils/supabase/withAuth';

const AuthorizeSchema = z.object({
  amount: z.number(),
  token: z.string(),
});

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();

    const data = AuthorizeSchema.safeParse(body);

    if (!data.success) {
      console.error(data.error);
      return NextResponse.json(
        { error: data.error.flatten().formErrors[0], reason: data.error.flatten().formErrors[0] },
        {
          status: 400,
        }
      );
    }

    const transaction = await usaepay.authorize.chargeToken({
      amount: data.data.amount,
      token: data.data.token,
    });

    if (transaction.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          ...transaction,
        },
        { status: 200 }
      );
    }

    if (transaction.status === 'error') {
      const error =
        transaction.error === 'Declined'
          ? 'Transaction declined'
          : 'Failed to authorize transaction';

      return NextResponse.json(
        { success: false, error: error ?? 'Failed to authorize transaction' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, error: transaction.status }, { status: 400 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
