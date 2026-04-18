import { relations } from "drizzle-orm"
import {
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    integer
} from "drizzle-orm/pg-core"

import { UserTable } from "@/drizzle/schema/users/user"


export const oAuthProviders = ["discord", "github", 'google'] as const
export type OAuthProvider = (typeof oAuthProviders)[number]
export const oAuthProviderEnum = pgEnum("oauth_provides", oAuthProviders)

export const UserOAuthAccountTable = pgTable(
    "user_oauth_accounts",
    {
        userId: uuid()
            .notNull()
            .references(() => UserTable.id, { onDelete: "cascade" }),
        provider: oAuthProviderEnum().notNull(), // jedan od oAuthProviders
        providerAccountId: text().notNull().unique(), // userId on github, discord ...
        createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp({ withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    t => [primaryKey({ columns: [t.providerAccountId, t.provider] })] // primary key je kombinacija ovih
)

export const userOauthAccountRelationships = relations(
    UserOAuthAccountTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [UserOAuthAccountTable.userId],
            references: [UserTable.id],
        }),
    })
)

