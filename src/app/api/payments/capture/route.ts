import { NextResponse } from 'next/server';
import { z } from 'zod';

import usaepay from '@/lib/usaepay';
import { AuthenticatedRequest, withAuth } from '@/utils/supabase/withAuth';

const CaptureSchema = z.object({
  tranKey: z.string(),
});

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const { user } = req;

    if (user?.user_metadata.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = CaptureSchema.safeParse(body);

    if (!data.success) {
      console.error(data.error);
      return NextResponse.json(
        { error: data.error.flatten().formErrors[0], reason: data.error.flatten().formErrors[0] },
        {
          status: 400,
        }
      );
    }

    const captured = await usaepay.authorize.capture({
      tranKey: data.data.tranKey,
    });

    if (captured.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          ...captured,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to capture transaction' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
