import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type DatePickerInputProps = {
  selectedDate: Date | undefined;
  placeholder: string;
};

export function DatePickerInput({
  selectedDate,
  placeholder,
}: DatePickerInputProps) {
  return (
    <div className="flex items-center justify-start cursor-pointer whitespace-nowrap">
      <CalendarIcon className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
      {selectedDate ? (
        <span className="ml-2 max-w-[calc(100%-45px)] text-[13px]">{`${format(selectedDate, 'yyyy-MM-dd')}`}</span>
      ) : (
        <span className="ml-2 text-muted-foreground">{placeholder}</span>
      )}
    </div>
  );
}
