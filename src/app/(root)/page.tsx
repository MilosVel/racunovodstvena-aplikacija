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
                <div className=" mt-4 border-2 p-2">
                    <div className='m-2'>
                        <p className="font-semibold">
                            Zdravo <span className="font-bold">{fullUser?.name || 'korisniče'}</span>
                        </p>
                    </div>

                    <div className='m-2'>
                        <p className="">
                            Ova aplikacija je napravljena da pomogne u obavljanju svakodnevnih raöunovodstvenih poslova.
                        </p>
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
