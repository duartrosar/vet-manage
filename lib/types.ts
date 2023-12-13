import { IconType } from "react-icons";

import {
  FieldError,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  value?: string | null;
  name: string;
  type?: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  placeholder?: string;
}

export interface CustomInputProps<T extends FieldValues> extends InputProps<T> {
  dateValue?: Date | null;
  setValue: UseFormSetValue<T>;
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
  confirmPassword: string;
}

export interface SidebarItemsProp {
  title: string;
  urlPath: string;
  icon: IconType;
  displayTitle?: boolean;
}
