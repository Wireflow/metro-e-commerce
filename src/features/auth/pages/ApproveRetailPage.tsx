import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import VerifyTaxIDForm from '../components/forms/VerifyTaxIDForm';

const ApproveRetailPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto max-w-[500px]">
        <CardHeader>
          <CardTitle>Verify your tax ID</CardTitle>
          <CardDescription>Please verify your tax ID to continue</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <VerifyTaxIDForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApproveRetailPage;
