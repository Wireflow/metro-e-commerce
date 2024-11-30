import { Download, Eye, MoreVertical, Pencil, Star, Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type ActionsPopoverProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStar?: () => void;
  onDownload?: () => void;
  className?: string;
  disabled?: boolean;
  position?: 'bottom-end' | 'top-end' | 'bottom-start' | 'top-start';
};

const ActionsPopover = ({
  onView,
  onEdit,
  onDelete,
  onStar,
  onDownload,
  className,
  disabled = false,
  position = 'bottom-end',
}: ActionsPopoverProps) => {
  const actions = [
    {
      label: 'View',
      icon: Eye,
      onClick: onView,
      divider: false,
    },
    {
      label: 'Edit',
      icon: Pencil,
      onClick: onEdit,
      divider: false,
    },
    {
      label: 'Star',
      icon: Star,
      onClick: onStar,
      divider: false,
    },
    {
      label: 'Download',
      icon: Download,
      onClick: onDownload,
      divider: true,
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: onDelete,
      className: 'text-red-600 hover:text-red-700',
      divider: false,
    },
  ];

  const availableActions = actions.filter(action => action.onClick);

  return (
    <Popover>
      <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
        <Button variant="ghost" className={cn('h-8 w-8 p-0', className)} disabled={disabled}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-1"
        align={position.split('-')[1] as 'end' | 'start'}
        side={position.split('-')[0] as 'bottom' | 'top'}
      >
        <div className="flex flex-col space-y-1">
          {availableActions.map((action, index) => (
            <React.Fragment key={action.label}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${action.className || ''}`}
                onClick={action.onClick}
              >
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
              {action.divider && index < availableActions.length - 1 && (
                <Separator className="my-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionsPopover;
