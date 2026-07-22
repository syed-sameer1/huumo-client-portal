'use client';

import * as React from 'react';
import { CalendarDaysIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerFormat = 'long' | 'short';

export function formatDate(date: Date | undefined, format: DatePickerFormat) {
  if (!date) {
    return '';
  }

  if (format === 'short') {
    // MM/DD/YYYY
    return date.toLocaleDateString('en-US');
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Filter by date',
  inputClassName,
  format = 'long',
}: {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  inputClassName?: string;
  format?: DatePickerFormat;
}) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>();
  const date = value;
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [inputValue, setInputValue] = React.useState(formatDate(date, format));

  React.useEffect(() => {
    if (value === undefined) {
      setInternalDate(undefined);
    }

    setInputValue(formatDate(value, format));
    setMonth(value);
  }, [value, format]);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative w-full">
            <Input
              id="date"
              value={inputValue}
              placeholder={placeholder}
              className={cn(
                'bg-background pr-10 text-sm w-58.25',
                inputClassName,
              )}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setInputValue(e.target.value);
                if (isValidDate(date)) {
                  setInternalDate(date);
                  setMonth(date);
                  onChange?.(date);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />

            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                type="button"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarDaysIcon className="size-3.5 text-[#71717A]" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
          </div>
        </PopoverAnchor>

        <PopoverContent
          className="w-[350px]"
          align="start"
          side="bottom"
          sideOffset={6}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            className="w-full"
            onMonthChange={setMonth}
            onSelect={(date) => {
              setInputValue(formatDate(date, format));
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
