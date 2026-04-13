import { type FieldError } from 'react-hook-form';

import { cn } from '@/utils/theme';

import { ErrorMessage } from './error-message';
import { Label } from './label';

type FieldWrapperProps = {
  label?: string;
  customLabel?: boolean;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export function FieldWrapper(props: FieldWrapperProps) {
  const { label, error, children, className, customLabel } = props;
  return (
    <div tabIndex={0} className="outline-none">
      <Label
        className={cn({
          'font-lexend': customLabel,
        })}
      >
        {label}
        <div className={cn('relative mt-1', className)}>{children}</div>
      </Label>
      <ErrorMessage message={error?.message} />
    </div>
  );
}
