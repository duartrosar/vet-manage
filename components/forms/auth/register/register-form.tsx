"use client";

import { RegisterProps } from "@/lib/types";
import { registerSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getUser, createUserWithOwner } from "@/lib/db/actions/user-actions";
import { Form, FormField } from "@/components/ui/form";
import ControlledTextInput from "../../inputs/controlled-text-input";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "dashboard";
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { pending } = useFormStatus();
  const form = useForm<RegisterProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const processForm: SubmitHandler<RegisterProps> = async (
    data: RegisterProps,
  ) => {
    // const isPasswordMatch = data.password === data.confirmPassword;
    // ("Owner data: ", data);

    // if (!isPasswordMatch) {
    //   setPasswordError("Passwords do not match");
    //   return;
    // }

    let { user } = await getUser(data.email);

    if (user) {
      setRegisterError("That email is already being used.");
      return;
    }

    try {
      const { user, success } = await createUserWithOwner(data);

      if (!user) {
        setRegisterError("User was not created");
        return;
      }

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="relative flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <ControlledTextInput
              label="First Name"
              placeholder="John"
              type="text"
              error={form.formState.errors.firstName}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <ControlledTextInput
              label="Last Name"
              placeholder="Doe"
              type="text"
              error={form.formState.errors.lastName}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <ControlledTextInput
              label="Email"
              placeholder="hello@example.com"
              type="email"
              error={form.formState.errors.email}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <ControlledTextInput
              label="Password"
              placeholder="Password"
              type="password"
              error={form.formState.errors.password}
              {...field}
            />
          )}
        />
        {/* <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <ControlledTextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              {...field}
            />
          )}
        /> */}
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
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-sm text-cerulean-100 hover:bg-cerulean-800/50 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Register
        </button>
      </form>
    </Form>
  );
}
