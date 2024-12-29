'use client';

import { Animate } from '@/components/animation/Animate';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AccountDeliveryAddressForm from './forms/AccountDeliveryAddressForm';
import AccountInfoForm from './forms/AccountInfoForm';
import ChangePasswordForm from './forms/ChangePasswordForm';

const SettingsPage = () => {
  return (
    <Container>
      <Animate className="flex flex-col gap-5" type="bounce">
        <Card className="flex flex-col gap-5 shadow-none">
          <CardHeader className="border-b p-4">
            <CardTitle className="font-medium capitalize">Personal Info</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountInfoForm />
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-5 shadow-none">
          <CardHeader className="border-b p-4">
            <CardTitle className="font-medium capitalize">Business Address</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountDeliveryAddressForm />
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-5 shadow-none">
          <CardHeader className="border-b p-4">
            <CardTitle className="font-medium capitalize">Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </Animate>
    </Container>
  );
};

export default SettingsPage;
