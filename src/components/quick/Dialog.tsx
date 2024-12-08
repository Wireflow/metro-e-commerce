import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Props = {
  trigger?: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  disableClose?: boolean;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  contentClassName?: string;
  onClose?: () => void;
};

const QuickDialog = ({
  trigger,
  content,
  title,
  description,
  open,
  onOpenChange,
  className,
  contentClassName,
  footer,
  disableClose = false,
  disabled = false,
  modal = true,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={modal}>
      {trigger && (
        <DialogTrigger className="w-full" disabled={disabled} asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        onPointerDownOutside={e => {
          if (disableClose) {
            e.preventDefault();
          }
        }}
        className={cn('flex max-h-[90vh] flex-col overflow-auto custom-scrollbar', className)}
        onCloseAutoFocus={onClose}
      >
        <div className={cn('flex h-full flex-col', contentClassName)}>
          {title || description ? (
            <DialogHeader className="flex-shrink-0">
              {title && <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>}
              {description && (
                <DialogDescription className="text-base">{description}</DialogDescription>
              )}
            </DialogHeader>
          ) : null}
          <div className="flex-grow overflow-auto px-1">{content}</div>
          {footer && <DialogFooter className="flex-shrink-0">{footer}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickDialog;
