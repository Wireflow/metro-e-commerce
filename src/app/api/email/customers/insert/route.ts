import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateWelcomeEmail } from '@/lib/resend/emails/generateWelcomeEmail';
import { WebhookPayload } from '@/types/webhooks/payloads';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export type CustomerInsertPayload = WebhookPayload<'INSERT', 'customers'>;

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body: CustomerInsertPayload = await req.json();

    if (body.type !== 'INSERT' || body.table !== 'customers') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 400 });
    }

    if (!body.record.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const { subject, html } = generateWelcomeEmail(
      {
        business_name: body.record.business_name,
        first_name: body.record.first_name,
        last_name: body.record.last_name,
        email: body.record.email,
      },
      process.env.NEXT_PUBLIC_WEBSITE_URL ?? 'localhost:3000'
    );

    const email = await sendEmail({
      to: body.record.email,
      subject,
      html,
    });

    if (!email.success) {
      return NextResponse.json(
        {
          success: false,
          error: email.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: email.data }, { status: 200 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
