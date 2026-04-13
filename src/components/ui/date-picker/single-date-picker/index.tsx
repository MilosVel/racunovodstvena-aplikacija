import {
  addDays,
  addYears,
  endOfYear,
  getYear,
  startOfYear,
  subDays,
  subYears,
  type Day,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import type { FieldError } from 'react-hook-form';

import { ActionButtons } from '@/components/ui/date-picker/single-date-picker/action-buttons';
import { CustomHeader } from '@/components/ui/date-picker/single-date-picker/custom-header';
import { DatePickerInput } from '@/components/ui/date-picker/single-date-picker/date-picker-input';
import { generateDateClassName } from '@/components/ui/date-picker/single-date-picker/utils';
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

type SingleDatePickerProps = {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onSubmitDate: (selectedDate: Date) => void;
  onClearDate?: VoidFunction;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  name?: string;
  resetOnInitialDate?: boolean;
  calendarStartDay?: Day;
  showArrows?: boolean;
  className?: string;
  isDisabled?: boolean;
};

export const SingleDatePicker = ({
  initialDate,
  onSubmitDate,
  minDate = startOfYear(subYears(new Date(), 2)),
  maxDate = endOfYear(addYears(new Date(), 2)),
  label,
  error,
  placeholder = 'Pick a date',
  name,
  onClearDate,
  resetOnInitialDate = false,
  calendarStartDay = 0,
  showArrows = false,
  className,
  isDisabled = false,
}: SingleDatePickerProps & FieldWrapperPassThroughProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [singleDate, setSingleDate] = useState<Date>();

  const [displayedMonth, setDisplayedMonth] = useState<Date>(
    singleDate as Date,
  );

  const fromYear = getYear(minDate);
  const toYear = getYear(maxDate);

  const handleResetSingleDate = () => {
    setSingleDate(resetOnInitialDate ? (initialDate ?? new Date()) : undefined);
    onClearDate?.();
    setIsPopoverOpen(false);
  };

  const onDateChange = (date: Date | null) => {
    setSingleDate(date as Date);
    setSaveState(false);
  };

  const handleSaveDate = () => {
    onSubmitDate(singleDate as Date);
    setSingleDate(singleDate);
    setSaveState(true);
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    if (initialDate) {
      setSingleDate(initialDate);
    }
  }, [initialDate, setSingleDate]);

  useEffect(() => {
    if (!isPopoverOpen && !saveState) {
      setSingleDate(initialDate);
    }
  }, [initialDate, isPopoverOpen, saveState]);

  useEffect(() => {
    if (isPopoverOpen) {
      setDisplayedMonth(singleDate || minDate || new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDate, isPopoverOpen]);

  const handlePreviousDay = useCallback(() => {
    if (singleDate) {
      const newDate = subDays(singleDate, 1);
      onSubmitDate(newDate);
      setSingleDate(newDate);
      setSaveState(true);
    }
  }, [singleDate, onSubmitDate]);

  const handleNextDay = useCallback(() => {
    if (singleDate) {
      const newDate = addDays(singleDate, 1);
      onSubmitDate(newDate);
      setSingleDate(newDate);
      setSaveState(true);
    }
  }, [singleDate, onSubmitDate]);

  if (isDisabled) {
    return (
      <FieldWrapper label={label}>
        <div
          className={cn(
            'w-full min-w-[150px] py-[14px] pl-3 flex flex-row justify-start items-center gap-x-1 border rounded-md dark:bg-background relative hover:cursor-not-allowed opacity-50',
            className,
          )}
        >
          <DatePickerInput
            placeholder={placeholder}
            selectedDate={singleDate}
          />
        </div>
      </FieldWrapper>
    );
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal>
      <FieldWrapper label={label} error={error}>
        <div
          className={cn(
            'relative flex w-full min-w-[150px] flex-row items-center justify-between rounded-md border px-3 border-border py-[14px]',
            className,
          )}
        >
          {showArrows && (
            <div
              role="button"
              onClick={handlePreviousDay}
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
                selectedDate={singleDate}
              />
            </div>
          </PopoverTrigger>

          {showArrows && (
            <div
              role="button"
              onClick={handleNextDay}
              className="cursor-pointer p-1 bg-muted/35 hover:bg-muted/80 dark:bg-sidebar-background/15 dark:hover:bg-sidebar-background/35 rounded-sm"
            >
              <ChevronRightIcon className="size-4" />
            </div>
          )}
        </div>
      </FieldWrapper>

      <PopoverContent className="w-auto border border-input bg-background px-1 pb-1 pt-0">
        <DatePicker
          calendarStartDay={calendarStartDay}
          inline
          selected={singleDate}
          name={name}
          startDate={singleDate}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
          onMonthChange={setDisplayedMonth}
          dayClassName={(date) =>
            generateDateClassName({
              selectedDate: date,
              startDate: singleDate,
              displayedMonth,
            })
          }
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
              changeDisplayedMonth={setDisplayedMonth}
              displayedMonth={displayedMonth}
              {...headerProps}
            />
          )}
        />

        <ActionButtons
          isConfirmButtonDisabled={!singleDate}
          onClearDate={handleResetSingleDate}
          onSaveDate={handleSaveDate}
        />
      </PopoverContent>
    </Popover>
  );
};
