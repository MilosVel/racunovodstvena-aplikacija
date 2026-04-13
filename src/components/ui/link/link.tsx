import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { cn } from '@/utils/theme';
import { ReactNode } from 'react';

interface AppLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

export function AppLink({ className, children, ...props }: AppLinkProps) {
  return (
    <Link {...props} className={cn('text-foreground hover:text-primary', className)}>
      {children}
    </Link>
  );
}
