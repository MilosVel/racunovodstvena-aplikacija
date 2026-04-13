export const sessionStorageUtils = {
    save: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;
        try {
            if (value === null || value === undefined) {
                window.sessionStorage.removeItem(key);
            } else {
                window.sessionStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.warn(`Error saving to sessionStorage "${key}":`, error);
        }
    },

    load: <T>(key: string, fallback: T): T => {
        if (typeof window === 'undefined') return fallback;
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.warn(`Error loading from sessionStorage "${key}":`, error);
            return fallback;
        }
    },

    remove: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            window.sessionStorage.removeItem(key);
        } catch (error) {
            console.warn(`Error removing from sessionStorage "${key}":`, error);
        }
    },

    clear: (): void => {
        if (typeof window === 'undefined') return;
        try {
            window.sessionStorage.clear();
        } catch (error) {
            console.warn('Error clearing sessionStorage:', error);
        }
    },

    clearByKeys: (pattern: string): number => {
        if (typeof window === 'undefined') return 0;
        try {
            const keysToRemove: string[] = [];

            for (let i = 0; i < window.sessionStorage.length; i++) {
                const key = window.sessionStorage.key(i);
                if (key && key.includes(pattern)) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach((key) => {
                window.sessionStorage.removeItem(key);
            });

            console.log(
                `Cleared ${keysToRemove.length} keys matching pattern: "${pattern}"`,
            );
            return keysToRemove.length;
        } catch (error) {
            console.warn(`Error clearing keys matching pattern "${pattern}":`, error);
            return 0;
        }
    },
};
