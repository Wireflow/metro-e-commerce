export function generateNewSalesEmail({
  first_name,
  last_name,
  email,
  temporary_password,
  login_url,
}: {
  first_name: string;
  last_name: string;
  email: string;
  temporary_password: string;
  login_url: string;
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

  return {
    subject: `🎉 Welcome to the Metro Sales Team!`,
    html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Metro Cash & Carry Sales Team</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
    <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <!-- Header with Logo -->
      <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
        <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
      </div>
  
      <!-- Welcome Banner -->
      <div style="background-color: ${COLORS.primary}; padding: 24px; text-align: center; color: ${COLORS.white};">
        <div style="font-size: 2.5em; margin-bottom: 12px;">🎉</div>
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to the Team!</h1>
      </div>
  
      <!-- Main Content -->
      <div style="padding: 32px 24px;">
        <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">
          Hello ${first_name} ${last_name},
        </p>
        <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5;">
          Welcome to the Metro Cash & Carry Sales Team! We're excited to have you join us. Below you'll find your login credentials to access our sales portal.
        </p>
  
        <!-- Account Details Box -->
        <div style="background-color: ${COLORS.lightGray}; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h2 style="margin: 0 0 16px 0; color: ${COLORS.primary}; font-size: 20px; font-weight: bold;">Your Login Details</h2>
          <div style="border-bottom: 1px solid ${COLORS.border}; padding-bottom: 12px; margin-bottom: 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="margin-bottom: 8px;">
                <td style="color: ${COLORS.gray}; padding-bottom: 8px; width: 140px;">Email:</td>
                <td style="color: ${COLORS.darkGray}; font-weight: bold; padding-bottom: 8px; padding-left: 16px;">${email}</td>
              </tr>
              <tr>
                <td style="color: ${COLORS.gray}; width: 140px;">Temporary Password:</td>
                <td style="color: ${COLORS.primary}; font-weight: bold; padding-left: 16px;">${temporary_password}</td>
              </tr>
            </table>
          </div>
        </div>
  
        <!-- Next Steps Section -->
        <div style="text-align: center; margin-top: 32px; padding: 24px; background-color: ${COLORS.lightGray}; border-radius: 8px;">
          <h3 style="color: ${COLORS.secondary}; font-size: 18px; font-weight: bold; margin: 0 0 8px 0;">Getting Started</h3>
          <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin: 0;">
            Please download the Metro Sales App at <a href="${login_url}" style="color: ${COLORS.secondary}; text-decoration: none;">${login_url}</a> 
            and change your temporary password. 
          </p>
        </div>
  
        <!-- Additional Resources -->
        <div style="margin-top: 32px;">
          <h3 style="color: ${COLORS.darkGray}; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">What's Next?</h3>
          <ul style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Complete your profile setup in the sales app</li>
            <li style="margin-bottom: 8px;">Review our product catalog and pricing guidelines</li>
            <li>Attend your scheduled orientation session</li>
          </ul>
        </div>
      </div>
  
      <!-- Footer -->
      <div style="background-color: ${COLORS.primary}; padding: 24px; text-align: center;">
        <p style="color: ${COLORS.white}; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Metro Cash & Carry. All rights reserved.
        </p>
        <p style="color: ${COLORS.white}; font-size: 12px; margin: 8px 0 0 0;">
          If you have any questions, please contact the wholesale for help.
        </p>
      </div>
    </div>
  </body>
  </html>
      `.trim(),
  };
}
