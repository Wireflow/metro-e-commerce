import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type Step = {
  icon: LucideIcon;
  title: string;
};

type Props = {
  steps: Step[];
  currentStep?: number;
  className?: string;
};

const ProgressBarSteps = ({ steps, currentStep = 1, className }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getProgressWidth = (currentStep: number, totalSteps: number) => {
    if (currentStep <= 1) return '0%';
    if (currentStep >= totalSteps) return '100%';

    const segmentWidth = 100 / (totalSteps - 1);
    return `${(currentStep - 1) * segmentWidth}%`;
  };

  return (
    <div className={cn('w-full px-4 sm:px-8', className)}>
      <div className="relative pt-2">
        {/* Main progress bar background */}
        <div className="absolute h-1.5 w-full rounded bg-gray-200" />

        {/* Active progress bar */}
        <div
          className={cn('absolute h-1.5 rounded bg-primary transition-all duration-500')}
          style={{
            width: getProgressWidth(currentStep, steps.length),
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const { icon: Icon, title } = step;
            const isCompleted = currentStep > index + 1;
            const isActive = currentStep === index + 1;
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={index}
                className={cn('relative flex flex-col', {
                  'items-start': isFirst,
                  'items-center': !isFirst && !isLast,
                  'items-end': isLast,
                })}
              >
                {/* Circle indicator */}
                <div
                  className={cn(
                    '-mt-1 h-4 w-4 rounded-full border-2 transition-colors duration-200',
                    isCompleted || isActive
                      ? 'border-primary bg-primary'
                      : 'border-gray-200 bg-white'
                  )}
                />

                {/* Icon and title container */}
                <div
                  className={cn(
                    'absolute mt-6 flex flex-col items-center transition-all duration-200',
                    {
                      'left-0': isFirst && isMobile,
                      '-left-3.5': isFirst && !isMobile,
                      'left-1/2 -translate-x-1/2': !isFirst && !isLast,
                      'right-0': isLast && isMobile,
                      '-right-7': isLast && !isMobile,
                    }
                  )}
                >
                  <Icon
                    className={cn(
                      'mb-2 transition-colors duration-200',
                      isCompleted || isActive ? 'text-primary' : 'text-gray-400',
                      isMobile ? 'h-5 w-5' : 'h-6 w-6'
                    )}
                  />
                  {!isMobile && (
                    <span
                      className={cn(
                        'text-center transition-colors duration-200',
                        isCompleted || isActive ? 'text-primary' : 'text-gray-400',
                        isMobile ? 'text-xs' : 'text-sm',
                        {
                          'max-w-[80px] sm:max-w-none': !isFirst && !isLast,
                        }
                      )}
                    >
                      {isMobile ? (
                        <span className="line-clamp-2">{title}</span>
                      ) : (
                        <span className="whitespace-nowrap">{title}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBarSteps;
