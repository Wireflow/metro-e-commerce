import React from 'react';

interface ConditionalProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Conditional = ({ condition, children, fallback }: ConditionalProps) => {
  if (!condition) {
    return fallback || null;
  }

  return <>{children}</>;
};

export default Conditional;
