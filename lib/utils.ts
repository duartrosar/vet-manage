import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Owner, User } from "@prisma/client";
import { RegisterProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(input: string): string {
  const words = input.split(" ");

  // Convert the first word to lowercase
  const firstWord = words[0].toLowerCase();

  // Join the words and return the result
  return firstWord + words.slice(1).join("");
}

export function propertiesOf<TObj>(_obj: TObj | undefined = undefined) {
  return function result<T extends keyof TObj>(name: T) {
    return name;
  };
}

export function generateOwnerFromUser(
  data: RegisterProps,
  userId: number,
): Owner {
  const owner: Owner = {
    id: 0,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userId: userId,
    dateOfBirth: null,
    gender: null,
    mobileNumber: null,
    address: null,
    imageUrl: null,
  };

  return owner;
}

// input: "First Name", returns: "firstName"
// input: "Date Of Birth", returns: "dateOfBirth"
// input: "Address", returns: "address".

// input: "First Name", returns: "Firstname"
// input: "Date Of Birth", returns: "DateOfBirth"
// input: "Address", returns: "Address".
