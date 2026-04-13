import logoWhite from '@/assets/logo-white.jpg';
import logoDark from '@/assets/logo-dark.jpg';
import { useThemeData } from '@/store';
import Image from "next/image";

export function AppLogoSymbol() {
  const { isDarkMode } = useThemeData();

  const logo = isDarkMode ? logoDark : logoWhite;

  return (
    <Image
      loading="lazy"
      src={logo}
      alt="logo"
      className="w-full"
    />
  );
}
