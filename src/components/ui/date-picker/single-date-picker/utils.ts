import { isSameDay, isSameMonth } from 'date-fns';

import { cn } from '@/utils/theme';

export function generateDateClassName({
  selectedDate,
  startDate,
  displayedMonth,
}: {
  selectedDate: Date;
  startDate: Date | undefined;
  displayedMonth: Date | undefined;
}) {
  const monthIsSame =
    displayedMonth && isSameMonth(selectedDate, displayedMonth);

  const isStartDate = startDate && isSameDay(selectedDate, startDate);

  const today = new Date();
  const isToday = isSameDay(selectedDate, today);

  return cn('bg-background', {
    'text-foreground dark:text-foreground dark:bg-background text-[12px]':
      monthIsSame,
    'text-muted-foreground dark:text-muted-foreground dark:bg-background dark:hover:text-foreground':
      !monthIsSame,
    'bg-primary text-secondary hover:text-primary dark:hover:text-white dark:text-primary-foreground dark:bg-primary':
      isStartDate,
    'bg-muted dark:bg-muted': isToday && !startDate,
  });
}
