import { isSameDay, isSameMonth } from 'date-fns';

import { cn } from '@/utils/theme';

export function generateDateClassName({
  date,
  startDate,
  endDate,
  displayedMonth,
}: {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  displayedMonth: Date | null;
}) {
  const monthIsSame = displayedMonth && isSameMonth(date, displayedMonth);

  const isStartDate = startDate && isSameDay(date, startDate);

  const isEndDate = endDate && isSameDay(date, endDate);

  const isBetween = startDate && endDate && date > startDate && date < endDate;

  const today = new Date();
  const isToday = isSameDay(date, today);

  return cn('bg-background', {
    'text-foreground text-[12px]': monthIsSame,
    'text-muted-foreground hover:text-foreground': !monthIsSame,
    'bg-primary text-secondary hover:text-primary dark:hover:text-white dark:text-primary-foreground dark:bg-primary':
      isStartDate || isEndDate || isBetween,
    'bg-muted dark:bg-muted': isToday && !startDate,
  });
}
