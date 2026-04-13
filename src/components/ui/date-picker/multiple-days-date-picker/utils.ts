import { isSameDay, isSameMonth } from 'date-fns';

import { cn } from '@/utils/theme';

export function generateDateClassName({
  date,
  selectedDates,
  displayedMonth,
}: {
  date: Date;
  selectedDates: Date[];
  displayedMonth: Date | undefined;
}) {
  const monthIsSame = displayedMonth && isSameMonth(date, displayedMonth);

  const isSelected = selectedDates?.some((selectedDate) =>
    isSameDay(selectedDate, date),
  );

  const today = new Date();
  const isToday = isSameDay(date, today);

  return cn('bg-background', {
    'text-foreground dark:text-foreground dark:bg-background text-[12px]':
      monthIsSame,
    'text-muted-foreground dark:text-muted-foreground dark:bg-background dark:hover:text-foreground':
      !monthIsSame,
    'bg-primary text-secondary hover:text-primary dark:hover:text-white dark:text-primary-foreground dark:bg-primary':
      isSelected,
    'bg-muted dark:bg-muted':
      isToday && (!selectedDates || selectedDates.length === 0),
  });
}
