import { CheckCircle } from 'lucide-react';
import React from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import { GrAmex } from 'react-icons/gr';
import { RiMastercardLine, RiVisaLine } from 'react-icons/ri';
import { SiDiscover } from 'react-icons/si';

import ActionsPopover from '@/components/quick/ActionsPopover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';
import { ViewRow } from '@/types/supabase/table';
import { formatCurrency, getColorHash } from '@/utils/utils';

import { useDeleteCard } from '../../hooks/mutations/useDeleteCard';

interface PaymentCardProps {
  payment: ViewRow<'payment_methods_with_spending'>;
  title?: (payment: ViewRow<'payment_methods_with_spending'>) => string;
  action?: React.ReactNode;
  onSelect?: (payment: ViewRow<'payment_methods_with_spending'>) => void;
  selected?: ViewRow<'payment_methods_with_spending'> | null;
  options?: {
    showTitle?: boolean;
    showSpending?: boolean;
    showCardNumber?: boolean;
    showCardHolder?: boolean;
    showAction?: boolean;
    showSelection?: boolean;
    useColorBackground?: boolean;
  };
}

const PaymentCard = ({
  payment,
  action,
  title,
  onSelect,
  selected,
  options = {},
}: PaymentCardProps) => {
  const { mutate: deleteCard, isPending } = useDeleteCard();

  const {
    showTitle = true,
    showSpending = true,
    showCardNumber = true,
    showCardHolder = true,
    showAction = true,
    showSelection = false,
    useColorBackground = true,
  } = options;

  const displayTitle = title?.(payment) ?? `Payment Card`;
  const isSelected = selected?.id === payment.id;

  const iconClass = 'w-8 h-8';

  const logos: Record<Enum<'card_provider'>, React.ReactNode> = {
    visa: <RiVisaLine className={iconClass} style={{ transform: 'scale(1)' }} />,
    amex: <GrAmex className={cn(iconClass, 'ml-1.5')} style={{ transform: 'scale(1.3)' }} />,
    master: <RiMastercardLine className={iconClass} />,
    discover: (
      <SiDiscover className={cn(iconClass, 'ml-2.5')} style={{ transform: 'scale(1.6)' }} />
    ),
    unknown: <CiCreditCard1 className={iconClass} />,
  };

  return (
    <Card
      style={useColorBackground ? { backgroundColor: getColorHash(payment.last_four ?? '') } : {}}
      className={cn(
        'relative w-full shadow-none transition-all duration-300',
        useColorBackground ? 'text-white' : '',
        onSelect ? 'cursor-pointer hover:bg-gray-50' : '',
        isSelected ? 'ring-2 ring-white' : '',
        'md:max-w-[300px]'
      )}
      onClick={() => onSelect?.(payment)}
    >
      {showAction && !isSelected && (
        <ActionsPopover
          className="absolute right-2 top-2"
          disabled={isPending}
          onDelete={() => {
            if (!payment) return;
            deleteCard(payment?.id ?? '');
          }}
        />
      )}

      {isSelected && showSelection && (
        <div className="absolute right-2 top-2 transition-all duration-200">
          <CheckCircle className="h-5 w-5 text-primary" />
        </div>
      )}

      {showTitle && (
        <CardHeader className="border-b pb-3 pt-4">
          <CardTitle className="font-medium capitalize">{displayTitle}</CardTitle>
        </CardHeader>
      )}

      <CardContent className="space-y-2 p-4">
        {showSpending && (
          <div className="space-y-0.5">
            <p className="text-xs font-thin">USED</p>
            <p className="text-lg">{formatCurrency(payment.total_approved_spending ?? 0)} USD</p>
          </div>
        )}

        {showCardNumber && (
          <div className="space-y-0.5">
            <p className="text-xs font-thin">CARD NUMBER</p>
            <p className="text-lg">{`**** **** **** ${payment.last_four}`}</p>
          </div>
        )}

        {showCardHolder && (
          <div className="flex items-center justify-between gap-2">
            {logos[payment.provider ?? 'unknown']}
            <p className="text-sm">{payment.card_holder}</p>
          </div>
        )}

        {action}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
