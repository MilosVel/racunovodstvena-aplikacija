import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/theme';

import { buttonVariants } from './variants';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  withIconSpacing?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      icon,
      iconPosition = 'left',
      withIconSpacing = true,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner size={14} className="text-current" />}
        {!isLoading && icon && iconPosition === 'left' && (
          <span
            className={cn({
              'mr-2': withIconSpacing,
            })}
          >
            {icon}
          </span>
        )}
        <span className="mx-0.5">{children}</span>
        {!isLoading && icon && iconPosition === 'right' && (
          <span
            className={cn({
              'ml-2': withIconSpacing,
            })}
          >
            {icon}
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button };
