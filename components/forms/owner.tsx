"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createOwner } from "../../lib/data";
import ImageSelector from "./image-selector";
import Input from "./input";
import Selector from "./selector";
import DateSelector from "./date-selector";

export default function OwnerForm() {
  const [message, formAction] = useFormState(createOwner, null);
  const { pending } = useFormStatus();
  return (
    <div className="h-full overflow-auto p-3">
      <form action={formAction} className="relative flex flex-col gap-3">
        <ImageSelector />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Input name="First Name" />
            {/* {errors.firstName && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.lastName.message}
                </span>
              )} */}
          </div>
          <div className="flex flex-col gap-1">
            <Input name="Last Name" />
            {/* {errors.lastName && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.lastName.message}
                </span>
              )} */}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex w-full flex-col gap-1">
            <DateSelector />
            {/* {errors.dateOfBirth && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.dateOfBirth.message}
                </span>
              )} */}
          </div>
          <div className="relative flex flex-col gap-1">
            <Selector />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Input name="Email" type="email" />
            {/* {errors.email && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.email.message}
                </span>
              )} */}
          </div>
          <div className="flex flex-col gap-1">
            <Input name="Mobile Number" type="tel" />
            {/* {errors.mobileNumber && (
                <span className="text-right text-xs font-bold text-red-500">
                  {errors.mobileNumber.message}
                </span>
              )} */}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Input name="Address Line 1" />
        </div>
        <div className="flex flex-col gap-1">
          <Input name="Address Line 2" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Input name="Post Code" />
          </div>
          <div className="flex flex-col gap-1">
            <Input name="County" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              if (pending) e.preventDefault;
            }}
            className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-3 py-2 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 text-cerulean-100"
          >
            Create Owner
          </button>
        </div>
      </form>
    </div>
  );
}
