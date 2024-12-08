const WEBSITE_URL = 'https://wholesale.metro.com.lb';

type ApprovalEmailProps = {
  business_name: string;
  first_name: string;
  last_name: string;
  email: string;
  approval_type: 'tax_id' | 'tobacco_license' | 'tax_id_pending' | 'tobacco_pending';
};

export function generateApprovalEmail({
  business_name,
  first_name,
  last_name,
  approval_type,
}: ApprovalEmailProps) {
  const COLORS = {
    primary: '#DC2626',
    secondary: '#2563EB',
    white: '#FFFFFF',
    gray: '#6B7280',
    darkGray: '#374151',
    lightGray: '#F3F4F6',
    border: '#E5E7EB',
    success: '#059669',
  };

  const businessName = business_name || `${first_name} ${last_name}`;

  const getApprovalContent = (type: typeof approval_type) => {
    const content = {
      tax_id: {
        subject: 'Tax ID Approved - Metro Cash & Carry',
        title: 'Tax ID Approved! 🎉',
        message:
          'Great news! Your tax ID has been verified and approved. You can now access wholesale pricing and exclusive business benefits.',
        color: COLORS.success,
      },
      tobacco_license: {
        subject: 'Tobacco License Approved - Metro Cash & Carry',
        title: 'Tobacco License Approved! 🎉',
        message:
          'Congratulations! Your tobacco license has been verified and approved. You can now purchase tobacco products from our catalog.',
        color: COLORS.success,
      },
      tax_id_pending: {
        subject: 'Tax ID Under Review - Metro Cash & Carry',
        title: 'Tax ID Under Review',
        message:
          "We have received your tax ID and supporting documents. Our team will review them shortly. We'll notify you once the verification is complete.",
        color: COLORS.secondary,
      },
      tobacco_pending: {
        subject: 'Tobacco License Under Review - Metro Cash & Carry',
        title: 'Tobacco License Under Review',
        message:
          "We have received your tobacco license and supporting documents. Our team will review them shortly. We'll notify you once the verification is complete.",
        color: COLORS.secondary,
      },
    };

    return content[type];
  };

  const content = getApprovalContent(approval_type);

  return {
    subject: content.subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
  <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
      <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${content.color}; padding: 24px; text-align: center; color: ${COLORS.white};">
      <div style="font-size: 2.5em; margin-bottom: 12px;">
        ${approval_type.includes('pending') ? '⏳' : '✅'}
      </div>
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.title}</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">Dear ${businessName},</p>
      
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5;">
        ${content.message}
      </p>

      <!-- Help Section -->
      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid ${COLORS.border};">
        <p style="color: ${COLORS.gray}; font-size: 14px; line-height: 1.5; margin: 0;">
          If you have any questions, our customer service team is here to help during business hours.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: ${COLORS.primary}; padding: 24px; text-align: center;">
      <p style="color: ${COLORS.white}; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} Metro Cash & Carry. All rights reserved.
      </p>
      <p style="color: ${COLORS.white}; font-size: 12px; margin: 8px 0 0 0;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };
}
