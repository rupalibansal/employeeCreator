import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const employeeSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid Email format"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  address: addressSchema,
  department: z.string().nonempty("Department is required"),
  startDate: z.string().nonempty("Start Date is required"),
  isPermanent: z.boolean(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
