import { type PaginationState } from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { GlobalFilters } from '@/types/filters';
import { isTruthyValue, removeEmptyValuesFromObject } from '@/utils/common';
import { sessionStorageUtils } from '@/utils/session-storage';

export function useFilters({
  initialFilters,
  enabled = true,
  storageKey,
}: {
  initialFilters: GlobalFilters;
  enabled?: boolean;
  storageKey?: string;
}) {
  const getInitialFilters = useCallback(() => {
    if (storageKey) {
      const savedFilters = sessionStorageUtils.load(storageKey, {});
      return { ...initialFilters, ...savedFilters };
    }
    return initialFilters;
  }, [initialFilters, storageKey]);

  const getInitialPagination = useCallback(() => {
    const filtersToUse = getInitialFilters();
    return {
      pageIndex: (filtersToUse.page as number) - 1,
      pageSize: filtersToUse.page_size as number,
    };
  }, [getInitialFilters]);

  const [filters, setFilters] = useState<GlobalFilters>(() =>
    getInitialFilters(),
  );
  const [pagination, setPagination] = useState<PaginationState>(() =>
    getInitialPagination(),
  );

  const hasInitialized = useRef(false);
  const previousStorageKey = useRef<string | undefined>(storageKey);

  const form = useForm({
    defaultValues: initialFilters,
  });

  const formValues = form.watch();

  const onFilterSubmit = useCallback(
    (name: keyof GlobalFilters) => {
      setFilters((prev) => ({
        ...prev,
        [name]: formValues[name],
      }));
    },
    [formValues],
  );

  const onPaginationReset = useCallback(() => {
    setPagination({
      pageIndex: 0,
      pageSize: initialFilters?.page_size as number,
    });
  }, [initialFilters?.page_size]);

  const onFilterChange = useCallback(
    (newValues: GlobalFilters) => {
      Object.entries(newValues).forEach(([key, value]) => {
        form.setValue(key as keyof GlobalFilters, value, {
          shouldDirty: true,
          shouldTouch: true,
        });
      });
      setFilters((prev) => ({
        ...prev,
        ...newValues,
      }));

      if (newValues.page === undefined) {
        setFilters((prev) => ({
          ...prev,
          page: 1,
        }));
        onPaginationReset();
      }
    },
    [form, onPaginationReset],
  );

  const onFilterReset = useCallback(() => {
    const initialFiltersToReset = { ...initialFilters, page: 1 };
    form.reset(initialFiltersToReset);
    setFilters(initialFiltersToReset);

    if (storageKey) {
      sessionStorageUtils.remove(storageKey);
    }
  }, [form, initialFilters, storageKey]);

  const onFilterRemove = useCallback(
    (name: keyof GlobalFilters) => {
      form.setValue(name, initialFilters[name], {
        shouldDirty: true,
        shouldTouch: true,
      });

      setFilters((prev) => ({
        ...prev,
        [name]: initialFilters[name],
        page: 1,
      }));

      onPaginationReset();
    },
    [form, initialFilters, onPaginationReset],
  );

  const onPaginationChange = useCallback(
    (pagination: PaginationState) => {
      setPagination(pagination);
      onFilterChange({ page: pagination.pageIndex + 1 });
    },
    [onFilterChange],
  );

  const onSearchSubmit = useCallback(
    (name: keyof GlobalFilters) => {
      onFilterSubmit(name);
      onFilterChange({
        page: 1,
      });
      onPaginationReset();
    },
    [onFilterSubmit, onFilterChange, onPaginationReset],
  );

  const onSearchClear = useCallback(
    (name: keyof GlobalFilters) => {
      onFilterRemove(name);
      onFilterChange({
        page: 1,
      });
      onPaginationReset();
    },
    [onFilterRemove, onFilterChange, onPaginationReset],
  );

  useEffect(() => {
    if (enabled && !hasInitialized.current) {
      const filtersToUse = getInitialFilters();
      setFilters(filtersToUse);

      setPagination({
        pageIndex: (filtersToUse.page as number) - 1,
        pageSize: filtersToUse.page_size as number,
      });

      Object.entries(filtersToUse).forEach(([key, value]) => {
        const fieldKey = key as keyof GlobalFilters;

        if (fieldKey === 'start_time') {
          const isUserModified =
            String(value) !== String(initialFilters[fieldKey]);
          form.setValue(fieldKey, value as string, {
            shouldDirty: isUserModified,
            shouldTouch: isUserModified,
          });
        } else {
          const isDifferentFromInitial = value !== initialFilters[fieldKey];

          form.setValue(fieldKey, value, {
            shouldDirty: isDifferentFromInitial,
            shouldTouch: isDifferentFromInitial,
          });
        }
      });

      hasInitialized.current = true;
    }
  }, [enabled, form, getInitialFilters, initialFilters]);

  useEffect(() => {
    if (
      enabled &&
      hasInitialized.current &&
      storageKey !== previousStorageKey.current
    ) {
      const filtersToUse = getInitialFilters();
      setFilters(filtersToUse);

      setPagination({
        pageIndex: (filtersToUse.page as number) - 1,
        pageSize: filtersToUse.page_size as number,
      });

      Object.entries(filtersToUse).forEach(([key, value]) => {
        const fieldKey = key as keyof GlobalFilters;
        form.setValue(fieldKey, value, {
          shouldDirty: false,
          shouldTouch: false,
        });
      });

      previousStorageKey.current = storageKey;
    }
  }, [enabled, form, getInitialFilters, storageKey]);

  useEffect(() => {
    if (storageKey && hasInitialized.current) {
      sessionStorageUtils.save(storageKey, filters);
    }
  }, [filters, storageKey]);

  const { page, page_size, ...rest } = form.formState.dirtyFields;

  return {
    isFilterActive: isTruthyValue(rest),
    filterForm: form,
    activeFilters: removeEmptyValuesFromObject(filters) as GlobalFilters,
    pagination,
    onPaginationChange,
    onFilterSubmit,
    onFilterChange,
    onFilterReset,
    onFilterRemove,
    onSearchSubmit,
    onSearchClear,
  };
}


