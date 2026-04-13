import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/theme';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    customLabel?: boolean;
    registration?: Partial<UseFormRegisterReturn>;
  };

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, registration, customLabel, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} customLabel={customLabel}>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 font-inter text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...registration}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
