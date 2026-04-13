import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { badgeVariants } from '@/components/ui/badge/variants';
import { cn } from '@/utils/theme';

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
