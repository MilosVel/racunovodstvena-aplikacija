// import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"

export function createGoogleOAuthClient() {
    return new OAuthClient({
        provider: "google",
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        scopes: [
            "openid",
            "profile",
            "email"
        ], // https://developers.google.com/identity/protocols/oauth2/scopes

        urls: {
            auth: "https://accounts.google.com/o/oauth2/v2/auth",
            token: "https://oauth2.googleapis.com/token",
            user: "https://www.googleapis.com/oauth2/v3/userinfo", // Google user info endpoint
        },

        userInfo: {
            schema: z.object({
                sub: z.string(), // "sub" is the unique user ID in OpenID
                name: z.string().optional(),
                email: z.string().email(),
                picture: z.string().url().optional(),
            }),

            parser: user => ({
                id: user.sub,
                name: user.name ?? user.email,
                email: user.email,
            }),
        },
    })
}
