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
    invalid_type_error: "You must select a date of birth",
  }),
  mobileNumber: z.string().optional(),
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
  imgUrl: z.string().optional(),
  gender: z.string().min(1, { message: "You must choose a value" }),
});

export const vetSchema = z.object({
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
  mobileNumber: z.string().optional(),
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
  imgUrl: z.string().optional(),
  gender: z.string().min(1, { message: "You must choose a value" }),
});

export const petSchema = z.object({
  name: z
    .string()
    .min(1, { message: "You must enter a first name" })
    .max(50, "Max length is 50 characters"),
  type: z
    .string()
    .min(1, { message: "You must enter a type" })
    .max(50, "Max length is 20 characters"),
  imgUrl: z.string().optional(),
  ownerId: z.number().min(1, { message: "You must choose an owner" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
  password: z.string().min(1, { message: "You must enter a password." }),
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "You must enter a first name" })
    .max(50, "Max length is 50 characters"),
  lastName: z
    .string()
    .min(1, { message: "You must enter a last name" })
    .max(50, "Max length is 50 characters"),
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
  password: z
    .string()
    .min(1, { message: "You must enter a password" })
    .max(50, "Max length is 50 characters"),
  // confirmPassword: z
  //   .string()
  //   .min(1, { message: "You must confirm your password" })
  //   .max(50, "Max length is 50 characters"),
});

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "You must enter a password" })
    .max(50, "Max length is 50 characters"),
  confirmPassword: z
    .string()
    .min(1, { message: "You must confirm your password" })
    .max(50, "Max length is 50 characters"),
});

export const appointmentSchema = z.object({
  subject: z.string().min(1, "You must enter a subject"),
  startTime: z.string().min(0, "You must select a start time"),
  endTime: z.string().min(0, "You must select an end time"),
  vetId: z.number().min(1, { message: "You must choose a vet" }),
  petId: z.number().min(1, { message: "You must choose a pet" }),
  description: z.string().min(1, "You must enter a description"),
});
