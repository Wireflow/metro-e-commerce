import { Row } from '@/types/supabase/table';

interface ShippingEmailProps {
  shipping: Row<'order_shipping'>;
  order: Row<'orders'>;
  customer: Partial<Row<'customers'>>;
}

export function generateShippingEmail({ shipping, order, customer }: ShippingEmailProps) {
  const businessName = customer.business_name || 'Valued Customer';
  const formattedShippingDate = new Date(shipping.shipped_at).toLocaleDateString();
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.total_amount || 0);

  const COLORS = {
    primary: '#DC2626',
    secondary: '#2563EB',
    white: '#FFFFFF',
    gray: '#6B7280',
    darkGray: '#374151',
    lightGray: '#F3F4F6',
    border: '#E5E7EB',
  };

  return {
    subject: `Order Shipped - Order #${order.order_number} | Metro Cash & Carry`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
  <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
      <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${COLORS.secondary}; padding: 24px; text-align: center; color: ${COLORS.white};">
      <div style="font-size: 2.5em; margin-bottom: 12px;">🚚</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your Order Has Been Shipped!</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">Dear ${businessName},</p>
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5;">
        Great news! Your order #${order.order_number} has been shipped and is on its way to you. You can track your package using the details below.
      </p>

      <!-- Shipping Details Box -->
      <div style="background-color: ${COLORS.lightGray}; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h2 style="margin: 0 0 16px 0; color: ${COLORS.primary}; font-size: 20px; font-weight: bold;">Shipping Details</h2>
        <div style="border-bottom: 1px solid ${COLORS.border}; padding-bottom: 12px; margin-bottom: 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="margin-bottom: 8px;">
              <td style="color: ${COLORS.gray}; padding-bottom: 8px; width: 140px;">Order Number:</td>
              <td style="color: ${COLORS.darkGray}; font-weight: bold; padding-bottom: 8px; padding-left: 16px;">#${order.order_number}</td>
            </tr>
            <tr style="margin-bottom: 8px;">
              <td style="color: ${COLORS.gray}; padding-bottom: 8px; width: 140px;">Shipped Date:</td>
              <td style="color: ${COLORS.darkGray}; font-weight: bold; padding-bottom: 8px; padding-left: 16px;">${formattedShippingDate}</td>
            </tr>
            <tr style="margin-bottom: 8px;">
              <td style="color: ${COLORS.gray}; padding-bottom: 8px; width: 140px;">Carrier:</td>
              <td style="color: ${COLORS.darkGray}; font-weight: bold; padding-bottom: 8px; padding-left: 16px;">${shipping.provider}</td>
            </tr>
            <tr style="margin-bottom: 8px;">
              <td style="color: ${COLORS.gray}; padding-bottom: 8px; width: 140px;">Tracking Number:</td>
              <td style="color: ${COLORS.secondary}; font-weight: bold; padding-bottom: 8px; padding-left: 16px;">${shipping.tracking_number}</td>
            </tr>
            <tr>
              <td style="color: ${COLORS.gray}; width: 140px;">Total Amount:</td>
              <td style="color: ${COLORS.primary}; font-weight: bold; padding-left: 16px;">${formattedAmount}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Tracking Instructions -->
      <div style="background-color: ${COLORS.lightGray}; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h3 style="margin: 0 0 12px 0; color: ${COLORS.secondary}; font-size: 18px; font-weight: bold;">Track Your Package</h3>
        <p style="color: ${COLORS.darkGray}; font-size: 14px; line-height: 1.5; margin: 0;">
          To track your package, visit ${shipping.provider}'s website and enter your tracking number:
          <span style="display: block; margin-top: 8px; font-weight: bold; color: ${COLORS.secondary};">${shipping.tracking_number}</span>
        </p>
      </div>

      <!-- Help Section -->
      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid ${COLORS.border};">
        <h3 style="color: ${COLORS.secondary}; font-size: 18px; font-weight: bold; margin-bottom: 8px;">Questions About Your Shipment?</h3>
        <p style="color: ${COLORS.gray}; font-size: 14px; line-height: 1.5; margin: 0;">
          Our customer service team is here to help! Contact us during business hours if you need assistance tracking your package.
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
