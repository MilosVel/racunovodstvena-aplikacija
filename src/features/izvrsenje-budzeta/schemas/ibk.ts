import { z } from "zod";

export const IbkSchema = z.object({
    ibk: z.union([z.string(), z.number()])
        .transform(val => String(val).trim())
        .refine(val => /^\d{5}$/.test(val), { message: "jbkjs must be exactly 5 digits" }),
});

export type ibkItem = z.infer<typeof IbkSchema>;