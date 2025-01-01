import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import VerifyPhotoIdForm from '../components/forms/VerifyPhotoIdForm';

const ApprovePhotoIdPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto max-w-[500px]">
        <CardHeader>
          <CardTitle>Verify Photo Id</CardTitle>
          <CardDescription>Please verify your Photo Id to continue</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <VerifyPhotoIdForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovePhotoIdPage;
