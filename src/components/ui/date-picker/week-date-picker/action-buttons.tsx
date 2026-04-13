import { Button } from '@/components/ui/button';

type ActionButtonsProps = {
  onClearDate: VoidFunction;
  isConfirmButtonDisabled: boolean;
  onSaveDate: VoidFunction;
};

export function ActionButtons({
  onClearDate,
  isConfirmButtonDisabled,
  onSaveDate,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        variant="ghost"
        className="h-7 w-16 border py-4 dark:border-border dark:text-foreground"
        onClick={onClearDate}
      >
        Clear
      </Button>

      <Button
        variant="ghost"
        className="h-7 w-16 border py-4 dark:border-border dark:text-foreground"
        disabled={isConfirmButtonDisabled}
        onClick={onSaveDate}
      >
        Save
      </Button>
    </div>
  );
}
