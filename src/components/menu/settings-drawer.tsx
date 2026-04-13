import { DarkModeImage, LightModeImage } from '@/components/theme';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ImageRadioButton } from '@/components/ui/form/image-radio-button';
import { useDisclosure } from '@/hooks';
import { useThemeActions, useThemeData } from '@/store';
import { THEME_TYPES, Theme } from '@/types/theme';

type SettingsDrawerProps = {
  triggerButton: React.ReactElement;
  title: string;
  description?: string;
};

export function SettingsDrawer({
  title,
  description,
  triggerButton,
}: SettingsDrawerProps) {
  const { toggle, isOpen } = useDisclosure();

  const { handleSetTheme } = useThemeActions();
  const { theme } = useThemeData();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetTheme(event.target.value as Theme);
  };

  return (
    <Drawer open={isOpen} onOpenChange={toggle}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex flex-col justify-between max-w-[540px]">
        <div className="flex flex-col overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle className="text-left">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="text-left">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="mt-5">
            <p className="mb-4 mt-2 text-foreground">APPEARANCE</p>
            <div className="flex items-center gap-x-5">
              <ImageRadioButton
                id={THEME_TYPES.LIGHT}
                name="themeRadio"
                value={THEME_TYPES.LIGHT}
                checked={theme === THEME_TYPES.LIGHT}
                onChange={handleThemeChange}
              >
                <LightModeImage className="h-full w-full" />
              </ImageRadioButton>

              <ImageRadioButton
                id={THEME_TYPES.DARK}
                name="themeRadio"
                value={THEME_TYPES.DARK}
                checked={theme === THEME_TYPES.DARK}
                onChange={handleThemeChange}
              >
                <DarkModeImage className="h-full w-full" />
              </ImageRadioButton>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
