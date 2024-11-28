import { AlertCircle, Check, Package, Tag, Truck } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SummaryRowProps {
  label: string;
  value: string;
  variant?: 'default' | 'success' | 'warning' | 'premium' | 'sale' | 'special';
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const variantStyles = {
  default: {
    container: 'flex w-full items-center justify-between ',
    label: 'text-sm text-muted-foreground flex items-center gap-2',
    value: 'text-sm text-muted-foreground',
    icon: null,
  },
  success: {
    container: 'flex w-full items-center justify-between  bg-emerald-50/50  rounded-md',
    label: 'text-sm text-emerald-600 font-medium flex items-center gap-2',
    value: 'text-sm text-emerald-600 font-medium',
    icon: Check,
  },
  warning: {
    container: 'flex w-full items-center justify-between  bg-amber-50/50  rounded-md',
    label: 'text-sm text-amber-600 font-medium flex items-center gap-2',
    value: 'text-sm text-amber-600 font-medium',
    icon: AlertCircle,
  },
  premium: {
    container: 'flex w-full items-center justify-between  bg-purple-50/50 rounded-md',
    label: 'text-sm text-purple-600 font-medium flex items-center gap-2',
    value: 'text-sm text-purple-600 font-medium',
    icon: Package,
  },
  sale: {
    container: 'flex w-full items-center justify-between  bg-blue-50/50  rounded-md',
    label: 'text-sm text-blue-600 font-medium flex items-center gap-2',
    value: 'text-sm text-blue-600 font-medium',
    icon: Tag,
  },
  special: {
    container:
      'flex w-full items-center justify-between py-1 bg-gradient-to-r from-pink-50/50 to-purple-50/50  rounded-md',
    label:
      'text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2',
    value:
      'text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent',
    icon: Truck,
  },
};

const SummaryRow = ({
  label,
  value,
  variant = 'default',
  className,
  labelClassName,
  valueClassName,
}: SummaryRowProps) => {
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div className={cn(styles.container, className)}>
      <p className={cn(styles.label, labelClassName)}>
        {IconComponent && <IconComponent className="h-4 w-4" />}
        {label}
      </p>
      <p className={cn(styles.value, valueClassName)}>{value}</p>
    </div>
  );
};

export default SummaryRow;
