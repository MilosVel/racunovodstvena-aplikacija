import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

import { Tooltip } from '@/components/ui/date-picker/multiple-days-date-picker/Tooltip';

type DatePickerInputProps = {
  selectedDates: Date[];
  placeholder: string;
  handleClearDates: VoidFunction;
};

export function DatePickerInput({
  selectedDates,
  placeholder,
  handleClearDates,
}: DatePickerInputProps) {
  return (
    <>
      <CalendarIcon className="mx-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
      {selectedDates && selectedDates.length > 0 ? (
        <span className="ml-1 max-w-[calc(100%-45px)] text-[13px]">
          <span>{format(selectedDates[0], 'yyyy-MM-dd')}</span>
          {selectedDates.length > 1 && (
            <Tooltip
              content={selectedDates
                .slice(1)
                .map((date) => format(date, 'yyyy-MM-dd'))}
            >
              <span className="ml-1 cursor-pointer text-[13px] text-primary">
                and {selectedDates.length - 1} more
              </span>
            </Tooltip>
          )}
        </span>
      ) : (
        <span className="ml-2 text-muted-foreground">{placeholder}</span>
      )}

      {selectedDates && selectedDates.length > 0 && (
        <X
          onClick={handleClearDates}
          className="absolute right-2 top-[50%] size-4 translate-y-[-50%]"
        />
      )}
    </>
  );
}
