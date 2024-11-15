import { Order } from '@/features/orders/schemas/orders';

export const APPROVED_ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

export const filterApprovedOrders = (orders: Order[]) => {
  return orders.filter(order => APPROVED_ORDER_STATUSES.includes(order.status));
};

export const calculateTotalSales = (orders: Order[]) => {
  const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  return totalSales;
};

export const calculateAverageOrderValue = (orders: Order[]) => {
  const totalSales = calculateTotalSales(orders);

  return totalSales / orders.length;
};
