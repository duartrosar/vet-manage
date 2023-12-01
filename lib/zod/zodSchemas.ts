import { z } from "zod";

export const ownerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "You must enter a first name" })
    .max(50, "Max length is 50 characters"),
  lastName: z
    .string()
    .min(1, { message: "You must enter a last name" })
    .max(50, "Max length is 50 characters"),
  dateOfBirth: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
  mobileNumber: z
    .string()
    .min(1, { message: "You must enter a mobileNumber" })
    .max(50, "Max length is 20 characters"),
  address: z
    .string()
    .min(1, { message: "You must enter an address" })
    .max(50, "Max length is 100 characters"),
  imgUrl: z.string().optional(),
  gender: z.string().min(1, { message: "You must choose a value" }),
});
