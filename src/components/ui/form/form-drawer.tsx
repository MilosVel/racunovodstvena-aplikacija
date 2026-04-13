import { Button } from '../button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer';

type FormDrawerProps = {
  isDone: boolean;
  triggerButton: React.ReactNode;
  submitButton: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange: VoidFunction;
};

export function FormDrawer({
  title,
  description,
  children,
  triggerButton,
  submitButton,
  isOpen = false,
  onOpenChange,
}: FormDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex flex-col justify-between max-w-[540px]">
        <div className="flex flex-col">
          <DrawerHeader>
            <DrawerTitle className="text-left">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="text-left">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div>{children}</div>
        </div>
        <DrawerFooter className="flex-col sm:flex-col md:flex-col gap-y-4 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          {submitButton}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
