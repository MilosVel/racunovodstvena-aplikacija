// import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
export function createGithubOAuthClient() {
  return new OAuthClient({
    provider: "github",
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    scopes: ["user:email", "read:user"], // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
    urls: {
      auth: "https://github.com/login/oauth/authorize",
      token: "https://github.com/login/oauth/access_token",
      user: "https://api.github.com/user",
    },
    userInfo: {  // ovo isto treba da bude precizirano u dokumentaciji
      schema: z.object({
        id: z.number(),
        name: z.string().nullable(),
        login: z.string(),
        email: z.string().email().nullable(), // email moze da bud null
      }),
      parser: user => ({
        id: user.id.toString(),
        name: user.name ?? user.login,
        email: user.email ?? user.login, // fallback za email
      }),
    },
  })
}




///////////////////////
///////////////////////
///////////////////////    Originalni kod je ispod
///////////////////////
///////////////////////



// ///// // Mora se modifikovati schema u skladu sa rawData u base.ts ili da se odradi return rawData u base.ts bez schema.pare(rawData)

// import { env } from "@/data/env/server"
// import { OAuthClient } from "./base"
// import { z } from "zod"
// // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
// export function createGithubOAuthClient() {
//   return new OAuthClient({
//     provider: "github",
//     clientId: env.GITHUB_CLIENT_ID,
//     clientSecret: env.GITHUB_CLIENT_SECRET,
//     scopes: ["user:email", "read:user"], // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
//     urls: {
//       auth: "https://github.com/login/oauth/authorize",
//       token: "https://github.com/login/oauth/access_token",
//       user: "https://api.github.com/user",
//     },
//     userInfo: {  // ovo isto treba da bude precizirano u dokumentaciji
//       schema: z.object({
//         id: z.number(),
//         name: z.string().nullable(),
//         login: z.string(),
//         email: z.string().email(),
//       }),
//       parser: user => ({
//         id: user.id.toString(),
//         name: user.name ?? user.login,
//         email: user.email,
//       }),
//     },
//   })
// }
