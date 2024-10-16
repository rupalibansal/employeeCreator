import { z } from "zod";

export const addressSchema = z.object({
  streetAddress: z.string().nonempty("Street Address is required"),
  suburb: z.string().nonempty("Suburb is required"),
  postalCode: z.string().nonempty("Postal Code is required"),
  state: z.string().nonempty("State is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
