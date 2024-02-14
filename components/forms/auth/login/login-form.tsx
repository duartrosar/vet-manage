"use client";

import { LoginProps } from "@/lib/types";
import { loginSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/db/actions/auth-actions";
import Toast from "@/components/toast/toasters";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/form";
import ControlledTextInput from "../../inputs/controlled-text-input";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loginError, setLoginError] = useState("");
  const { pending } = useFormStatus();
  const form = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const processForm: SubmitHandler<LoginProps> = async (data: LoginProps) => {
    ({ callbackUrl });

    const result = await login(data, callbackUrl);

    if (result?.error) {
      toast.custom((t) => <Toast t={t} message={result.error} type="danger" />);

      return;
    }

    if (result?.success) {
      toast.custom((t) => (
        <Toast
          t={t}
          message="You must confirm your email address"
          type="success"
        />
      ));
      ("Logged in...");
      return;
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

        {loginError && (
          <span className="text-right text-xs font-bold text-red-500">
            {loginError}
          </span>
        )}

        <button
          type="submit"
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-sm text-cerulean-100 hover:bg-cerulean-800/50 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Login
        </button>
      </form>
    </Form>
  );
}
