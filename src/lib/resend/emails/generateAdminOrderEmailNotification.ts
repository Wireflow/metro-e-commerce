import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

export function generateAdminOrderEmailNotification(
  order: Row<'orders'>,
  customer: Partial<Row<'customers'>>
) {
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
    subject: `🔔 New Order Alert - #${order.order_number} | Metro Cash & Carry`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
  <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
      <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
    </div>

    <!-- Alert Banner -->
    <div style="background-color: ${COLORS.primary}; padding: 24px; text-align: center; color: ${COLORS.white};">
      <div style="font-size: 2.5em; margin-bottom: 12px;">🔔</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Order Received</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">
        A new order has been placed and requires your attention.
      </p>

      <!-- Order Details Box -->
      <div style="background-color: ${COLORS.lightGray}; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h2 style="margin: 0 0 16px 0; color: ${COLORS.primary}; font-size: 20px; font-weight: bold;">Order Details</h2>
        <div style="border-bottom: 1px solid ${COLORS.border}; padding-bottom: 12px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: ${COLORS.gray};">Order Number:</span>
            <span style="color: ${COLORS.darkGray}; font-weight: bold;">#${order.order_number}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: ${COLORS.gray};">Business Name:</span>
            <span style="color: ${COLORS.darkGray}; font-weight: bold;">${customer.business_name || 'N/A'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: ${COLORS.gray};">Order Type:</span>
            <span style="color: ${COLORS.darkGray}; font-weight: bold;">${order.type?.toUpperCase() || 'N/A'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: ${COLORS.gray};">Total Amount:</span>
            <span style="color: ${COLORS.primary}; font-weight: bold;">${formatCurrency(order.total_amount ?? 0)}</span>
          </div>
        </div>
      </div>

      <!-- Action Required Section -->
      <div style="text-align: center; margin-top: 32px; padding: 24px; background-color: ${COLORS.lightGray}; border-radius: 8px;">
        <h3 style="color: ${COLORS.secondary}; font-size: 18px; font-weight: bold; margin: 0 0 8px 0;">Action Required</h3>
        <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin: 0;">
          Please check the tablet for order details and take appropriate action.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: ${COLORS.primary}; padding: 24px; text-align: center;">
      <p style="color: ${COLORS.white}; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} Metro Cash & Carry. All rights reserved.
      </p>
      <p style="color: ${COLORS.white}; font-size: 12px; margin: 8px 0 0 0;">
        This is an automated notification. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };
}
