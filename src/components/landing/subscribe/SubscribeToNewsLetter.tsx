'use client';

import { useMutation } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBranch } from '@/hooks/queries/useMetro';
import { createSubscription } from '@/server/subscribe/createSubscription';

const SubscribeToNewsLetter = () => {
  const [email, setEmail] = useState('');
  const { branch } = useBranch();

  const { mutate: subscribeToNewsletter, isPending } = useMutation({
    mutationKey: ['newsletter'],
    mutationFn: () => {
      return createSubscription(email, branch?.id as string);
    },
    onSuccess: () => {
      setEmail('');
      toast.success('You have successfully subscribed to our newsletter');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && branch?.id) {
      subscribeToNewsletter();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-theme-secondary py-10">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-semibold text-white md:text-3xl">Subscribe to our newsletter</p>
        <p className="w-[370px] text-center text-[13px] text-gray-400 md:w-[550px]">
          By subscribing, you agree to our terms and conditions, privacy policy, and cookie policy.
          You will receive our latest news, promotions, and exclusive offers.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="md:w-[550px]">
        <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-white px-2 py-2">
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border-none focus-visible:ring-0"
            placeholder="Email address"
            required
          />
          <Button type="submit">
            {isPending ? 'Subscribing...' : 'Subscribe'}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubscribeToNewsLetter;
