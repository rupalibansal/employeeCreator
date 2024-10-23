import { z } from "zod";
import { addressSchema } from "./addressSchema";

const australianPhoneNumberRegex =
  /^(\(0[2-8]\)\s?\d{4}\s?\d{4}|0[2-8]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$/;

const acceptedDomain = (fieldValue: string) => {
  return fieldValue.endsWith("luxethreads.com");
};

export const employeeSchema = z.object({
  firstName: z.string().min(3, "Please enter your first name"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Please enter your last name"),
  email: z
    .string()
    .email("Please enter a valid email")
    .refine(acceptedDomain, {
      message: "Only luxethreads.com domain is allowed",
    }),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      australianPhoneNumberRegex,
      "Phone Number must be a valid Australian number"
    ),
  address: addressSchema,
  department_id: z.number(),
  startDate: z.string().min(1, "Please enter a start date"),
  isPermanent: z.boolean(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
