import { ISOStringFormat } from 'date-fns';

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
