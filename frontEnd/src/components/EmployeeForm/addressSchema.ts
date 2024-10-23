import { z } from "zod";

export const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street Address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  postalCode: z
    .string()
    .min(1, "Postal Code is required")
    .regex(/^\d{4}$/, "Postal Code must be a 4-digit number"),
  state: z.string().min(1, "State is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
