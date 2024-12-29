import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateAdminOrderEmailNotification } from '@/lib/resend/emails/generateAdminOrderEmailNotification';
import { generateDeliveryDateEmail } from '@/lib/resend/emails/generateDeliveryEmail';
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

    if (!body.record || !body.old_record) {
      return NextResponse.json({ error: 'Order not found' }, { status: 400 });
    }

    if (body.record.order_category === 'return') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const statusChanged = body.record.status !== body.old_record.status;
    const deliveryDateSet =
      !body.old_record.expected_delivery_at && body.record.expected_delivery_at;

    // If neither status changed nor delivery date was set, return early
    if (!statusChanged && !deliveryDateSet) {
      return NextResponse.json({ message: 'No relevant changes' }, { status: 200 });
    }

    const supabase = createClient();

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('email, business_name')
      .eq('id', body.record.customer_id)
      .single();

    if (customerError || !customer?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    // Handle both status change and delivery date notifications
    if (statusChanged) {
      // Existing status change email logic...
      if (body.record.status === 'pending') {
        const { data: branch } = await supabase
          .from('branches')
          .select('orders_notified_email')
          .eq('id', body.record.branch_id)
          .single();

        if (branch?.orders_notified_email) {
          const adminEmail = generateAdminOrderEmailNotification(body.record, customer);
          await sendEmail({
            to: branch.orders_notified_email,
            subject: adminEmail.subject,
            html: adminEmail.html,
          });
        }
      }

      const orderEmail = generateOrderEmail(body.record, customer);
      await sendEmail({
        to: customer.email,
        subject: orderEmail.subject,
        html: orderEmail.html,
      });
    }

    // Send delivery date confirmation email if delivery date was just set
    if (deliveryDateSet) {
      const deliveryEmail = generateDeliveryDateEmail(body.record, customer);
      const email = await sendEmail({
        to: customer.email,
        subject: deliveryEmail.subject,
        html: deliveryEmail.html,
      });

      if (!email.success) {
        return NextResponse.json({ success: false, error: email.error }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
