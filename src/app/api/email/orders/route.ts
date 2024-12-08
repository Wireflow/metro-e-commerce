import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

type UpdatePayload = {
  type: 'UPDATE';
  table: string;
  schema: string;
  record: Row<'orders'>;
  old_record: Row<'orders'>;
};

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient();
    const body: UpdatePayload = await req.json();

    if (body.type !== 'UPDATE' || body.table !== 'orders') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record) {
      return NextResponse.json({ error: 'Order not found' }, { status: 400 });
    }

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('email, business_name')
      .eq('id', body.record.customer_id)
      .single();

    if (customerError) {
      return NextResponse.json({ error: 'Failed to retrieve customer' }, { status: 400 });
    }

    if (!customer?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const email = await sendEmail({
      to: customer.email,
      subject: 'Order Confirmed',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Order Confirmed</h1>
          <p>Dear ${customer.business_name},</p>
          <p>Your order has been confirmed and is being processed.</p>
          <p>Expected delivery: ${new Date(body.record.expected_delivery_at || '').toLocaleDateString()}</p>
        </div>
      `,
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

    return NextResponse.json({ success: true, data: email.data?.data }, { status: 200 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