// /////////////
// /////////////
// /////////////     Odd version without sessionStorage
// /////////////


// "use client";
// import { type PaginationState } from '@tanstack/react-table';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';

// import { GlobalFilters } from '@/types/filters';
// import { isTruthyValue, removeEmptyValuesFromObject } from '@/utils/common';

// export function useFilters({
//   initialFilters,
//   enabled = true,
// }: {
//   initialFilters: GlobalFilters;
//   enabled?: boolean;
// }) {
//   const [filters, setFilters] = useState<GlobalFilters>(initialFilters);
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: initialFilters?.page_size as number,
//   });

//   const hasInitialized = useRef(false);

//   const form = useForm({
//     defaultValues: initialFilters,
//   });

//   const formValues = form.watch();

//   const onFilterSubmit = useCallback(
//     (name: keyof GlobalFilters) => {
//       setFilters((prev) => {
//         return {
//           ...prev,
//           [name]: formValues[name],
//         };
//       });
//     },
//     [formValues],
//   );

//   const onFilterChange = useCallback(
//     (newValues: GlobalFilters) => {
//       Object.entries(newValues).forEach(([key, value]) => {
//         form.setValue(key as keyof GlobalFilters, value, {
//           shouldDirty: true,
//           shouldTouch: true,
//         });
//       });
//       setFilters((prev) => {
//         return {
//           ...prev,
//           ...newValues,
//         };
//       });
//     },
//     [form],
//   );

//   const onFilterReset = useCallback(() => {
//     const initialFiltersToReset = { ...initialFilters, page: 1 };
//     form.reset(initialFiltersToReset);
//     setFilters(initialFiltersToReset);
//   }, [form, initialFilters]);

//   const onFilterRemove = useCallback(
//     (name: keyof GlobalFilters) => {
//       form.setValue(name, initialFilters[name], {
//         shouldDirty: true,
//         shouldTouch: true,
//       });

//       setFilters((prev) => {
//         return {
//           ...prev,
//           [name]: initialFilters[name],
//         };
//       });
//     },
//     [form, initialFilters],
//   );

//   const onPaginationChange = useCallback(
//     (pagination: PaginationState) => {
//       setPagination(pagination);
//       onFilterChange({ page: pagination.pageIndex + 1 });
//     },
//     [onFilterChange],
//   );

//   const onPaginationReset = useCallback(() => {
//     setPagination({
//       pageIndex: 0,
//       pageSize: initialFilters?.page_size as number,
//     });
//   }, [initialFilters?.page_size]);

//   const onSearchSubmit = useCallback(
//     (name: keyof GlobalFilters) => {
//       onFilterSubmit(name);
//       onFilterChange({
//         page: 1,
//       });
//       onPaginationReset();
//     },
//     [onFilterSubmit, onFilterChange, onPaginationReset],
//   );

//   const onSearchClear = useCallback(
//     (name: keyof GlobalFilters) => {
//       onFilterRemove(name);
//       onFilterChange({
//         page: 1,
//       });
//       onPaginationReset();
//     },
//     [onFilterRemove, onFilterChange, onPaginationReset],
//   );

//   useEffect(() => {
//     if (enabled && !hasInitialized.current) {
//       setFilters(initialFilters);
//       Object.entries(initialFilters).forEach(([key, value]) => {
//         form.setValue(key as keyof GlobalFilters, value);
//       });
//       hasInitialized.current = true;
//     }
//   }, [enabled, form, initialFilters]);

//   const { page, page_size, ...rest } = form.formState.dirtyFields;

//   return {
//     isFilterActive: isTruthyValue(rest),
//     filterForm: form,
//     activeFilters: removeEmptyValuesFromObject(filters) as GlobalFilters,
//     pagination,
//     onPaginationChange,
//     onFilterSubmit,
//     onFilterChange,
//     onFilterReset,
//     onFilterRemove,
//     onSearchSubmit,
//     onSearchClear,
//   };
// }
