import { Ban, Clock, FileText, Mail, MapPin, Phone, ShieldCheck, Store } from 'lucide-react';

import ImageViewer from '@/components/quick/ImageViewer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Customer } from '../schemas/customer';
import ApproveCustomerDialog from './ApproveCustomerDialog';
import ApproveTobaccoDialog from './ApproveTobaccoDialog';
import ResetCustomerDocuments from './ResetCustomerDocuments';

type Props = {
  customer: Customer;
  onApprove?: () => void;
  onApproveTobacco?: () => void;
  onResetDocuments?: () => void;
  isMutating?: boolean;
  onBlock?: () => void;
};

const CustomerProfile = ({
  customer,
  onApprove,
  onResetDocuments,
  onBlock,
  isMutating,
  onApproveTobacco,
}: Props) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = () => {
    if (customer.blocked) {
      return (
        <Badge variant="destructive" className="font-medium">
          Blocked
        </Badge>
      );
    }
    if (customer.approved) {
      return <Badge className="bg-emerald-500 font-medium hover:bg-emerald-600">Approved</Badge>;
    }
    return (
      <Badge variant="secondary" className="font-medium">
        Pending Approval
      </Badge>
    );
  };

  const getCustomerTypeBadge = () => {
    const badgeClasses = 'font-medium';
    switch (customer.customer_type) {
      case 'retail':
        return (
          <Badge variant="outline-info" className={badgeClasses}>
            Retail Account
          </Badge>
        );
      case 'wholesale':
        return (
          <Badge variant="outline-info" className={badgeClasses}>
            Wholesale Account
          </Badge>
        );
      default:
        return null;
    }
  };

  const getBelongsToBadge = () => {
    if (!customer.belongs_to) return null;

    return (
      <Badge variant="info" className="font-medium">
        {customer.belongs_to === 'wholesale' ? 'Website Customer' : 'Sales Rep Customer'}
      </Badge>
    );
  };

  return (
    <Card className="row-span-2 h-full border-border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {customer.first_name} {customer.last_name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {getCustomerTypeBadge()}
                {getBelongsToBadge()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end">
                {getStatusBadge()}
                <span className="text-sm text-muted-foreground">
                  ID: {customer.id?.slice(0, 8)}
                </span>
              </div>
              <div className="flex flex-col gap-2 lg:flex-row lg:justify-end">
                {!customer.blocked && onApprove && onApproveTobacco && (
                  <>
                    <ApproveCustomerDialog
                      onApprove={onApprove}
                      onReject={onApprove}
                      isMutating={isMutating ?? false}
                      customer={customer}
                    />
                    <ApproveTobaccoDialog
                      onApprove={onApproveTobacco}
                      onReject={onApproveTobacco}
                      isMutating={isMutating ?? false}
                      customer={customer}
                    />
                  </>
                )}

                <Button variant="destructive" size="sm" onClick={onBlock} disabled={isMutating}>
                  <Ban className="h-4 w-4" />
                  {customer.blocked ? 'Unblock' : 'Block'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {customer.business_name && (
            <>
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <span className="text-base font-medium sm:text-lg">{customer.business_name}</span>
              </div>
              <Separator />
            </>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
              Contact Information
            </h3>
            <div className="space-y-3">
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="break-all text-sm sm:text-base">{customer.email}</span>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base">{customer.phone}</span>
                </div>
              )}
              {customer.street && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base">
                    {customer.street}, {customer.city}, {customer.state} {customer.zip_code}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
                Business Details
              </h3>
              <div>
                {!customer.blocked && (
                  <ResetCustomerDocuments
                    onResetDocuments={() => onResetDocuments?.()}
                    isResetting={isMutating!}
                  />
                )}
              </div>
            </div>
            <div className="space-y-3">
              {customer.tax_id && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base">Tax ID: {customer.tax_id}</span>
                </div>
              )}
              {customer.tobacco_license && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base">
                    Tobacco License: {customer.tobacco_license}
                  </span>
                </div>
              )}
              {(customer.tobacco_license_image_url || customer.tax_id_image_url) && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {customer.tobacco_license_image_url && (
                    <div>
                      <span className="mb-1 block text-sm text-muted-foreground">
                        Tobacco License
                      </span>
                      <ImageViewer
                        src={customer.tobacco_license_image_url}
                        alt="Tobacco License"
                        className="h-20 w-20 sm:h-24 sm:w-24"
                      />
                    </div>
                  )}
                  {customer.tax_id_image_url && (
                    <div>
                      <span className="mb-1 block text-sm text-muted-foreground">Tax ID</span>
                      <ImageViewer
                        src={customer.tax_id_image_url}
                        alt="Tax ID"
                        className="h-20 w-20 sm:h-24 sm:w-24"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Account created: {formatDate(customer.created_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerProfile;
