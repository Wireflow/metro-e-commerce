import Image from 'next/image';

import { Card } from '@/components/ui/card';

const SupportedPayments = () => {
  return (
    <Card className="p-4 shadow-none">
      <p className="mb-2 text-sm font-medium text-gray-700">100% Guarantee Safe Checkout</p>
      <div className="relative h-[30px] w-full">
        <Image
          src="/supported-payments.jpg" // Replace with your actual image path
          alt="Accepted payment methods - Visa, Mastercard, PayPal, American Express and more"
          className="-ml-2 -mt-1 object-contain"
          width={250} // Adjust based on your image's actual dimensions
          height={30}
        />
      </div>
    </Card>
  );
};

export default SupportedPayments;
