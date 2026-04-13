import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/theme';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';

type CommonDialogProps = {
  triggerButton?: React.ReactNode;
  confirmButton?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  content: React.ReactNode;
  closeButtonText?: string;
  isOpen?: boolean;
  onOpenChange: VoidFunction;
  withCloseButton?: boolean;
  className?: string | undefined;
  lightBackdrop?: boolean;
};

export function CommonDialog({
  triggerButton,
  confirmButton,
  title,
  description,
  content,
  closeButtonText = 'Close',
  isOpen = false,
  onOpenChange,
  withCloseButton = false,
  className,
  lightBackdrop,
}: CommonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        lightBackdrop={lightBackdrop}
        className={cn(
          'overflow-y-auto max-h-[95%] rounded-sm max-w-md',
          className,
        )}
      >
        <DialogHeader className="flex">
          <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>

          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <VisuallyHidden>
              <DialogDescription>{description}</DialogDescription>
            </VisuallyHidden>
          )}
        </DialogHeader>

        <div className="mt-2">{content}</div>

        {withCloseButton && (
          <DialogFooter className="flex-col gap-y-4">
            <Button variant="outline" onClick={onOpenChange}>
              {closeButtonText}
            </Button>
            {confirmButton}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
