'use client';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AccountDeliveryAddressForm from './forms/AccountDeliveryAddressForm';
import AccountInfoForm from './forms/AccountInfoForm';

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <Container className="flex flex-col gap-5">
      <Card className="flex flex-col gap-5">
        <CardHeader className="border-b p-4">
          <CardTitle className="font-medium capitalize">Personal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountInfoForm />
        </CardContent>
      </Card>
      <Card className="flex flex-col gap-5">
        <CardHeader className="border-b p-4">
          <CardTitle className="font-medium capitalize">Business Address</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountDeliveryAddressForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;
