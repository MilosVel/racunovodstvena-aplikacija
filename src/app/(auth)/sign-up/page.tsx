import { SignUpForm } from "@/auth/nextjs/components/SignUpForm"

export default function SignUp() {
  return (
    <div className="container mx-auto p-4 max-w-[750px] border-2 mt-2">
      <div>
        <div className="p-2">
          <p>Sign Up</p>
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
