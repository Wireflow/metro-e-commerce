import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import VerifyTobaccoLicenseForm from '../components/forms/VerifyTobaccoLicenseForm';

const ApproveTobaccoPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto max-w-[500px]">
        <CardHeader>
          <CardTitle>Verify Tobacco License</CardTitle>
          <CardDescription>
            Please verify your Tobacco License to continue (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <VerifyTobaccoLicenseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApproveTobaccoPage;
