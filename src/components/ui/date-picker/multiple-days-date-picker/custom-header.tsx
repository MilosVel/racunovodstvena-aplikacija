import { format, getMonth, getYear } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker';

import { Button } from '@/components/ui/button';
import { generateMonths } from '@/utils/format-date';

export function CustomHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  fromYear,
  toYear,
  monthDate,
  minDate,
  maxDate,
}: ReactDatePickerCustomHeaderProps & {
  fromYear: number;
  toYear: number;
  minDate: Date | undefined;
  maxDate: Date | undefined;
}) {
  const months = generateMonths();

  const currentDate = useMemo(() => {
    return date ? new Date(date) : new Date();
  }, [date]);

  const [selectedYear, setSelectedYear] = useState(format(currentDate, 'yyyy'));
  const [selectedMonth, setSelectedMonth] = useState(
    format(currentDate, 'LLLL'),
  );
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const displayedYear = getYear(currentDate);
    const displayedMonthIndex = getMonth(currentDate);
    const selectedMonthIndex = months.indexOf(selectedMonth);

    if (+selectedYear < displayedYear) {
      setSelectedYear(String(+selectedYear + 1));
      setSelectedMonth(months[0]);
      changeYear(+selectedYear + 1);
      changeMonth(0);
    } else if (+selectedYear > displayedYear) {
      setSelectedYear(String(+selectedYear - 1));
      setSelectedMonth(months[11]);
      changeYear(+selectedYear - 1);
      changeMonth(11);
    } else if (selectedMonthIndex < displayedMonthIndex) {
      setSelectedMonth(months[selectedMonthIndex + 1]);
      changeMonth(selectedMonthIndex + 1);
    } else if (selectedMonthIndex > displayedMonthIndex) {
      setSelectedMonth(months[selectedMonthIndex - 1]);
      changeMonth(selectedMonthIndex - 1);
    }
  }, [
    currentDate,
    selectedYear,
    changeYear,
    changeMonth,
    selectedMonth,
    months,
  ]);

  const decreaseMonthHandler = () => {
    decreaseMonth();
    let month = monthDate && monthDate.getMonth() - 1;
    if (monthDate && monthDate.getMonth() - 1 === -1) {
      month = 11;
      changeYear(currentDate.getFullYear() - 1);
      setSelectedYear(String(currentDate.getFullYear() - 1));
    }

    setSelectedMonth(months[month as number]);
  };

  const increaseMonthHandler = () => {
    increaseMonth();
    let month = monthDate && monthDate.getMonth() + 1;

    if (monthDate.getMonth() === 11) {
      month = 0;
      changeYear(currentDate.getFullYear() + 1);
      setSelectedYear(String(currentDate.getFullYear() + 1));
      setSelectedMonth(months[0]);
      return;
    }

    setSelectedMonth(months[month as number]);
  };

  useEffect(() => {
    const selectedYear = getYear(currentDate);
    const selectedMonth = getMonth(currentDate);

    const minYear = minDate ? getYear(minDate) : fromYear;
    const maxYear = maxDate ? getYear(maxDate) : toYear;

    const minMonth = minDate ? getMonth(minDate) : 0;
    const maxMonth = maxDate ? getMonth(maxDate) : 11;

    setIsPrevDisabled(selectedYear === minYear && selectedMonth <= minMonth);
    setIsNextDisabled(selectedYear === maxYear && selectedMonth >= maxMonth);
  }, [currentDate, fromYear, toYear, minDate, maxDate]);

  return (
    <div className="mb-2 flex items-center justify-between">
      <Button
        variant="ghost"
        className="ml-1 h-6 w-6 border p-0 focus-visible:ring-white dark:focus-visible:ring-black"
        disabled={isPrevDisabled}
        onClick={decreaseMonthHandler}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="h-4 w-4 dark:text-muted-foreground" />
      </Button>

      <span className="text-sm font-medium text-foreground">
        {format(date, 'MMMM yyyy')}
      </span>

      <Button
        variant="ghost"
        onClick={increaseMonthHandler}
        className="mr-1 h-6 w-6 border p-0"
        disabled={isNextDisabled}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="h-4 w-4 dark:text-muted-foreground" />
      </Button>
    </div>
  );
}
