"use client";

import Input from "@/components/forms/inputs/input";
import { LoginProps } from "@/lib/types";
import { loginSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInResponse, signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app";
  console.log("callbackUrl", callbackUrl);
  const [loginError, setLoginError] = useState("");
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const processForm: SubmitHandler<LoginProps> = async (data: LoginProps) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="w-full">
      <div className="relative flex w-full flex-col gap-4">
        {errors.root && (
          <span className="text-right text-xs font-bold text-red-500">
            {errors.root.message}
          </span>
        )}
        <Input<LoginProps>
          type="text"
          name="Email"
          register={register}
          error={errors.email}
          placeholder="hello@example.com"
        />
        <Input<LoginProps>
          type="password"
          name="Password"
          register={register}
          error={errors.password}
          placeholder="password"
        />

        {loginError && (
          <span className="text-right text-xs font-bold text-red-500">
            {loginError}
          </span>
        )}

        <button
          type="submit"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            if (pending) e.preventDefault;
          }}
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-cerulean-100 hover:bg-cerulean-700 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Login
        </button>
      </div>
    </form>
  );
}
