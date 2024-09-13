import { IconType } from "react-icons";

import {
  FieldError,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { InputHTMLAttributes } from "react";

export interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  // value?: string | null;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

export interface CustomInputProps<T extends FieldValues> extends InputProps<T> {
  dateValue?: Date | null;
  selectedOption?: string | null;
  setSelectedOption: UseFormSetValue<T>;
  clearErrors: UseFormClearErrors<T>;
  options?: string[];
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

export interface SidebarItemProps {
  title: string;
  urlPath: string;
  icon: IconType;
}

export interface TableHeading {
  title: string;
  display: string;
}
