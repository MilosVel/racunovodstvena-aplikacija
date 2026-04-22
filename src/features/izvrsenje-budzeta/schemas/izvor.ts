import { z } from "zod";

export const IzvoriSchema = z.object({
    izvor: z.union([z.string(), z.number()])
        .transform(val => String(val).trim())
        .refine(val => /^\d{2}$/.test(val), { message: "izvor must be exactly 2 digits" }),
    ispfi_kolona: z.union([z.string(), z.number()])
        .transform(val => String(val).trim())
        .refine(val => /^\d{1}$/.test(val), { message: "ispfi_kolona must be exactly 1 digits" }),

});

export type izvorItem = z.infer<typeof IzvoriSchema>;