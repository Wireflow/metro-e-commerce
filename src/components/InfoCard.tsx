import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const InfoCard = ({ title, value, icon, className, variant = 'default' }: InfoCardProps) => {
  const variants = {
    default: 'bg-card',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
  };

  return (
    <Card
      className={cn(
        'flex items-center gap-1.5 p-3 py-1.5 shadow-none',
        variants[variant],
        className
      )}
    >
      {icon && <div className="shrink-0 opacity-70">{icon}</div>}
      <div className="flex min-w-0 flex-1 gap-2">
        <p className="truncate text-xs font-medium opacity-70">{title}</p>
        <p className="truncate text-xs font-semibold">{value}</p>
      </div>
    </Card>
  );
};

export default InfoCard;
