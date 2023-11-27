import { toCamelCase } from "@/lib/utils";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: string;
  type?: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

export default function Input<T extends FieldValues>({
  name,
  type = "text",
  register,
  error,
}: InputProps<T>) {
  const inputId = toCamelCase(name);
  // console.log(error);

  return (
    <>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
      {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )}
    </>
  );
}
