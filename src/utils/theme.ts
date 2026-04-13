import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { THEME_TYPES } from '@/types/theme';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApplyThemePreference(theme: string) {
  const { DARK, LIGHT } = THEME_TYPES;
  const isDark = theme === DARK;
  const root = window.document.documentElement;
  root.classList.remove(isDark ? LIGHT : DARK);
  root.classList.add(theme);
}
