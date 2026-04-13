import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

import { ActionButtons } from '@/components/ui/date-picker/range-date-picker/action-buttons';
import { CustomHeader } from '@/components/ui/date-picker/range-date-picker/custom-header';
import { generateDateClassName } from '@/components/ui/date-picker/range-date-picker/utils';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '@/components/ui/form/field-wrapper';
import { Select } from '@/components/ui/form/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/theme';

type RangeDatePickerProps = {
  minDate?: Date;
  maxDate?: Date;
  currentDateRange?: [Date, Date];
  onDateSelect: (dataRange: Date[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  paddingY?: string;
};

const RangeDatePicker = ({
  currentDateRange,
  minDate,
  maxDate,
  onDateSelect,
  placeholder = 'Pick a date',
  label,
  error,
  paddingY,
}: RangeDatePickerProps & FieldWrapperPassThroughProps) => {
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

  const [saveState, setSaveState] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(
    currentDateRange?.[0] || null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    currentDateRange?.[1] || null,
  );

  const [displayedMonth, setDisplayedMonth] = useState<null | Date>(null);

  const changeMonthRef = useRef<((month: number) => void) | null>(null);

  const { control, setValue } = useForm();

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setIsPopoverOpen(false);
    setValue('Select', '');
    setTimeout(() => {
      setDisplayedMonth(new Date());
    }, 0);
  };

  const onChange = (dates: (Date | null)[]) => {
    const [start, end] = dates;
    setStartDate(start ?? null);
    setEndDate(end ?? null);
    setValue('Select', '');
    setSaveState(false);
  };

  const onSelectChange = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    const today = new Date();

    if (changeMonthRef.current) {
      changeMonthRef.current(today.getMonth());
    }

    if (selectedValue === '-7') {
      setStartDate(subDays(today, 7));
      setEndDate(today);
    } else if (selectedValue === '-30') {
      setStartDate(subDays(today, 30));
      setEndDate(today);
    }
  };

  const timeRangeSelectOptions = [
    {
      value: '-7',
      label: 'Last week',
    },
    {
      value: '-30',
      label: 'Last month',
    },
  ];

  const generateDatesInRange = (startDate: Date, endDate: Date) => {
    const dateArray: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  useEffect(() => {
    if (!isPopoverOpen && !saveState) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [isPopoverOpen, saveState]);

  const handleSaveDate = () => {
    setSaveState(true);
    setIsPopoverOpen(false);
    onDateSelect(generateDatesInRange(startDate as Date, endDate as Date));
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <FieldWrapper label={label} error={error}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'relative flex h-10 w-[245px] min-w-[150px] flex-row items-center justify-start gap-x-1 rounded-md border pl-2 dark:bg-background',
              { 'hover:cursor-pointer': !isPopoverOpen },
            )}
            style={{
              paddingTop: paddingY,
              paddingBottom: paddingY,
            }}
            onClick={() =>
              setDisplayedMonth(startDate ? startDate : new Date())
            }
          >
            <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
            {startDate && endDate ? (
              <span className="flex max-w-[calc(100%-45px)] flex-1 flex-col items-center text-[13px]">
                <span>{format(startDate, 'yyyy-MM-dd')}</span>
                <span>{format(endDate, 'yyyy-MM-dd')}</span>
              </span>
            ) : (
              <span className="ml-2 text-muted-foreground dark:text-muted-foreground">
                {placeholder}
              </span>
            )}

            {startDate && endDate && (
              <X
                onClick={clearDates}
                className="absolute right-2 top-[50%] size-4 translate-y-[-50%]"
              />
            )}
          </div>
        </PopoverTrigger>
      </FieldWrapper>

      <PopoverContent className="w-auto border pb-1 pl-1 pr-1 pt-0 dark:bg-background">
        <Select
          name="Select"
          control={control}
          placeholder="Select"
          options={timeRangeSelectOptions}
          onChange={onSelectChange}
          onClear={clearDates}
        />

        <DatePicker
          swapRange
          selected={startDate}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          selectsRange
          onChange={onChange}
          inline
          minDate={minDate}
          maxDate={maxDate}
          onMonthChange={(date) => setDisplayedMonth(date)}
          dayClassName={(date) =>
            generateDateClassName({
              date,
              startDate,
              endDate,
              displayedMonth,
            })
          }
          calendarClassName="pb-0 pt-0 mt-1 relative dark:bg-background border border-border dark:border-border"
          weekDayClassName={() =>
            'bg-background dark:bg-background dark:text-muted-foreground text-[12px]'
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
          isConfirmButtonDisabled={!startDate || !endDate}
          onClearDate={clearDates}
          onSaveDate={handleSaveDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export { RangeDatePicker };
