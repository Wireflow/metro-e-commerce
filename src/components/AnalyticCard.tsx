import { Loader2, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalyticCardProps {
  title: string;
  value: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  backgroundColor?: string;
  textColor?: string;
  variant?: 'default' | 'gradient' | 'outlined' | 'minimal';
  loading?: boolean;
  trend?: {
    type: 'positive' | 'negative';
    value?: string;
  };
  icon?: React.ReactNode;
  subtitle?: string;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({
  title,
  value,
  action,
  className,
  titleClassName,
  valueClassName,
  backgroundColor,
  textColor,
  variant = 'default',
  loading = false,
  trend,
  icon,
  subtitle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';
      case 'outlined':
        return 'border-2 border-gray-200 dark:border-gray-700';
      case 'minimal':
        return 'bg-transparent shadow-none';
      default:
        return backgroundColor;
    }
  };

  const getTrendColor = () => {
    return trend?.type === 'positive' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card
      className={cn(
        'flex w-full flex-col justify-between gap-2 overflow-hidden rounded-[4px] p-4',
        variant !== 'minimal' && 'shadow-sm',
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
            <CardDescription className={cn('font-bold', textColor, titleClassName)}>
              {title}
            </CardDescription>
          </div>
          {subtitle && <span className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</span>}
          <div className="flex items-center gap-2">
            <CardTitle className={cn('text-2xl font-bold', textColor, valueClassName)}>
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : value}
            </CardTitle>
            {trend && (
              <div className={cn('flex items-center gap-1 text-sm', getTrendColor())}>
                {trend.type === 'positive' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {trend.value}
              </div>
            )}
          </div>
        </div>
      </div>
      {action && <div className="mt-2 w-full">{action}</div>}
    </Card>
  );
};
export default AnalyticCard;
