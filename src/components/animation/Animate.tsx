import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'rotate' | 'flip';
type SlideDirection = 'up' | 'down' | 'left' | 'right';

interface AnimationProps {
  children: React.ReactNode;
  show?: boolean;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  direction?: SlideDirection;
  scale?: number;
  degrees?: number;
  className?: string;
}

export const Animate: React.FC<AnimationProps> = ({
  children,
  show = true,
  type = 'fade',
  duration = 0.3,
  delay = 0,
  direction = 'right',
  scale = 0.9,
  degrees = 180,
  className = '',
}) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: {
        opacity: 0,
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
      },
      exit: {
        opacity: 0,
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
      },
    },
    scale: {
      initial: { opacity: 0, scale },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale },
    },
    bounce: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    rotate: {
      initial: { opacity: 0, rotate: degrees },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: -degrees },
    },
    flip: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      exit: { opacity: 0, rotateX: -90 },
    },
  };

  const getTransition = (type: AnimationType) => {
    const base = {
      duration,
      delay,
      ease: 'easeInOut',
    };

    if (type === 'bounce') {
      return {
        ...base,
        y: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
        },
      };
    }

    return base;
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          variants={variants[type]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={getTransition(type)}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Animate;
