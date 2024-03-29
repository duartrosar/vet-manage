import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Owner, User } from "@prisma/client";
import { RegisterProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

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
  userId: string,
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

export const changeTime = (date: Date, timeString: string) => {
  const newDate = new Date(date);
  const [hours, minutes] = timeString.split(":");
  newDate.setHours(parseInt(hours, 10));
  newDate.setMinutes(parseInt(minutes, 10));
  return newDate;
};
