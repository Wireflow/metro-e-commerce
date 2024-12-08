import Link from 'next/link';

import { Animate } from '@/components/animation/Animate';
import QuickAlert from '@/components/quick/QuickAlert';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';

const RequestTobaccoApproval = () => {
  const { isLoading, metadata } = useUser();

  if (isLoading) return null;

  if (!!metadata?.approved_tobacco) return null;

  const isBeingApproved =
    !metadata?.approved_tobacco &&
    !!metadata?.tobacco_license &&
    !!metadata?.tobacco_license_image_url;

  return (
    <Animate type="bounce">
      <QuickAlert
        className="flex flex-col justify-between md:flex-row"
        variant={isBeingApproved ? 'info' : undefined}
        title={
          isBeingApproved ? 'Tobacco approval under review!' : 'Want to purchase tobacco products?'
        }
        description={
          isBeingApproved
            ? 'We have received your request. Your tobacco license will be reviewed shortly.'
            : 'Please request approval by submiting our request form with your license.'
        }
      >
        {!isBeingApproved && (
          <Link href={'/customers/approve/tobacco'} target="_blank">
            <Button variant={'black'} size={'sm'} className="w-full md:w-auto">
              Request Approval
            </Button>
          </Link>
        )}
      </QuickAlert>
    </Animate>
  );
};

export default RequestTobaccoApproval;
