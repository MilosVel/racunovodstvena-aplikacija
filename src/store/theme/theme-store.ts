import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

import { STORE_KEYS } from '@/shared/constants';
import type { ThemeStore } from '@/store/theme/initial-state';
import { THEME_STORE_INITIAL_STATE } from '@/store/theme/initial-state';
import type { Theme } from '@/types/theme';
import { handleApplyThemePreference } from '@/utils/theme';


const useThemeStore = create(
  devtools(
    persist<ThemeStore>(
      (set) => ({
        ...THEME_STORE_INITIAL_STATE,
        actions: {
          handleSetTheme: (theme: Theme) => {
            handleApplyThemePreference(theme); // Ovo handlovati ovde ili sa useEffectom u app root-u
            set(() => ({
              theme,
            }));
          },
        },
      }),
      {
        name: STORE_KEYS.THEME,
        partialize: ({ actions, ...rest }) => rest as ThemeStore,
      },
    ),
  ),
);

export function useThemeData() {
  return useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      isDarkMode: state.theme === 'dark',
    })),
  );
}

export function useThemeActions() {
  return useThemeStore((state) => state.actions);
}
