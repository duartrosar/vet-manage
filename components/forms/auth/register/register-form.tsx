"use client";

import Input from "@/components/forms/inputs/input";
import { RegisterProps } from "@/lib/types";
import { registerSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getUser, createUserWithOwner } from "@/lib/db/actions";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "dashboard";
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<RegisterProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const processForm: SubmitHandler<RegisterProps> = async (
    data: RegisterProps,
  ) => {
    const isPasswordMatch = data.password === data.confirmPassword;
    console.log("Owner data: ", data);

    if (!isPasswordMatch) {
      setPasswordError("Passwords do not match");
      return;
    }

    let { user } = await getUser(data.email);

    if (user) {
      console.log("Existing User: ", user);
      setRegisterError("That email is already being used.");
      return;
    }

    try {
      const { user, success } = await createUserWithOwner(data);

      if (!user) {
        setRegisterError("User was not created");
        return;
      }

      console.log("Created User ", user);

      if (success) {
        router.push("/app");
      }

      // TODO: render error and delete user
    } catch (error) {
      // TODO: handle exceptions
      const { user } = await getUser(data.email);
      if (user) {
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="w-full">
      <div className="relative flex w-full flex-col gap-4">
        {errors.root && (
          <span className="text-right text-xs font-bold text-red-500">
            {errors.root.message}
          </span>
        )}
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          <Input<RegisterProps>
            name="First Name"
            register={register}
            error={errors.firstName}
          />
          <Input<RegisterProps>
            name="Last Name"
            register={register}
            error={errors.lastName}
          />
        </div>
        <Input<RegisterProps>
          type="text"
          name="Email"
          register={register}
          error={errors.email}
          placeholder="hello@example.com"
        />
        <Input<RegisterProps>
          type="password"
          name="Password"
          register={register}
          error={errors.password}
          placeholder="password"
        />
        <Input<RegisterProps>
          type="password"
          name="Confirm Password"
          register={register}
          error={errors.confirmPassword}
          placeholder="confirm password"
        />
        {registerError && (
          <span className="text-right text-xs font-bold text-red-500">
            {registerError}
          </span>
        )}
        {passwordError && (
          <span className="text-right text-xs font-bold text-red-500">
            {passwordError}
          </span>
        )}

        <button
          type="submit"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            if (pending) e.preventDefault;
          }}
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-cerulean-100 hover:bg-cerulean-700 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Register
        </button>
      </div>
    </form>
  );
}
