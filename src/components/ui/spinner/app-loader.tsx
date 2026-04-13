import { AppLogo } from '@/components/theme/app-logo';

export function AppLoader() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen flex-col items-center justify-center gap-y-6 bg-background opacity-75">
      <AppLogo className="h-16" />
      <div className="container">
        <div className="mx-auto h-1 w-[250px] bg-muted dark:bg-popover">
          <div className="animate-slide h-1 w-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
