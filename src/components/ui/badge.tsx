import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground  hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground  hover:bg-destructive/80',

        // Soft variants with good contrast
        success: 'border-transparent bg-emerald-100 text-emerald-700  hover:bg-emerald-200',
        warning: 'border-transparent bg-amber-100 text-amber-700  hover:bg-amber-200',
        error: 'border-transparent bg-rose-100 text-rose-700  hover:bg-rose-200',
        info: 'border-transparent bg-sky-100 text-sky-700  hover:bg-sky-200',
        purple: 'border-transparent bg-violet-100 text-violet-700  hover:bg-violet-200',
        gray: 'border-transparent bg-slate-100 text-slate-700  hover:bg-slate-200',
        pink: 'border-transparent bg-pink-100 text-pink-700  hover:bg-pink-200',
        indigo: 'border-transparent bg-indigo-100 text-indigo-700  hover:bg-indigo-200',

        // Outline variants
        outline: 'text-foreground',
        'outline-success': 'border-emerald-200 text-emerald-700 hover:bg-emerald-100',
        'outline-warning': 'border-amber-200 text-amber-700 hover:bg-amber-100',
        'outline-error': 'border-rose-200 text-rose-700 hover:bg-rose-100',
        'outline-info': 'border-sky-200 text-sky-700 hover:bg-sky-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
