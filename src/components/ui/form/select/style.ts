export const selectStyles = {
  controlStyles: {
    base: 'min-w-[180px] border border-border rounded-md hover:cursor-pointer hover:bg-secondary py-[1px] px-3',
    focus: 'border-border ring-ring ring-primary-500',
    nonFocus: 'border-border',
  },
  placeholderStyles: 'text-muted-foreground text-sm ml-1',
  selectInputStyles: 'text-muted-foreground text-sm ml-1',
  valueContainerStyles: 'text-foreground text-sm',
  singleValueStyles: 'ml-1',
  multiValueStyles:
    'ml-1 bg-background border border-border rounded items-center py-[1px] pl-2 pr-1 gap-1.5',
  multiValueLabelStyles: 'leading-6 py-[1px]',
  multiValueRemoveStyles:
    'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background',
  indicatorsContainerStyles: '',
  clearIndicatorStyles: 'text-gray-500 p-1 rounded-md hover:text-red-800',
  indicatorSeparatorStyles: 'bg-mutated',
  dropdownIndicatorStyles: 'hover:text-foreground text-gray-500',
  menuStyles: 'mt-2 p-2 border border-border bg-card text-sm rounded-md',
  optionsStyle:
    'bg-card p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer',
  groupHeadingStyles:
    'ml-1 mt-2 mb-1 font-semibold uppercase text-gray-500 text-xs bg-background',
  noOptionsMessageStyles: 'text-muted-foreground bg-background',
};
