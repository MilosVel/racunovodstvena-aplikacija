import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { type FieldError } from 'react-hook-form';

import { ActionButtons } from '@/components/ui/date-picker/multiple-days-date-picker/action-buttons';
import { CustomHeader } from '@/components/ui/date-picker/multiple-days-date-picker/custom-header';
import { DatePickerInput } from '@/components/ui/date-picker/multiple-days-date-picker/date-picker-input';
import { generateDateClassName } from '@/components/ui/date-picker/multiple-days-date-picker/utils';
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

type MultipleDaysDatePickerProps = {
  minDate?: Date;
  maxDate?: Date;
  initialDates?: Date[];
  onSubmitDate: (selectedDate: Date[]) => void;
  onClearDate?: VoidFunction;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  className?: string;
};

const MultipleDaysDatePicker = ({
  initialDates,
  minDate,
  maxDate,
  onSubmitDate,
  placeholder = 'Pick a date',
  label,
  error,
  onClearDate,
  className,
}: MultipleDaysDatePickerProps & FieldWrapperPassThroughProps) => {
  const [saveState, setSaveState] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [displayedMonth, setDisplayedMonth] = useState<Date>(
    selectedDates ? selectedDates[selectedDates.length - 1] : new Date(),
  );

  const fromYear = minDate
    ? new Date(minDate).getFullYear()
    : new Date().getFullYear() - 2;

  const toYear = maxDate
    ? new Date(maxDate).getFullYear()
    : new Date().getFullYear() + 2;

  if (!maxDate) {
    maxDate = new Date(new Date().getFullYear() + 2, 11, 31);
  }

  if (!minDate) {
    minDate = new Date(new Date().getFullYear() - 2, 0, 1);
  }

  const handleClearDates = () => {
    setSelectedDates([]);
    setIsPopoverOpen(false);
    onClearDate?.();
  };

  const onChange = (dates: Date[] | null) => {
    if (dates) {
      setSelectedDates(dates.toSorted((a, b) => (a > b ? 1 : -1)));
    }
    setSaveState(false);
  };

  useEffect(() => {
    setDisplayedMonth(
      selectedDates && selectedDates.length > 0
        ? selectedDates[selectedDates.length - 1]
        : new Date(),
    );
  }, [isPopoverOpen, selectedDates]);

  useEffect(() => {
    if (!isPopoverOpen && !saveState) {
      setSelectedDates(initialDates || []);
    }
  }, [isPopoverOpen, saveState, initialDates]);

  const handleSaveDate = () => {
    setSaveState(true);
    setIsPopoverOpen(false);
    onSubmitDate(selectedDates as Date[]);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <FieldWrapper label={label} error={error}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'relative flex w-full min-w-[150px] flex-row items-center justify-start gap-x-1 rounded-md border py-[14px] pl-2',
              { 'hover:cursor-pointer': !isPopoverOpen },
              className,
            )}
          >
            <DatePickerInput
              placeholder={placeholder}
              selectedDates={selectedDates}
              handleClearDates={handleClearDates}
            />
          </div>
        </PopoverTrigger>
      </FieldWrapper>

      <PopoverContent className="z-40 w-auto border pb-1 pl-1 pr-1 pt-0 bg-background">
        <DatePicker
          selectedDates={selectedDates}
          selectsMultiple
          onChange={onChange}
          dayClassName={(date) =>
            generateDateClassName({
              date,
              selectedDates,
              displayedMonth,
            })
          }
          inline
          minDate={minDate}
          maxDate={maxDate}
          selected={
            selectedDates ? selectedDates[selectedDates.length - 1] : new Date()
          }
          onMonthChange={(date) => setDisplayedMonth(date)}
          calendarClassName="pb-0 pt-0 mt-1 relative bg-background border border-border"
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
          isConfirmButtonDisabled={selectedDates.length < 1}
          onClearDate={handleClearDates}
          onSaveDate={handleSaveDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export { MultipleDaysDatePicker };
