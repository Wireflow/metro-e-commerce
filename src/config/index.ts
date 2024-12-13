export const config = {
  stripe: {
    apiKey: process.env.STRIPE_API_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },
  usaepay: {
    apiKey: process.env.USAEPAY_API_KEY,
    pin: process.env.USAEPAY_PIN,
    apiUrl: process.env.USAEPAY_API_URL,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
    fromName: process.env.RESEND_FROM_NAME,
  },
  baseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'localhost:3000',
};
