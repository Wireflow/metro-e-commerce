import { NextResponse } from 'next/server';

import { z } from 'zod';

import usaepay from '@/lib/usaepay';
import { AuthenticatedRequest, withAuth } from '@/utils/supabase/withAuth';

const VoidSchema = z.object({
  tranKey: z.string(),
});

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();

    const data = VoidSchema.safeParse(body);

    if (!data.success) {
      console.error(data.error);
      return NextResponse.json(
        { error: data.error.flatten().formErrors[0], reason: data.error.flatten().formErrors[0] },
        {
          status: 400,
        }
      );
    }

    const voided = await usaepay.authorize.void({
      tranKey: data.data.tranKey,
    });

    if (voided.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          ...voided,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to void transaction' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
