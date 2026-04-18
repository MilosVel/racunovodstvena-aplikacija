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

import { UserOAuthAccountTable } from "@/drizzle/schema/users/user-oauth-accounts-table"

export const userRoles = ["admin", "user"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_roles", userRoles)

export const UserTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text(),
    salt: text(),
    role: userRoleEnum().notNull().default("user"),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
})

export const userRelations = relations(UserTable, ({ many }) => ({
    oAuthAccounts: many(UserOAuthAccountTable), // jedan user moze odraditi sugnup na vise nacina
}))