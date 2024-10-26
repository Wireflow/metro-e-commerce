import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const AnimatedDiv = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
