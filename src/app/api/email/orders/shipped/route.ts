import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateShippingEmail } from '@/lib/resend/emails/generateShippingEmail';
import { WebhookPayload } from '@/types/webhooks/payloads';
import { createClient } from '@/utils/supabase/server';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body: WebhookPayload<'INSERT', 'order_shipping'> = await req.json();

    if (body.type !== 'INSERT' || body.table !== 'order_shipping') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record) {
      return NextResponse.json({ error: 'Shipping record not found' }, { status: 400 });
    }

    const supabase = createClient();

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', body.record.order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 400 });
    }

    // Get customer details
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('email, business_name')
      .eq('id', order.customer_id)
      .single();

    if (customerError || !customer?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const shippingEmail = generateShippingEmail({
      shipping: body.record,
      order,
      customer,
    });

    // Send email to customer
    const email = await sendEmail({
      to: customer.email,
      subject: shippingEmail.subject,
      html: shippingEmail.html,
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
    console.error('Shipping Notification API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
