import { MainHeader } from '@/components/header/main-header';
import { Sidebar } from '@/components/menu/sidebar-menu/sidebar';
import { cn } from '@/utils/theme';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-grow">
      <aside
        className={cn(
          'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 dark:border-border bg-card dark:bg-sidebar-background 2xl:w-72 hidden xl:block',
        )}
      >
        <Sidebar />
      </aside>
      <main className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <div className="sticky top-0 z-40 w-full">
          <MainHeader />
        </div>
        <div className="w-full flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
