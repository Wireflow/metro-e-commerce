import { z } from 'zod';

const TokenSchema = z.object({
  token: z.string(),
  amount: z.string(),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'Invalid CVV')
    .optional(),
});

type TokenType = z.infer<typeof TokenSchema>;

const validatePaymentDetails = (token: TokenType) => {
  const result = TokenSchema.safeParse(token);
  if (!result.success) {
    return result.error.flatten().formErrors[0];
  }
  return null;
};

export { TokenSchema, type TokenType, validatePaymentDetails };
