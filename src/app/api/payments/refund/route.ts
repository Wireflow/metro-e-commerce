import { NextResponse } from 'next/server';

import { z } from 'zod';

import usaepay from '@/lib/usaepay';
import { AuthenticatedRequest, withAuth } from '@/utils/supabase/withAuth';

const RefundSchema = z.object({
  tranKey: z.string(),
  amount: z.number(),
});

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const { user } = req;

    if (user?.user_metadata.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = RefundSchema.safeParse(body);

    if (!data.success) {
      console.error(data.error);
      return NextResponse.json(
        { error: data.error.flatten().formErrors[0], reason: data.error.flatten().formErrors[0] },
        {
          status: 400,
        }
      );
    }

    const refund = await usaepay.normalSale.refundTransaction({
      tranKey: data.data.tranKey,
      amount: data.data.amount.toFixed(2),
    });

    if (refund.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          ...refund,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to refund transaction' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
