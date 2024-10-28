'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = 'Pick a date',
  className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    onSelect?.(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
