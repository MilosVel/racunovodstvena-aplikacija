import { cn } from '@/utils/theme';

export function RouteHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-10', className)}>
      <h1>{title}</h1>
    </div>
  );
}
