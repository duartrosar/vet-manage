// import { InputProps } from "@/lib/types";
import { Input, InputProps } from "@/components/ui/input";
import { toCamelCase } from "@/lib/utils";
import React, { FC, InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
  useFormContext,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<T>;
  label: string;
}

export default function TextInput<T extends FieldValues>({
  name,
  label,
  register,
  ...props
}: TextInputProps<T>) {
  // console.log(props);
  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={props.id}
        className="pl-3 text-sm font-bold text-gray-500"
      >
        {label}
      </label>
      <input
        {...props}
        {...(register(name as Path<T>) as UseFormRegisterReturn)}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        value={props.value}
        className="w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600"
      />
    </div>
  );
}
