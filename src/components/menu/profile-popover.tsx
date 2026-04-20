import { UserRoundCog } from 'lucide-react';
import { useState } from 'react';

import { AppLogoSymbol } from '@/components/theme/app-logo-symbol';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ProfilePage } from '@/features/profile';
import type { ProfilePageProps } from '@/auth/nextjs/currentUser';


export function ProfilePopover({ user }: ProfilePageProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="ghost"
          size="icon"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md md:h-10 md:w-10 dark:bg-sidebar-background/15"
        >
          <UserRoundCog className="h-6 w-6" strokeWidth={1.2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <ProfilePage user={user} />
      </PopoverContent>
    </Popover>
  );
}
