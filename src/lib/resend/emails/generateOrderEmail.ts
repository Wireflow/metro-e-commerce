import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

export function generateOrderEmail(
  status: Enum<'order_status'>,
  order: Row<'orders'>,
  customer: Partial<Row<'customers'>>
) {
  const businessName = customer.business_name || 'Valued Customer';
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.total_amount || 0);

  const getStatusColor = (status: Enum<'order_status'>) => {
    const colors: Record<Enum<'order_status'>, string> = {
      pending: '#6B7280', // Gray
      confirmed: '#2563EB', // Blue
      preparing: '#7C3AED', // Purple
      ready: '#059669', // Green
      completed: '#059669', // Green
      cancelled: '#DC2626', // Red
      refunded: '#D97706', // Orange
      created: '#D97706', // Orange
    };
    return colors[status];
  };

  const getStatusIcon = (status: Enum<'order_status'>) => {
    const icons: Record<Enum<'order_status'>, string> = {
      pending: '⏳',
      confirmed: '✅',
      preparing: '🔧',
      ready: '📦',
      completed: '🎉',
      cancelled: '❌',
      refunded: '💰',
      created: '💰',
    };
    return icons[status];
  };

  const getStatusContent = (status: Enum<'order_status'>) => {
    const content: Record<Enum<'order_status'>, { title: string; message: string }> = {
      pending: {
        title: 'Thank you for your order!',
        message: `We've received your order #${order.order_number} for ${formattedAmount}. We'll process your order shortly and send you a confirmation.`,
      },
      confirmed: {
        title: 'Your order has been confirmed!',
        message: `Your order #${order.order_number} has been confirmed and is being processed. Expected delivery: ${new Date(order.expected_delivery_at || '').toLocaleDateString()}`,
      },
      preparing: {
        title: "We're preparing your order!",
        message: `Good news! Your order #${order.order_number} is now being prepared. We'll notify you once it's ready for pickup/delivery.`,
      },
      ready: {
        title: 'Your order is ready!',
        message: `Your order #${order.order_number} is ready for ${order.type === 'pickup' ? 'pickup' : 'delivery'}. ${order.type === 'pickup' ? 'You can pick up your order at our store during business hours.' : 'Our delivery team will deliver your order soon.'}`,
      },
      completed: {
        title: 'Order Completed',
        message: `Your order #${order.order_number} has been completed. Thank you for choosing Metro Cash & Carry! We'd love to hear about your experience.`,
      },
      cancelled: {
        title: 'Order Cancelled',
        message: `Your order #${order.order_number} has been cancelled. If you didn't request this cancellation or have any questions, please contact our support team.`,
      },
      refunded: {
        title: 'Order Refunded',
        message: `A refund has been processed for your order #${order.order_number}. The refunded amount of ${formattedAmount} will be credited back to your original payment method. Please allow 3-5 business days for the refund to appear in your account.`,
      },
      created: {
        title: 'Order Created',
        message: `Your order #${order.order_number} has been created. We'll notify you once it's ready for pickup/delivery.`,
      },
    };
    return content[status];
  };

  const statusContent = getStatusContent(status);

  return {
    subject: `${statusContent.title} - #${order.order_number}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 20px; background-color: white; border-bottom: 1px solid #e5e7eb;">
      <img src="/logo.png" alt="Metro Cash & Carry" style="height: 40px; width: auto;">
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${getStatusColor(status)}; padding: 20px; text-align: center; color: white;">
      <div style="font-size: 2em; margin-bottom: 10px;">${getStatusIcon(status)}</div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">${statusContent.title}</h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      <p style="color: #374151; font-size: 16px; line-height: 24px; margin-top: 0;">Dear ${businessName},</p>
      <p style="color: #374151; font-size: 16px; line-height: 24px;">${statusContent.message}</p>

      <!-- Order Details Box -->
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Order Details</h2>
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #6b7280;">Order Number:</span>
            <span style="color: #111827; font-weight: 500;">#${order.order_number}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #6b7280;">Total Amount:</span>
            <span style="color: #111827; font-weight: 500;">${formattedAmount}</span>
          </div>
        </div>
      </div>

      <!-- Need Help Section -->
      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Need Help?</h3>
        <p style="color: #6b7280; font-size: 14px; line-height: 20px; margin: 0;">
          If you have any questions about your order, please contact our support team.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} Metro Cash & Carry. All rights reserved.
      </p>
      <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };
}
