import { Clock } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WithAuth from '@/features/auth/components/WithAuth';

import Container from './Container';

type Props = {
  submissionDate?: string; // Optional date when the info was submitted
  className?: string;
};

const PendingApproval = ({ submissionDate, className }: Props) => {
  const formattedDate = submissionDate ? new Date(submissionDate).toLocaleDateString() : null;

  return (
    <WithAuth
      rules={{
        customCheck: m => !m.approved && !!m.tax_id && !!m.tax_id_image_url,
      }}
    >
      <Container>
        <Alert
          variant="default"
          className={`mb-4 border-yellow-200 bg-yellow-50 text-yellow-800 ${className}`}
        >
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <AlertTitle className="mb-1 font-semibold text-yellow-800">
                Account Pending Approval
              </AlertTitle>
              <AlertDescription className="text-yellow-700">
                <p>
                  Your account information has been submitted and is currently under review.
                  {formattedDate && ` Submitted on ${formattedDate}.`} We&apos;ll notify you once
                  the review is complete.
                </p>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </Container>
    </WithAuth>
  );
};

export default PendingApproval;
