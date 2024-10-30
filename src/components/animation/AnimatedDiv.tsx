import { motion, Variants } from 'framer-motion';
import React from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

type Props = {
  children?: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
};

const variants: Record<AnimationDirection, Variants> = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedDiv({
  children,
  direction = 'fade',
  delay = 0,
  duration = 0.5,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier curve
        opacity: { duration: duration * 0.75 }, // Slightly faster opacity animation
      }}
    >
      {children}
    </motion.div>
  );
}
