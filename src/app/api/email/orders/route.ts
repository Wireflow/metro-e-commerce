import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateAdminOrderEmailNotification } from '@/lib/resend/emails/generateAdminOrderEmailNotification';
import { generateOrderEmail } from '@/lib/resend/emails/generateOrderEmail';
import { WebhookPayload } from '@/types/webhooks/payloads';
import { createClient } from '@/utils/supabase/server';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export type OrderUpdatePayload = WebhookPayload<'UPDATE', 'orders'>;

export const POST = async (req: AuthenticatedRequest) => {
  try {
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

    const supabase = createClient();

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

    if (body.record.status === 'pending' && body.old_record?.status !== 'pending') {
      const { data: branch, error: branchError } = await supabase
        .from('branches')
        .select('orders_notified_email')
        .eq('id', body.record.branch_id)
        .single();

      if (!branchError && branch?.orders_notified_email) {
        const adminEmail = generateAdminOrderEmailNotification(body.record, customer);

        // Send email to admin
        await sendEmail({
          to: branch.orders_notified_email,
          subject: adminEmail.subject,
          html: adminEmail.html,
        });
      }
    }

    const orderEmail = generateOrderEmail(body.record, customer);

    // Send email to customer
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
