import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/theme';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration?: Partial<UseFormRegisterReturn>;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onEndIconClick?: VoidFunction;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startIcon,
      endIcon,
      onEndIconClick,
      className,
      type,
      label,
      error,
      registration,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputClasses = cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-5 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      className,
    );

    return (
      <FieldWrapper label={label} error={error}>
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {startIcon}
          </div>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            inputClasses,
            className,
          )}
          ref={ref}
          autoComplete="off"
          {...registration}
          {...props}
        />
        {type === 'password' && (
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3 text-foreground">
            {showPassword ? (
              <EyeOffIcon
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={20}
              />
            ) : (
              <EyeIcon
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={20}
              />
            )}
          </div>
        )}
        {endIcon && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={onEndIconClick}
            role="button"
          >
            {endIcon}
          </div>
        )}
      </FieldWrapper>
    );
  },
);
Input.displayName = 'Input';

export { Input };
