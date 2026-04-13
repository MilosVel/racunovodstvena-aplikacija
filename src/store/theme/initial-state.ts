import { Theme } from '@/types/theme';

type ThemeStoreData = {
  theme: Theme;
};

type ThemeStoreActions = {
  actions: {
    handleSetTheme: (theme: Theme) => void;
  };
};

export type ThemeStore = ThemeStoreData & ThemeStoreActions;

export const THEME_STORE_INITIAL_STATE: ThemeStoreData = {
  theme: 'light',
};
