import { NextResponse } from 'next/server';

import usaepay from '@/lib/usaepay';
import { CardDetailsSchema } from '@/types/card';
import { AuthenticatedRequest, withAuth } from '@/utils/supabase/withAuth';

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();

    const card = CardDetailsSchema.safeParse(body);

    if (!card.success) {
      console.error(card.error);
      return NextResponse.json(
        { error: card.error.flatten().formErrors[0], reason: card.error.flatten().formErrors[0] },
        {
          status: 400,
        }
      );
    }

    const token = await usaepay.tokenize({
      cardholder: card.data.cardholder,
      number: card.data.number,
      expiration: card.data.expiration,
      cvc: card.data.cvc,
      avs_street: card.data.avs_street,
      avs_postalcode: card.data.avs_postalcode,
    });

    if (token.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          ...token,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: false, error: "Couldn't to save card" }, { status: 400 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
