"use client"

import { useState } from "react"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form, Input } from "@/components/ui/form"
import { signInSchema } from "../schemas"
import { oAuthSignIn, signIn } from "../actions"


export function SignInForm() {
  const [error, setError] = useState<string>()

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    const error = await signIn(data)
    setError(error)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      schema={signInSchema}
      className="space-y-8"
    >
      {({ register, formState: { errors } }) => (
        <>
          {error && <p className="text-destructive">{error}</p>}

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={async () => {
                console.log('Sign in with discord')
                await oAuthSignIn("discord")
              }}
            >
              Discord
            </Button>
            <Button
              type="button"
              onClick={async () => await oAuthSignIn("github")}
            >
              GitHub
            </Button>
            <Button
              type="button"
              onClick={async () => await oAuthSignIn("google")}
            >
              GOOGLE
            </Button>
          </div>

          <Input
            type="email"
            label="Email"
            error={errors.email}
            registration={register('email')}
          />

          <Input
            type="password"
            label="Password"
            error={errors.password}
            registration={register('password')}
          />

          <div className="flex gap-4 justify-end">
            <Button asChild variant="link">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button type="submit">Sign In</Button>
          </div>
        </>
      )}
    </Form>
  )
}

////////////////////////////////
////////////////////////////////
////////////////////////////////    Ispod je originalni kod
////////////////////////////////
////////////////////////////////


// "use client"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { oAuthSignIn, signIn } from "../actions"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"
// import { signInSchema } from "../schemas"
// import Link from "next/link"

// export function SignInForm() {
//   const [error, setError] = useState<string>()
//   const form = useForm<z.infer<typeof signInSchema>>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: z.infer<typeof signInSchema>) {
//     const error = await signIn(data)
//     setError(error)
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         {error && <p className="text-destructive">{error}</p>}
//         {/* --------------- */}
//         <div className="flex gap-4">
//           <Button
//             type="button"
//             // onClick={async () => await oAuthSignIn("discord")}
//             onClick={async () => {
//               console.log('Signi in with disord')
//               await oAuthSignIn("discord")
//             }
//             }
//           >
//             Discord
//           </Button>
//           <Button
//             type="button"
//             onClick={async () => await oAuthSignIn("github")}
//           >
//             GitHub
//           </Button>
//         </div>
//         {/* --------------- */}

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex gap-4 justify-end">
//           <Button asChild variant="link">
//             <Link href="/sign-up">Sign Up</Link>
//           </Button>
//           <Button type="submit">Sign In</Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
