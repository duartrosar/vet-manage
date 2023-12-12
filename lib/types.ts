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
  email: string;
  password: string;
  confirmPassword: string;
}
