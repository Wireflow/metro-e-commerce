import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateApprovalEmail } from '@/lib/resend/emails/generateApprovalEmail';
import { WebhookPayload } from '@/types/webhooks/payloads';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export type CustomerUpdatePayload = WebhookPayload<'UPDATE', 'customers'>;

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body: CustomerUpdatePayload = await req.json();

    if (body.type !== 'UPDATE' || body.table !== 'customers') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 400 });
    }

    if (!body.record.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const customer = {
      business_name: body.record.business_name,
      first_name: body.record.first_name,
      last_name: body.record.last_name,
      email: body.record.email,
    };

    let emailContent;

    if (body.record.approved && !body.old_record.approved) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tax_id',
      });
    } else if (body.record.approved_tobacco && !body.old_record.approved_tobacco) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tobacco_license',
      });
    } else if (body.record.tax_id && body.record.tax_id_image_url) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tax_id_pending',
      });
    } else if (body.record.tobacco_license && body.record.tobacco_license_image_url) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tobacco_pending',
      });
    }

    if (emailContent) {
      const email = await sendEmail({
        to: body.record.email,
        subject: emailContent.subject,
        html: emailContent.html,
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
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Customer Update API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
