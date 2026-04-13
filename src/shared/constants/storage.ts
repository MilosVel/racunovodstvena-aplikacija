export const STORE_KEYS = {
    AUTH: 'crm-auth-storage',
    THEME: 'crm-theme-storage',
    TOKEN: 'crm-token-storage',
    PERMISSIONS: 'crm-permissions-storage',
    MODAL: 'crm-modal-storage',
} as const;

export const SESSION_STORAGE_KEYS = {
    COMPANY: 'crm-company',
    MEMBERS: 'crm-members',
    SHIFTS: 'crm-outlet-shifts',
    SHIFTS_SELECTED_OUTLET: 'crm-outlet-shifts-selected-outlet',
} as const;
