export const runtime = "nodejs"; // Ova linija koda mozda mora zbog: -> import crypto from "crypto"    // Mozda moze da se koristi web crypto


import { LogOutButton } from "@/auth/nextjs/components/LogOutButton"
import { getCurrentUser } from "@/auth/nextjs/currentUser"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
    const fullUser = await getCurrentUser({ withFullUser: true })

    return (
        <div className="container mx-auto p-4">
            {fullUser == null ? (
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </div>
            ) : (
                <div className="max-w-[500px] mt-4 border-2 p-2">
                    <div>
                        <p className="p-2 m-2">User: {fullUser.name}</p>
                        <p className="p-2 m-2">Role: {fullUser.role}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button asChild variant="outline">
                            <Link href="/settings">Settings Page</Link>
                        </Button>
                        {fullUser.role === "admin" && (
                            <Button asChild variant="outline">
                                <Link href="/admin">Admin Page</Link>
                            </Button>
                        )}
                        <LogOutButton />
                    </div>
                </div>
            )}
        </div>
    )
}
