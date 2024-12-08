import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/resend';
import { generateApprovalEmail } from '@/lib/resend/emails/generateApprovalEmail';
import { WebhookPayload } from '@/types/webhooks/payloads';
import { AuthenticatedRequest } from '@/utils/supabase/withAuth';

export type CustomerUpdatePayload = WebhookPayload<'UPDATE', 'customers'>;

export const POST = async (req: AuthenticatedRequest) => {
  try {
    const body: CustomerUpdatePayload = await req.json();

    // Basic validation
    if (body.type !== 'UPDATE' || body.table !== 'customers') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!body.record || !body.old_record) {
      return NextResponse.json({ error: 'Invalid record data' }, { status: 400 });
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

    // Check for tax ID approval
    if (
      body.record.approved &&
      !body.old_record.approved &&
      body.record.tax_id &&
      body.record.tax_id_image_url
    ) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tax_id',
      });
    }
    // Check for tobacco license approval
    else if (
      body.record.approved_tobacco &&
      !body.old_record.approved_tobacco &&
      body.record.tobacco_license &&
      body.record.tobacco_license_image_url
    ) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tobacco_license',
      });
    }
    // Check for new tax ID submission
    else if (
      !body.record.approved &&
      body.record.tax_id &&
      body.record.tax_id_image_url &&
      (!body.old_record.tax_id || !body.old_record.tax_id_image_url)
    ) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tax_id_pending',
      });
    }
    // Check for new tobacco license submission
    else if (
      !body.record.approved_tobacco &&
      body.record.tobacco_license &&
      body.record.tobacco_license_image_url &&
      (!body.old_record.tobacco_license || !body.old_record.tobacco_license_image_url)
    ) {
      emailContent = generateApprovalEmail({
        ...customer,
        approval_type: 'tobacco_pending',
      });
    }

    // Send email if content is generated
    if (emailContent) {
      try {
        const email = await sendEmail({
          to: body.record.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (!email.success) {
          console.error('Email sending failed:', email.error);
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to send email',
            },
            { status: 400 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            data: email.data?.data,
          },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('Email service error:', emailError);
        return NextResponse.json({ error: 'Email service error' }, { status: 500 });
      }
    }

    // No email needed
    return NextResponse.json(
      {
        success: true,
        message: 'No notification required',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Customer Update API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
