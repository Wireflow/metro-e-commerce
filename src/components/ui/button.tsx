import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        none: 'bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        black: 'bg-black text-primary-foreground shadow hover:bg-black/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // New modern variants
        gradient:
          'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[1px]',

        success:
          'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-green-200/50 dark:hover:shadow-green-900/50',

        warning:
          'bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow-amber-200/50 dark:hover:shadow-amber-900/50',

        soft: 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30',

        glass:
          'backdrop-blur-sm bg-white/10 border border-white/20 text-white shadow-sm hover:bg-white/20 dark:hover:border-white/30',

        'outline-primary':
          'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',

        '3d': 'bg-violet-500 text-white border-b-4 border-violet-700 hover:brightness-110 active:border-b-0 active:translate-y-[4px]',

        neon: 'bg-transparent border border-primary text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)] hover:bg-primary/10',

        minimal: 'hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/70',

        premium:
          'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-black font-semibold shadow hover:shadow-lg hover:brightness-110',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        xl: 'h-12 rounded-md px-10 text-base',
        '2xl': 'h-14 rounded-lg px-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
