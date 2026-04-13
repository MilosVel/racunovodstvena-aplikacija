import { UserRoundCog } from 'lucide-react';
import { useState } from 'react';

import { AppLogoSymbol } from '@/components/theme/app-logo-symbol';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


export function ProfilePopover() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSignout = () => {
    console.log('signout');
  }

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
        <div className="text-left">
          <div className="flex items-center border-b pl-4 pr-6 pb-5 pt-6">
            <div className="bg-background shadow p-2 rounded-md">
              <AppLogoSymbol />
            </div>
            <div className="ms-3">
              <p className="font-semibold">{'Milos'}</p>
              <p>{'milos@gmail.com'}</p>
            </div>
          </div>
          <div className="border-t px-6 pb-6 pt-5">
            <Button
              className="h-auto w-full justify-start p-0 font-medium outline-none hover:bg-transparent focus-visible:ring-0"
              variant="ghost"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
