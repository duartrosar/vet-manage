"use client";

import Input from "@/components/forms/inputs/input";
import Logo from "@/components/logo";
import React from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cerulean-950/25 backdrop-blur-[2px]">
      <div className="flex w-4/5 max-w-sm flex-col items-center gap-3 rounded-xl border border-cerulean-700/25 bg-gradient-to-tr from-cerulean-950 via-cerulean-900 to-cerulean-950 px-4 py-5">
        <Logo />
        <div className="w-full space-y-3">
          <Input
            type="text"
            name="Email"
            register={register}
            error={errors.password}
            placeholder="hello@example.com"
          />
          <Input
            type="password"
            name="Password"
            register={register}
            error={errors.password}
            placeholder="password"
          />
          <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              if (pending) e.preventDefault;
            }}
            className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
