import { ErrorMessage } from '@/components/ui/form/error-message';
import { generateWeekDays } from '@/utils/format-date';
import { cn } from '@/utils/theme';

type RepeatWeekDayPickerProps = {
  onDaySelect: (day: number) => void;
  selectedDays: number[];
  placeholder: string;
  uniqueDaysInDateRange: string[];
  error: string | undefined;
};

const weekDays = generateWeekDays({ shortWeekDay: false });

export function RepeatWeekDayPicker({
  onDaySelect,
  selectedDays,
  placeholder,
  uniqueDaysInDateRange,
  error,
}: RepeatWeekDayPickerProps) {
  const renderedRepeatWeekDayPicker = weekDays.map((day) => {
    return (
      <button
        type="button"
        key={day.value}
        className={cn('size-10 rounded-full border disabled:opacity-40', {
          'border-primary text-primary': selectedDays.includes(day.value),
        })}
        onClick={() => onDaySelect(day.value)}
        disabled={!uniqueDaysInDateRange.includes(day.label)}
      >
        <span className="text-center font-lexend text-xs">{day.label}</span>
      </button>
    );
  });

  return (
    <div className="flex flex-col gap-y-4 rounded-md border p-4">
      <span className="text-sm">{placeholder}</span>
      <div className="flex items-center gap-x-3">
        {renderedRepeatWeekDayPicker}
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}
