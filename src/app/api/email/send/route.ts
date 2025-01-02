import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();

    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }

    const { data, success } = await sendEmail({
      to: body.to,
      subject: body.subject,
      html: body.html,
    });

    if (!success) {
      return NextResponse.json({ success: false, error: data }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
