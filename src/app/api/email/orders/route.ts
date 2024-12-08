import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateOrderEmail } from '@/lib/resend/emails/generateOrderEmail';
import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export type OrderUpdatePayload = {
  type: 'UPDATE';
  table: string;
  schema: string;
  record: Row<'orders'>;
  old_record: Row<'orders'>;
};

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient();
    const body: OrderUpdatePayload = await req.json();

    if (body.type !== 'UPDATE' || body.table !== 'orders') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record) {
      return NextResponse.json({ error: 'Order not found' }, { status: 400 });
    }

    if (body.record.status === 'created') {
      return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
    }

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('email, business_name')
      .eq('id', body.record.customer_id)
      .single();

    if (customerError) {
      return NextResponse.json({ error: 'Failed to retrieve customer' }, { status: 400 });
    }

    if (!customer || !customer?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const orderEmail = generateOrderEmail(body.record.status, body.record, customer);

    const email = await sendEmail({
      to: customer.email,
      subject: orderEmail.subject,
      html: orderEmail.html,
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
