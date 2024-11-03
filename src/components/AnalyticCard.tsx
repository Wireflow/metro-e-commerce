'use client';

import { Loader2, LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
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
  variant?: 'default' | 'gradient' | 'outlined' | 'minimal' | 'dark';
  loading?: boolean;
  trend?: {
    type: 'positive' | 'negative';
    value?: string;
    duration?: 'day' | 'week' | 'month' | 'year';
  };
  icon?: LucideIcon;
  IconComponent?: React.ComponentType<{ className?: string }>;
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
  icon: Icon,
  IconComponent,
  subtitle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white';
      case 'outlined':
        return 'border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm';
      case 'minimal':
        return 'bg-transparent';
      case 'dark':
        return 'bg-gray-900 text-white dark:bg-black';
      default:
        return backgroundColor || 'bg-white dark:bg-gray-900';
    }
  };

  const getTrendStyles = () => {
    const baseStyles = 'flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium';
    if (trend?.type === 'positive') {
      return `${baseStyles} bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`;
    }
    return `${baseStyles} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`;
  };

  const getDurationStyles = () => {
    return 'text-sm text-gray-600 dark:text-gray-400 font-medium';
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[4px] shadow-none',
        getVariantStyles(),
        className
      )}
    >
      <div className="relative p-6">
        {(Icon || IconComponent) && (
          <div className="absolute right-6 top-6 opacity-20">
            {IconComponent ? (
              <IconComponent className="h-12 w-12" />
            ) : (
              Icon && <Icon className="h-12 w-12" />
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <CardDescription
              className={cn(
                'text-sm font-medium text-gray-600 dark:text-gray-400',
                textColor,
                titleClassName
              )}
            >
              {title}
            </CardDescription>
            {subtitle && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
            )}
          </div>

          <div className="space-y-3">
            <CardTitle
              className={cn('text-3xl font-bold tracking-tight', textColor, valueClassName)}
            >
              {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : value}
            </CardTitle>

            {trend && (
              <div className="flex flex-wrap items-center gap-2">
                <div className={getTrendStyles()}>
                  {trend.type === 'positive' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {trend.value}
                </div>
                {trend.duration && (
                  <div className={getDurationStyles()}>
                    {trend.duration === 'day'
                      ? 'Last 24 hours'
                      : trend.duration === 'week'
                        ? 'Last 7 days'
                        : trend.duration === 'month'
                          ? 'Last 30 days'
                          : 'Last 365 days'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {action && <div className="mt-6">{action}</div>}
      </div>
    </Card>
  );
};

export default AnalyticCard;
