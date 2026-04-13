'use client'

// import { useNavigate } from 'react-router';

// import { appRoutes } from '@/app/routes/config/app-routes';
import { SidebarLinks } from '@/components/menu/sidebar-menu/sidebar-links';
import { AppLogo } from '@/components/theme/app-logo';
import { AppLink } from '@/components/ui/link';
// import { usePathname, useRouter } from "next/navigation";
import { redirect } from "next/navigation";

type SidebarMenuProps = {
  handleToggleSidebar?: VoidFunction;
};

export function Sidebar({ handleToggleSidebar }: SidebarMenuProps) {
  // const navigate = useNavigate();

  // const router = useRouter();
  // const pathname = usePathname();

  const handleNavigate = (path: string) => () => {
    handleToggleSidebar?.();
    redirect(path)
    // // navigate(path);
  };

  return (
    <>
      <div className="sticky top-0 z-40 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
        {/* <AppLink to={'/'} onClick={handleToggleSidebar}> */}
        <AppLink href={'/admin'} >
          <AppLogo />
        </AppLink>
      </div>

      <div className="h-[calc(100%-80px)] overflow-y-auto">
        <SidebarLinks onSidebarItemClick={handleNavigate} />
      </div>
    </>
  );
}
