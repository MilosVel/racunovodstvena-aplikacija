export const THEME_TYPES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type Theme = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];
