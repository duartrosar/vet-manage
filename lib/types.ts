import {
  FieldError,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  name: string;
  type?: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

export interface CustomInputProps<T extends FieldValues> extends InputProps<T> {
  setValue: UseFormSetValue<T>;
  clearErrors: UseFormClearErrors<T>;
  options?: string[];
}
