const WEBSITE_URL = origin;

export function generateWelcomeEmail(customer: {
  business_name: string;
  first_name: string;
  last_name: string;
  email: string;
}) {
  const COLORS = {
    primary: '#DC2626', // Red
    secondary: '#2563EB', // Blue
    white: '#FFFFFF',
    gray: '#6B7280',
    darkGray: '#374151',
    lightGray: '#F3F4F6',
    border: '#E5E7EB',
  };

  const businessName = customer.business_name || `${customer.first_name} ${customer.last_name}`;
  const approvalLink = `${WEBSITE_URL}/customers/approve/tobacco`;

  return {
    subject: `Welcome to Metro Cash & Carry!`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Metro Cash & Carry</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
  <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
      <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
    </div>

    <!-- Welcome Banner -->
    <div style="background-color: ${COLORS.secondary}; padding: 24px; text-align: center; color: ${COLORS.white};">
      <div style="font-size: 2.5em; margin-bottom: 12px;">👋</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to Metro Cash & Carry!</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">Dear ${businessName},</p>
      
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5;">
        Thank you for signing up with Metro Cash & Carry! To complete your registration and start shopping, please click the button below:
      </p>

      <!-- Call to Action -->
      <div style="text-align: center; padding: 24px; margin: 24px 0;">
        <a href="${approvalLink}" 
           style="display: inline-block; padding: 12px 24px; background-color: ${COLORS.primary}; color: ${COLORS.white}; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
          Complete Registration
        </a>
      </div>

      <!-- Help Section -->
      <div style="text-align: center; margin-top: 24px;">
        <p style="color: ${COLORS.gray}; font-size: 14px; line-height: 1.5; margin: 0;">
          Need help? Our customer service team is here to assist you during business hours.
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
