'use client';
import { useRouter } from 'next/navigation';

import { ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Animate } from '@/components/animation/Animate';
import AnimtedLoadingSpinner from '@/components/animation/AnimtedLoader';
import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useOrderTracking } from '../hooks/queries/track-query-hooks';

const TrackOrderForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();

  const { isLoading, refetch } = useOrderTracking({
    orderNumber: inputValue ?? 0,
    enabled: false,
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Track Order', href: '/track' },
  ];

  const formatOrderNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as YYMMDD-XXXXX
    if (digits.length <= 6) {
      return digits;
    } else {
      const prefix = digits.slice(0, 6);
      const suffix = digits.slice(6, 11);
      return `${prefix}-${suffix}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatOrderNumber(e.target.value);
    setInputValue(formattedValue);
  };

  const validateOrderNumber = (value: string): boolean => {
    const pattern = /^\d{6}-\d{5}$/;
    return pattern.test(value);
  };

  const handleTrackingRedirect = async () => {
    if (!inputValue) {
      toast.error('Please enter an order ID');
      return;
    }

    if (!validateOrderNumber(inputValue)) {
      toast.error('Please enter a valid order ID in the format YYMMDD-XXXXX');
      return;
    }

    try {
      const result = await refetch();

      if (result.data) {
        toast.success('We have found your order! Redirecting you to the order page...');
        router.push(`/track/${inputValue}`);
      } else {
        toast.error('Order not found. Please check the order ID and try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error checking order. Please try again.');
    }
  };

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container>
        <Animate type="bounce" className="my-10 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Track Order</h1>
            <p className="md:text-md max-w-screen-md text-sm text-neutral-600">
              To track your order please enter your order ID in the input field below and press the
              &quot;Track Order&quot; button. This was given to you in the confirmation email you
              should have received.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Order ID</p>
            <div className="flex items-center gap-2">
              <Input
                disabled={isLoading}
                value={inputValue}
                placeholder="Example: 241207-00003"
                className="max-w-screen-sm"
                onChange={handleInputChange}
                maxLength={12}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleTrackingRedirect();
                  }
                }}
              />
              {isLoading && <AnimtedLoadingSpinner size={30} />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-neutral-500" />
            <p className="md:text-md text-sm text-neutral-600">
              Enter your order ID in the format YYMMDD-XXXXX (e.g., 241207-00003).
            </p>
          </div>
          <Button onClick={handleTrackingRedirect} className="md:text-md w-fit">
            Track Order <ArrowRight className="ml-2" />
          </Button>
        </Animate>
      </Container>
    </div>
  );
};

export default TrackOrderForm;
