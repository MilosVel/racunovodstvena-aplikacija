import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { cn } from '@/utils/theme';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

type UploadInputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    accept: string;
    control: Control<T>;
    name: string;
    percentageUploaded: number;
  };

function UploadInput<T extends FieldValues>({
  className,
  label,
  error,
  accept,
  name,
  control,
  percentageUploaded,
  ...props
}: UploadInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange, ...field } }) => {
        return (
          <FieldWrapper label={label} error={error}>
            <input
              {...props}
              {...field}
              onChange={(event) => {
                onChange(event.target.files?.[0]);
              }}
              type="file"
              className={cn(
                'flex w-full rounded-md border border-input bg-transparent px-3 py-2.5 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
                className,
              )}
              accept={accept}
            />
            {!!percentageUploaded && (
              <p className="mt-2 ml-1 text-primary">
                {Math.ceil(percentageUploaded)}% uploaded
              </p>
            )}
          </FieldWrapper>
        );
      }}
    />
  );
}

UploadInput.displayName = 'UploadInput';

export { UploadInput };
