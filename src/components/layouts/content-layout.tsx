import { RouteHeader } from '@/components/ui/route-header';
import { cn } from '@/utils/theme';

export function ContentLayout({
  children,
  routeTitle,
  className,
}: {
  routeTitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('w-full mt-5 flex flex-grow flex-col px-5', className)}>
      {routeTitle && <RouteHeader title={routeTitle} />}
      <div className="w-full">{children}</div>
    </div>
  );
}
