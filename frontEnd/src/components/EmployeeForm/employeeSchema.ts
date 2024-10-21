import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const employeeSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid Email format"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  address: addressSchema,
  department_id: z.number(),
  startDate: z.string().nonempty("Start Date is required"),
  isPermanent: z.boolean(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
