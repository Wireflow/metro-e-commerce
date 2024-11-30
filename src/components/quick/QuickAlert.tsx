import { AlertCircle, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface QuickAlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  className?: string;
  children?: React.ReactNode;
}

const alertConfig: Record<AlertVariant, { icon: ReactNode; className: string }> = {
  default: {
    icon: <AlertCircle className="h-5 w-5 text-slate-600" />,
    className: 'border-slate-200 bg-slate-50/50 text-slate-600',
  },
  destructive: {
    icon: <XCircle className="h-5 w-5 text-red-600" />,
    className: 'border-red-100 bg-red-50/50 text-red-600',
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    className: 'border-green-100 bg-green-50/50 text-green-600',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    className: 'border-yellow-100 bg-yellow-50/50 text-yellow-600',
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-600" />,
    className: 'border-blue-100 bg-blue-50/50 text-blue-600',
  },
};

const QuickAlert = ({
  title,
  description,
  variant = 'default',
  className,
  children,
}: QuickAlertProps) => {
  const config = alertConfig[variant];
  const Icon = config.icon;

  return (
    <Alert className={cn('flex items-start gap-3 border shadow-sm', config.className, className)}>
      <div>{Icon}</div>
      <div className="flex-1 space-y-1.5">
        {title && (
          <AlertTitle className="font-medium leading-none tracking-tight">{title}</AlertTitle>
        )}
        {description && (
          <AlertDescription className="text-sm opacity-90">{description}</AlertDescription>
        )}
        {children}
      </div>
    </Alert>
  );
};

export default QuickAlert;
