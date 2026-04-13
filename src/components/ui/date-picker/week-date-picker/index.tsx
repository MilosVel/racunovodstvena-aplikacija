import { addWeeks, type Day, endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import type { FieldError } from 'react-hook-form';

import { ActionButtons } from '@/components/ui/date-picker/week-date-picker/action-buttons';
import { CustomHeader } from '@/components/ui/date-picker/week-date-picker/custom-header';
import { DatePickerInput } from '@/components/ui/date-picker/week-date-picker/date-picker-input';
import { generateDateClassName } from '@/components/ui/date-picker/week-date-picker/utils';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '@/components/ui/form/field-wrapper';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/theme';

type WeekDatePickerProps = {
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  onSubmitDate: (selectedDate: Date[]) => void;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  calendarStartDay?: Day;
  onClearDate?: VoidFunction;
  resetOnInitialDate?: boolean;
  className?: string;
  showArrows?: boolean;
};

export const WeekDatePicker = ({
  initialDate,
  minDate,
  maxDate,
  onSubmitDate,
  placeholder = 'Pick a date',
  label,
  error,
  calendarStartDay = 0,
  onClearDate,
  resetOnInitialDate = false,
  className,
  showArrows = false,
}: WeekDatePickerProps & FieldWrapperPassThroughProps) => {
  const firstRender = useRef(true);
  const fromYear = minDate
    ? new Date(minDate).getFullYear()
    : new Date().getFullYear() - 2;

  const toYear = maxDate
    ? new Date(maxDate).getFullYear()
    : new Date().getFullYear() + 2;

  const [displayedMonth, setDisplayedMonth] = useState<Date>(
    initialDate ?? new Date(),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ?? null,
  );

  const [startDayOfWeek, setStartDayOfWeek] = useState<Date | null>(null);
  const [endDayOfWeek, setEndOfWeek] = useState<Date | null>(null);

  useEffect(() => {
    if (initialDate) {
      setStartDayOfWeek(
        startOfWeek(initialDate, { weekStartsOn: calendarStartDay }),
      );
      setEndOfWeek(endOfWeek(initialDate, { weekStartsOn: calendarStartDay }));
    } else {
      setStartDayOfWeek(null);
      setEndOfWeek(null);
    }
  }, [initialDate, calendarStartDay]);

  const [saveState, setSaveState] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const clearDates = useCallback(
    (initialDate: Date | null) => {
      setSelectedDate(initialDate ?? null);
      const start = initialDate
        ? startOfWeek(initialDate, { weekStartsOn: calendarStartDay })
        : null;
      const end = initialDate
        ? endOfWeek(initialDate, { weekStartsOn: calendarStartDay })
        : null;
      setStartDayOfWeek(start);
      setEndOfWeek(end);
      setIsPopoverOpen(false);
    },
    [calendarStartDay],
  );

  const onDateChange = useCallback(
    (date: Date | null) => {
      setSaveState(false);
      if (date) {
        setSelectedDate(date);
        const start = startOfWeek(date, { weekStartsOn: calendarStartDay });
        const end = endOfWeek(date, { weekStartsOn: calendarStartDay });
        setStartDayOfWeek(start);
        setEndOfWeek(end);
      }
    },
    [calendarStartDay],
  );

  const handleSaveDate = () => {
    setSaveState(true);
    setIsPopoverOpen(false);
    onSubmitDate([startDayOfWeek, endDayOfWeek] as Date[]);
  };

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (!isPopoverOpen && !saveState) {
      clearDates(resetOnInitialDate ? (initialDate as Date) : null);
    }
  }, [isPopoverOpen, saveState, resetOnInitialDate, clearDates, initialDate]);

  const handlePopoverChange = (open: boolean) => {
    setIsPopoverOpen(open);
    firstRender.current = false;
  };

  useEffect(() => {
    setDisplayedMonth(initialDate ?? new Date());
    setSelectedDate(initialDate ?? new Date());
  }, [initialDate, isPopoverOpen]);

  const handlePreviousWeek = useCallback(() => {
    if (startDayOfWeek && endDayOfWeek) {
      const newWeekStart = subWeeks(startDayOfWeek, 1);
      const newWeekEnd = subWeeks(endDayOfWeek, 1);
      onSubmitDate([newWeekStart, newWeekEnd] as Date[]);
    }
  }, [startDayOfWeek, endDayOfWeek, onSubmitDate]);

  const handleNextWeek = useCallback(() => {
    if (startDayOfWeek && endDayOfWeek) {
      const newWeekStart = addWeeks(startDayOfWeek, 1);
      const newWeekEnd = addWeeks(endDayOfWeek, 1);
      onSubmitDate([newWeekStart, newWeekEnd] as Date[]);
    }
  }, [startDayOfWeek, endDayOfWeek, onSubmitDate]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={handlePopoverChange}>
      <FieldWrapper label={label} error={error}>
        <div
          className={cn(
            'relative flex w-full min-w-[250px] flex-row items-center justify-between rounded-md border px-3  py-[10px]',
            className,
          )}
        >
          {showArrows && (
            <div
              role="button"
              onClick={handlePreviousWeek}
              className="cursor-pointer p-1 bg-muted/35 hover:bg-muted/80 dark:bg-sidebar-background/15 dark:hover:bg-sidebar-background/35 rounded-sm"
            >
              <ChevronLeftIcon className="size-4" />
            </div>
          )}
          <PopoverTrigger asChild>
            <div
              className={cn('flex items-center justify-center mx-2', {
                'flex-1 justify-start cursor-pointer mx-0': !showArrows,
              })}
            >
              <DatePickerInput
                placeholder={placeholder}
                weekRange={[startDayOfWeek, endDayOfWeek]}
              />
            </div>
          </PopoverTrigger>
          {showArrows && (
            <div
              role="button"
              onClick={handleNextWeek}
              className="cursor-pointer p-1 bg-muted/35 hover:bg-muted/80 dark:bg-sidebar-background/15 dark:hover:bg-sidebar-background/35 rounded-sm"
            >
              <ChevronRightIcon className="size-4" />
            </div>
          )}
        </div>
      </FieldWrapper>

      <PopoverContent className="z-50 w-auto border pb-1 pl-1 pr-1 pt-0 dark:bg-background">
        <DatePicker
          calendarStartDay={calendarStartDay}
          selected={selectedDate}
          onChange={onDateChange}
          showWeekPicker
          inline
          minDate={minDate}
          maxDate={maxDate}
          dayClassName={(date) =>
            generateDateClassName({
              date,
              startDate: startDayOfWeek,
              endDate: endDayOfWeek,
              displayedMonth,
            })
          }
          onMonthChange={(date) => setDisplayedMonth(date)}
          calendarClassName="pb-0 pt-0 mt-1 relative bg-background border border-input"
          weekDayClassName={() =>
            'bg-background text-muted-foreground text-[12px]'
          }
          renderCustomHeader={(headerProps) => (
            <CustomHeader
              fromYear={fromYear}
              toYear={toYear}
              minDate={minDate}
              maxDate={maxDate}
              {...headerProps}
            />
          )}
        />
        <ActionButtons
          isConfirmButtonDisabled={!startDayOfWeek || !endDayOfWeek}
          onClearDate={() => {
            clearDates(resetOnInitialDate ? (initialDate as Date) : null);
            onClearDate?.();
          }}
          onSaveDate={handleSaveDate}
        />
      </PopoverContent>
    </Popover>
  );
};
