import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Owner } from "@prisma/client";
import { toCamelCase } from "@/lib/utils";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

interface AddressInputProps<T extends FieldValues> {
  name: string;
  schemaProp: string;
  register: UseFormRegister<T>;
}

export default function Address<T extends FieldValues>({
  register,
  error,
}: InputProps<T>) {
  const ownerRegister = register as unknown as UseFormRegister<Owner>;
  return (
    <>
      <div className="flex flex-col gap-1">
        <AddressInput<Owner>
          schemaProp="address"
          name="Address"
          register={ownerRegister}
        />
      </div>
      {/* <div className="flex flex-col gap-1">
        <AddressInput<Owner>
          schemaProp="address"
          name="Address Line 2"
          register={ownerRegister}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <AddressInput<Owner>
            schemaProp="address"
            name="Post Code"
            register={ownerRegister}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AddressInput<Owner>
            schemaProp="address"
            name="County"
            register={ownerRegister}
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
  schemaProp,
}: AddressInputProps<T>) {
  const inputId = toCamelCase(name);

  return (
    <>
      <label htmlFor={inputId} className="pl-3 text-sm font-bold text-gray-500">
        {name}
      </label>
      <input
        {...(register(schemaProp as Path<T>) as UseFormRegisterReturn)}
        type="text"
        name={inputId}
        className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
    </>
  );
}
