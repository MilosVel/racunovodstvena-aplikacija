import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Sidebar } from '@/components/menu/sidebar-menu/sidebar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useDisclosure } from '@/hooks';

type MobileSidebarProps = {
  triggerButton: React.ReactElement;
};

export function MobileSidebar({ triggerButton }: MobileSidebarProps) {
  const { toggle, isOpen } = useDisclosure();

  return (
    <Drawer open={isOpen} onOpenChange={toggle}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent
        className="flex flex-col justify-between max-w-[540px] p-0"
        side="left"
      >
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle className="text-left">Title</DrawerTitle>
            <DrawerDescription className="text-left">
              Description
            </DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>

        <Sidebar handleToggleSidebar={toggle} />
      </DrawerContent>
    </Drawer>
  );
}
