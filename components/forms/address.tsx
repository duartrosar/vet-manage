import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Owner } from "@/lib/types";
import { toCamelCase } from "@/lib/utils";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

interface AddressInputProps<T extends FieldValues> {
  name: string;
  register: UseFormRegister<T>;
}

export default function Address<T extends FieldValues>({
  register,
  error,
}: InputProps<T>) {
  console.log(error);
  const ownerRegister = register as unknown as UseFormRegister<Owner>;
  return (
    <>
      <div className="flex flex-col gap-1">
        <AddressInput<Owner> name="Address Line 1" register={ownerRegister} />
      </div>
      {/* <div className="flex flex-col gap-1">
        <AddressInput<Owner>
          name="Address Line 2"
          register={ownerRegister}
          error={error}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <AddressInput<Owner>
            name="Post Code"
            register={ownerRegister}
            error={error}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AddressInput<Owner>
            name="County"
            register={ownerRegister}
            error={error}
          />
        </div>
      </div> */}
      {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )}
    </>
  );
}

function AddressInput<T extends FieldValues>({
  name,
  register,
}: AddressInputProps<T>) {
  const inputId = toCamelCase(name);
  // console.log(error);

  return (
    <>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
        type="text"
        name={inputId}
        className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
      {/* {error && (
        <span className="text-right text-xs font-bold text-red-500">
          {error.message}
        </span>
      )} */}
    </>
  );
}
