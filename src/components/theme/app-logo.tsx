import { useThemeData } from '@/store';

import logoWhire from '@/assets/logo-white.jpg';
import logoDark from '@/assets/logo-dark.jpg';
import { cn } from '@/utils/theme';
import Image from "next/image";


export function AppLogo({ className }: { className?: string }) {
  const { isDarkMode } = useThemeData();

  const logo = isDarkMode ? logoDark : logoWhire;

  return (
    <Image
      src={logo}
      loading="lazy"
      alt=" logo"
      className={cn('h-12', className)}
    />
  );
}
