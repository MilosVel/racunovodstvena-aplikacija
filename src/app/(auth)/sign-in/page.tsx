import { SignInForm } from "@/auth/nextjs/components/SignInForm"

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>
}) {
  const { oauthError } = await searchParams

  return (
    <div className="container mx-auto p-4 max-w-[750px]">
      <div className="border-2 p-2 rounded-md">
        <div className="p-2">
          <p>Sign In</p>
          {oauthError && (
            <p className="text-destructive">
              {oauthError}
            </p>
          )}
        </div>
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
