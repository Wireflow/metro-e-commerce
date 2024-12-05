'use client';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/constants';
import { useBranch } from '@/hooks/queries/useMetro';
import { formatPhoneNumber } from '@/utils/utils';

import Animate from '../animation/Animate';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import { Card, CardContent, CardHeader } from '../ui/card';

type Props = {};

const FaqPage = (props: Props) => {
  const { branch } = useBranch();
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/fAQ' },
  ];

  return (
    <div className="min-h-screen">
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container className="px-4 sm:px-6 lg:px-8">
        <Animate type="bounce" className="flex flex-col gap-8 py-10 lg:flex-row lg:gap-14">
          {/* FAQ Section */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <h1 className="mb-6 text-2xl font-semibold sm:text-3xl md:mb-10">
              Frequently Asked Questions
            </h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Accordion key={index} type="single" collapsible className="w-full">
                  <AccordionItem value={faq.question}>
                    <AccordionTrigger className="text-left text-base text-neutral-700 transition-colors hover:text-neutral-900 sm:text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm text-neutral-600 sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <Card className="w-ful bg-yellow-100">
              <CardHeader className="border-b border-border p-4">
                <h2 className="text-xl font-semibold">Need More Help?</h2>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {/* Order Tracking Section */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold">Need help tracking your order?</h3>
                  <p className="text-sm">
                    Visit our{' '}
                    <Link href="/track" className="text-theme-sky-blue hover:underline">
                      Order Tracking
                    </Link>{' '}
                    page
                  </p>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm font-bold">
                    Couldnt find the answer you are looking for?
                  </h1>
                  <p className="text-sm">
                    Send us an email and we will get back to you as soon as possible.{' '}
                    <span className="text-theme-sky-blue">{branch?.email}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm font-semibold">Need to talk to a human?</h1>
                  <p className="text-sm">
                    Call us now (available between 9am-5pm EST){' '}
                    <span className="text-theme-sky-blue">{formatPhoneNumber(branch?.phone)}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Animate>
      </Container>
    </div>
  );
};

export default FaqPage;
