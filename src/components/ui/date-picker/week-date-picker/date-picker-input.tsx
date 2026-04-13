import { format, isSameMonth } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type DatePickerInputProps = {
  placeholder: string;
  weekRange: (Date | null)[];
};

export function DatePickerInput({
  weekRange,
  placeholder,
}: DatePickerInputProps) {
  const [startDate, endDate] = weekRange;
  const datesInSameMonth =
    startDate && endDate ? isSameMonth(startDate, endDate) : false;
  return (
    <div className="flex items-center justify-start cursor-pointer">
      <CalendarIcon className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
      {startDate && endDate ? (
        <span className="text-sm font-medium">
          {format(startDate, datesInSameMonth ? 'd' : `d MMM`)} -{' '}
          {format(endDate, 'd')} {format(endDate, 'MMM yyyy')}
        </span>
      ) : (
        <span className="text-gray-500 dark:text-gray-300">{placeholder}</span>
      )}
    </div>
  );
}
