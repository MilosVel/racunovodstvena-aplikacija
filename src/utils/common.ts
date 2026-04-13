import { differenceInYears, parseISO } from 'date-fns';
import merge from 'lodash/merge';

import { CommonGroupOption, GroupedOption, SelectOption } from '@/types/select';

export function groupBy<T, K extends keyof T>(items: T[], key: K) {
    const groups = items
        .reduce((acc, item) => {
            const groupKey = String(item[key]);
            if (!acc.has(groupKey)) {
                acc.set(groupKey, { title: groupKey, data: [] });
            }
            acc.get(groupKey)?.data.push(item);
            return acc;
        }, new Map<string, CommonGroupOption<T>>())
        .values();

    return Array.from(groups);
}

export function createSelectGroup<T>(
    items: T[],
    key: keyof T,
    formatItem: (item: T) => SelectOption,
) {
    const groups = items
        .reduce((acc, current) => {
            const groupKey = String(current[key]);

            const { label, value } = formatItem(current);

            if (!acc.has(groupKey)) {
                acc.set(groupKey, {
                    label: groupKey,
                    options: [],
                });
            }

            acc.get(groupKey)?.options.push({ label, value });

            return acc;
        }, new Map<string, GroupedOption>())
        .values();

    return Array.from(groups);
}

export function createSelectOption<T>(
    items: T[] = [],
    formatItem: (item: T) => SelectOption,
): SelectOption[] {
    return items.map(formatItem);
}

export function convertStringToLowercase(text: string) {
    return text.toLowerCase();
}

export function removeEmptyValuesFromObject(obj: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
}

export function convertUppercaseToCapitalize(text: string) {
    return (
        text.charAt(0).toUpperCase() +
        text.slice(1).replaceAll('_', ' ').toLowerCase()
    );
}

export function isTruthyValue(value: unknown) {
    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value as Record<string, unknown>).length > 0;
    }

    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    return !!value;
}

export function isFile(file: File | null) {
    if (!file) {
        throw new Error('Expected a File, but received null');
    }
    return file;
}

export function createNumberRange(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

export function isUnderAge(birthDate: string, ageToCheck = 18) {
    if (!birthDate) return false;

    const today = new Date();
    const parsedBirthDate = parseISO(birthDate);
    const age = differenceInYears(today, parsedBirthDate);

    return age < ageToCheck;
}


export function formatValueWithUnit(
    value: number | undefined,
    unit: string,
    defaultText = 'Not set',
) {
    if (value === undefined || value === null) {
        return defaultText;
    }

    return `${value} ${unit}`;
}



export function generateMinutesWithInterval(interval: number = 5) {
    return Array.from({ length: Math.ceil(61 / interval) }, (_, index) => {
        const minuteValue = index * interval;
        return {
            value: String(minuteValue),
            label: `${minuteValue} min`,
        };
    });
}

export function findArrayUnion<T>(arr1: T[], arr2: T[]) {
    const set1 = new Set(arr1);

    return [...new Set(arr2.filter((item) => set1.has(item)))];
}



export const pluralize = (
    count: number,
    singular: string,
    plural?: string,
): string => {
    if (count === 1) {
        return singular;
    }
    return plural || `${singular}s`;
};


export function mergeArraysByKeys<T1, T2>(
    array1: T1[],
    array2: T2[],
    key1: keyof T1,
    key2: keyof T2,
): (T1 & T2)[] {
    const map = new Map<number, T1 & T2>();

    array1.forEach((item) => {
        const key = item[key1];
        if (typeof key === 'number') {
            map.set(key, structuredClone(item) as T1 & T2);
        }
    });

    array2.forEach((item) => {
        const key = item[key2];
        if (typeof key === 'number') {
            const existing = map.get(key);
            if (existing) {
                map.set(key, merge(structuredClone(existing), structuredClone(item)));
            } else {
                map.set(key, structuredClone(item) as T1 & T2);
            }
        }
    });

    return Array.from(map.values());
}


// Example Data
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
];

const orders = [
    { userId: 1, orderTotal: 100 },
    { userId: 2, orderTotal: 150 },
    { userId: 3, orderTotal: 200 }, // This user does not exist in `users`
];

const mergedData = mergeArraysByKeys(users, orders, "id", "userId");

// console.log(mergedData);

// [
//     { id: 1, name: 'Alice', age: 25, userId: 1, orderTotal: 100 },
//     { id: 2, name: 'Bob', age: 30, userId: 2, orderTotal: 150 },
//     { userId: 3, orderTotal: 200 }
//  ]

