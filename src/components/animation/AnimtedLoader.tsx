'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const AnimtedLoadingSpinner = ({
  size = 40,
  text,
  fullScreen = false,
  className = '',
}: LoaderProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const dotVariants = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  const spinTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  };

  const baseContainerClass = `flex flex-col items-center justify-center ${className}`;
  const containerClass = fullScreen
    ? `fixed inset-0 bg-white/80 backdrop-blur-sm z-50 ${baseContainerClass}`
    : baseContainerClass;

  return (
    <AnimatePresence>
      <motion.div
        className={containerClass}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative">
          <motion.div animate={{ rotate: 360 }} transition={spinTransition}>
            <Loader2 size={size} className="text-primary" />
          </motion.div>

          {/* Optional loading dots */}
          {text && (
            <motion.div
              className="mt-4 flex items-center justify-center gap-1"
              variants={containerVariants}
            >
              <motion.span className="text-primary/80">{text}</motion.span>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    variants={dotVariants}
                    className="h-1 w-1 rounded-full bg-primary/60"
                    style={{
                      originY: 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimtedLoadingSpinner;
