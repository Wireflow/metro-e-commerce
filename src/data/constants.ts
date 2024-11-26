export const METRO_BRANCH_ID = process.env.NEXT_PUBLIC_METRO_BRANCH_ID!;

export const ACCOUNT_TYPES = [
  {
    type: 'retail',
    label: 'Retail Business Account',
    description:
      'For stores and gas stations purchasing at retail pricing for direct sales to consumers.',
  },
  {
    type: 'wholesale',
    label: 'Wholesale Business Account',
    description: 'For businesses purchasing in higher quantities with access to wholesale pricing.',
  },
];

export const STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

// Optional: Add type for state values
export type StateValue = (typeof STATES)[number]['value'];

export const PLACEHOLDER_IMG_URL = '/placeholder.webp';

export const faqs = [
  {
    question: 'What do i need to know before signing up?',
    answer:
      'We offer two types of accounts: Retail and Wholesale. Retail accounts are for individual business owners and smaller operations. Wholesale accounts are for larger businesses looking to purchase in bulk at wholesale prices. Both account types require business verification, including business name, address, phone number, and Tax ID/EIN. Additional documentation like tobacco licenses may be required depending on the products you plan to sell.',
  },
  {
    question: 'What is the difference between Retail and Wholesale accounts?',
    answer:
      'Retail accounts are designed for smaller businesses with standard pricing and order minimums. Wholesale accounts offer bulk pricing advantages and are intended for larger volume purchases. Both require business verification, but wholesale accounts may have additional verification requirements and different minimum order quantities.',
  },
  {
    question: 'What information do I need to create an account?',
    answer:
      'To create either a retail or wholesale account, you will need to provide: email, password, business name, phone number, complete business address (including city, state, zip code, and country), Tax ID/EIN (9 digits), and agree to the terms of service. If you sell tobacco products, you must also provide a valid tobacco license. All fields are mandatory for account creation.',
  },
  {
    question: "Why can't I see product prices?",
    answer:
      'Product prices are only visible to registered and logged-in users. Once you create and verify either a retail or wholesale account and log in, pricing will be displayed according to your account type.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'To track an order: 1) Navigate to the "Track Orders" page, 2) Enter your order number in the tracking field, 3) The system will display detailed information about your order\'s current status. You must have the order number ready to track your shipment.',
  },
  {
    question: 'What is the difference between a delivery and a pickup order?',
    answer:
      "A delivery order is shipped directly to your registered business address. A pickup order requires you to collect the package from our designated pickup location. Both options are available during checkout once you're logged into your account.",
  },
  {
    question: 'How do I cancel an order?',
    answer:
      'For wholesale orders, you must call our wholesale department within 1 hour of placing your order to request cancellation. Orders cannot be cancelled after this 1-hour window or once they have entered the shipping phase. No online cancellations are available - you must call to process any cancellation requests.',
  },
  {
    question: 'What documents are required for account verification?',
    answer:
      'Required documents include: valid Tax ID/EIN, business license, and any relevant industry-specific licenses (such as a tobacco license if you sell tobacco products). Wholesale accounts may require additional documentation to verify business size and volume. All documents must be current and valid for your account to be approved.',
  },
  {
    question: 'How long does account verification take?',
    answer:
      'Account verification typically takes 1-2 business days after all required documents have been submitted. This includes verification of your Tax ID/EIN and any additional licenses. You will receive an email notification once your account has been verified.',
  },
  {
    question: 'What are the password requirements?',
    answer:
      'Passwords must be at least 8 characters long. We recommend using a combination of uppercase and lowercase letters, numbers, and special characters for enhanced security.',
  },
  {
    question: 'What if my Tax ID/EIN is rejected?',
    answer:
      'If your Tax ID/EIN is rejected, please verify that you have entered exactly 9 digits and that the number matches your official business documentation. If the issue persists, contact our support team for assistance.',
  },
];

export const ourFeatures = [
  {
    title: 'Fast and Efficient Delivery',
  },
  {
    title: 'High-Quality Products',
  },
  {
    title: 'Exceptional Customer Service',
  },
  {
    title: 'Reliable Pricing',
  },
];
