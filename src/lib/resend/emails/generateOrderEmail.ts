import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

export function generateOrderEmail(order: Row<'orders'>, customer: Partial<Row<'customers'>>) {
  // Skip email for 'created' status
  const status = order.status;
  const businessName = customer.business_name || 'Valued Customer';
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.total_amount || 0);

  const COLORS = {
    primary: '#DC2626', // Red
    secondary: '#2563EB', // Blue
    white: '#FFFFFF',
    gray: '#6B7280',
    darkGray: '#374151',
    lightGray: '#F3F4F6',
    border: '#E5E7EB',
  };

  const getStatusColor = (status: Partial<Enum<'order_status'>>) => {
    const colors: Record<Enum<'order_status'>, string> = {
      pending: COLORS.gray,
      confirmed: COLORS.secondary,
      preparing: COLORS.secondary,
      ready: COLORS.primary,
      completed: COLORS.primary,
      cancelled: COLORS.gray,
      refunded: COLORS.gray,
      created: COLORS.gray,
    };
    return colors[status];
  };

  const getStatusIcon = (status: Partial<Enum<'order_status'>>) => {
    const icons: Record<Enum<'order_status'>, string> = {
      pending: '⏳',
      confirmed: '✅',
      preparing: '🔧',
      ready: '📦',
      completed: '🎉',
      cancelled: '❌',
      refunded: '💰',
      created: '📝',
    };
    return icons[status];
  };

  const getStatusContent = (status: Partial<Enum<'order_status'>>) => {
    const content: Record<Enum<'order_status'>, { title: string; message: string }> = {
      pending: {
        title: 'Order Received',
        message: `We've received your order #${order.order_number} for ${formattedAmount}. We'll process your order shortly and send you a confirmation.`,
      },
      confirmed: {
        title: 'Order Confirmed',
        message: `Great news! Your order #${order.order_number} has been confirmed and is being processed. Expected delivery: ${new Date(order.expected_delivery_at || '').toLocaleDateString()}`,
      },
      preparing: {
        title: 'Preparing Your Order',
        message: `We're now preparing your order #${order.order_number}. We'll notify you once it's ready for ${order.type === 'pickup' ? 'pickup' : 'delivery'}.`,
      },
      ready: {
        title: 'Order Ready',
        message: `Your order #${order.order_number} is ready for ${order.type === 'pickup' ? 'pickup at our store' : 'delivery to your location'}. ${order.type === 'pickup' ? 'Please visit our store during business hours.' : 'Our delivery team will arrive shortly.'}`,
      },
      completed: {
        title: 'Order Completed',
        message: `Thank you for shopping with Metro Cash & Carry! Your order #${order.order_number} has been successfully completed. We appreciate your business!`,
      },
      cancelled: {
        title: 'Order Cancelled',
        message: `Your order #${order.order_number} has been cancelled. If you didn't request this cancellation, please contact our support team immediately.`,
      },
      refunded: {
        title: 'Refund Processed',
        message: `We've processed a refund of ${formattedAmount} for order #${order.order_number}. The amount will be credited to your original payment method within 3-5 business days.`,
      },
      created: {
        title: 'Order Created',
        message: `Your order #${order.order_number} has been created.`,
      },
    };
    return content[status];
  };

  const statusContent = getStatusContent(status);

  return {
    subject: `${statusContent.title} - Order #${order.order_number} | Metro Cash & Carry`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${statusContent.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${COLORS.lightGray};">
  <div style="max-width: 600px; margin: 20px auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border};">
      <img src="https://syujykwodwxorrqzvcto.supabase.co/storage/v1/object/public/logos/metro-logo.png" alt="Metro Cash & Carry" style="height: 50px; width: auto;">
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${getStatusColor(status)}; padding: 24px; text-align: center; color: ${COLORS.white};">
      <div style="font-size: 2.5em; margin-bottom: 12px;">${getStatusIcon(status)}</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${statusContent.title}</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5; margin-top: 0;">Dear ${businessName},</p>
      <p style="color: ${COLORS.darkGray}; font-size: 16px; line-height: 1.5;">${statusContent.message}</p>

      <!-- Order Details Box -->
      <div style="background-color: ${COLORS.lightGray}; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h2 style="margin: 0 0 16px 0; color: ${COLORS.primary}; font-size: 20px; font-weight: bold;">Order Summary</h2>
        <div style="border-bottom: 1px solid ${COLORS.border}; padding-bottom: 12px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: ${COLORS.gray};">Order Number:</span>
            <span style="color: ${COLORS.darkGray}; font-weight: bold;">#${order.order_number}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: ${COLORS.gray};">Total Amount:</span>
            <span style="color: ${COLORS.primary}; font-weight: bold;">${formattedAmount}</span>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid ${COLORS.border};">
        <h3 style="color: ${COLORS.secondary}; font-size: 18px; font-weight: bold; margin-bottom: 8px;">Need Assistance?</h3>
        <p style="color: ${COLORS.gray}; font-size: 14px; line-height: 1.5; margin: 0;">
          Our customer service team is here to help! Contact us during business hours.
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
