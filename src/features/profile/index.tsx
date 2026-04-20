import Link from "next/link"

import { AppLogoSymbol } from '@/components/theme/app-logo-symbol';
import { Button } from '@/components/ui/button';
import { LogOutButton } from "@/auth/nextjs/components/LogOutButton"
import type { ProfilePageProps } from '@/auth/nextjs/currentUser';

export function ProfilePage({ user }: ProfilePageProps) {
  return (

    <div className="text-left">
      <div className="flex items-center border-b pl-4 pr-6 pb-5 pt-6">
        <div className="bg-background shadow p-2 rounded-md">
          <AppLogoSymbol />
        </div>
        <div className="ms-3">

        </div>

      </div>
      <p className="p-1 m-1"> {user?.name}</p>
      <p className="p-1 m-1"> {user?.email}</p>
      <p className="p-1 m-1">Role: {user?.role}</p>

      <div className="border-t px-2 space-x-2 pb-6 pt-5">
        {user?.role === "admin" && (
          <Button asChild variant="outline">
            <Link href="/admin">Admin Page</Link>
          </Button>
        )}
        <LogOutButton />
      </div>
    </div>
  );
}
