"use client";
import { Menu, Settings } from 'lucide-react';

import { ProfilePopover } from '@/components/menu/profile-popover';
import { SettingsDrawer } from '@/components/menu/settings-drawer';
import { MobileSidebar } from '@/components/menu/sidebar-menu/mobile-sidebar';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks';
import { cn } from '@/utils/theme';
import type { ProfilePageProps } from '@/auth/nextjs/currentUser';

export function MainHeader({ user }: ProfilePageProps) {
  const { isScrolled } = useScroll();

  return (
    <div
      className={cn(
        'w-full py-3 bg-background/80 backdrop-blur-sm sticky-header transition-shadow duration-200',
        {
          'shadow-sm': isScrolled,
        },
      )}
    >
      <div className="flex items-center justify-between px-5">
        <div>
          <MobileSidebar
            triggerButton={
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto p-0 xl:hidden"
              >
                <Menu className="mt-1 size-6" />
              </Button>
            }
          />
        </div>
        <div className="flex items-center gap-x-5">
          <SettingsDrawer
            title="Settings"
            description="Change app settings"
            triggerButton={
              <Button
                variant="ghost"
                size="icon"
                className="relative size-[34px] shadow backdrop-blur-md md:size-10 dark:bg-sidebar-background/15"
              >
                <Settings className="size-5" strokeWidth={1.5} />
              </Button>
            }
          />
          <ProfilePopover user={user} />
        </div>
      </div>
    </div>
  );
}
