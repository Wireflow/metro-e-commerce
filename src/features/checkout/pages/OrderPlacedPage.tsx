'use client';

import Link from 'next/link';

import { ArrowRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  orderNumber?: string;
};

const OrderPlacedPage = ({ orderNumber = '' }: Props) => {
  const [copying, setCopying] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopying(true);
      toast('Order number copied to clipboard');
      setTimeout(() => setCopying(false), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Failed to copy order number');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardContent className="space-y-6 pt-6 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Thank you for your order!</h1>

            <div className="space-y-2">
              <p className="text-muted-foreground">
                Your order has been confirmed and will be shipped within 2-3 business days.
                We&apos;ll send you tracking information once your package is on its way.
              </p>
              {orderNumber && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <p className="font-medium">
                    Order number: <span className="text-primary">{orderNumber}</span>
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted"
                    aria-label="Copy order number"
                  >
                    {copying ? (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={`/customer/dashboard`}>
              <Button variant="outline">GO TO DASHBOARD</Button>
            </Link>

            <Link href={orderNumber ? `/customer/history/${orderNumber}` : `/customer/history`}>
              <Button>
                VIEW ORDER
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPlacedPage;
