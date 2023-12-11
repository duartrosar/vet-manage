import { InputProps } from "@/lib/types";
import { toCamelCase } from "@/lib/utils";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

export default function Input<T extends FieldValues>({
  name,
  type = "text",
  register,
  error,
  placeholder,
}: InputProps<T>) {
  const inputId = toCamelCase(name);
  // console.log(error);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type={type}
        name={inputId}
        placeholder={placeholder ? placeholder : name}
        className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
      {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
}
