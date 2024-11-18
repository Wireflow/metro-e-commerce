'use client';

import { useEffect, useRef, useState } from 'react';

interface UseWindowStateProps {
  initialState?: boolean;
}

interface UseWindowStateReturn {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleClear: () => void;
}

const useWindowState = ({
  initialState = false,
}: UseWindowStateProps = {}): UseWindowStateReturn => {
  const [isOpen, setIsOpen] = useState(initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleClear = () => setIsOpen(false);

  return {
    isOpen,
    containerRef,
    setIsOpen,
    handleOpen,
    handleClose,
    handleClear,
  };
};

export default useWindowState;
