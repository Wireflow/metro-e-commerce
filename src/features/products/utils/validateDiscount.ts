import { isAfter, isEqual, ISOStringFormat, startOfDay } from 'date-fns';

import { Product } from '../schemas/products';

export const isDiscountValid = (
  discount: number | null,
  discountedUntil: ISOStringFormat | null
) => {
  if (!discount || !discountedUntil) {
    return false;
  }

  const now = new Date();
  const discountedUntilDate = new Date(discountedUntil);

  if (discountedUntilDate < now) {
    return false;
  }

  return true;
};

export const validateProductDiscount = (product?: Product) => {
  if (!product) return false;

  const hasActiveDiscount =
    (product?.retail_discount ?? 0) > 0 || (product?.wholesale_discount ?? 0) > 0;

  if (!hasActiveDiscount || !product?.discounted_until) {
    return false;
  }

  const discountEndDate = startOfDay(new Date(product?.discounted_until));
  const today = startOfDay(new Date());

  return isAfter(discountEndDate, today) || isEqual(discountEndDate, today);
};
