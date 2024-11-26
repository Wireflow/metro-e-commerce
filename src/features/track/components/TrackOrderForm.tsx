'use client';
import { useRouter } from 'next/navigation';

import { ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import AnimtedLoadingSpinner from '@/components/animation/AnimtedLoader';
import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useOrderTracking } from '../hooks/queries/track-query-hooks';

const TrackOrderForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data, isLoading, refetch } = useOrderTracking({
    orderNumber: parseInt(inputValue) || 0,
    enabled: false,
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Track Order', href: '/track' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleTrackingRedirect = async () => {
    if (!inputValue) {
      toast.error('Please enter an order ID');
      return;
    }

    const numberValue = Number(inputValue);
    if (isNaN(numberValue)) {
      toast.error('Please enter a valid order ID');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await refetch();

      if (result.data) {
        toast.success('Order found');
        // Add a delay before redirecting
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push(`/track/${numberValue}`);
      } else {
        toast.error('Order not found. Please check the order ID and try again.');
      }
    } catch (error) {
      toast.error('Error checking order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container className="my-10 flex flex-col gap-5">
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
              disabled={isSubmitting}
              value={inputValue}
              placeholder="Enter your order ID"
              className="max-w-screen-sm"
              onChange={handleInputChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleTrackingRedirect();
                }
              }}
            />
            {(isSubmitting || isLoading) && <AnimtedLoadingSpinner size={30} />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-neutral-500" />
          <p className="md:text-md text-sm text-neutral-600">
            Order ID that we sent to your email address.
          </p>
        </div>
        <Button onClick={handleTrackingRedirect} className="md:text-md w-fit">
          Track Order <ArrowRight className="ml-2" />
        </Button>
      </Container>
    </div>
  );
};

export default TrackOrderForm;
