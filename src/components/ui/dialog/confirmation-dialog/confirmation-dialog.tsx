import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { CircleAlert, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';

type ConfirmationDialogProps = {
  triggerButton?: React.ReactNode;
  confirmButton: React.ReactNode;
  title: string;
  body?: string | React.ReactNode;
  cancelButtonText?: string;
  icon?: 'danger' | 'info';
  isOpen?: boolean;
  onOpenChange: VoidFunction;
  lightBackdrop?: boolean;
};

export function ConfirmationDialog({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  icon = 'danger',
  isOpen = false,
  lightBackdrop = false,
  onOpenChange,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" lightBackdrop={lightBackdrop}>
        <DialogHeader className="flex">
          <DialogTitle className="flex items-center gap-2">
            {' '}
            {icon === 'danger' && (
              <CircleAlert
                className="size-6 text-destructive"
                aria-hidden="true"
              />
            )}
            {icon === 'info' && (
              <Info className="size-6 text-primary" aria-hidden="true" />
            )}
            {title}
          </DialogTitle>

          <VisuallyHidden>
            <DialogDescription>Description</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        {body && (
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            {typeof body === 'string' ? (
              <div className="mt-2">
                <p>{body}</p>
              </div>
            ) : (
              <div className="mt-2">{body}</div>
            )}
          </div>
        )}

        <DialogFooter>
          <div className="flex flex-col justify-end gap-x-3 gap-y-3 sm:flex-row sm:gap-y-0">
            {confirmButton}
            <Button variant="outline" onClick={onOpenChange}>
              {cancelButtonText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
