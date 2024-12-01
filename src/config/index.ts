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
};
