import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/constants';

import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';

type Props = {};

const FaqPage = (props: Props) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/fAQ' },
  ];

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container className="my-10 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        </div>
        <div className="max-w-screen-md">
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg text-neutral-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-md">{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FaqPage;
