"use client";

import { Form, FormField } from "@/components/ui/form";
import { changePasswordSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledTextInput from "../../inputs/controlled-text-input";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import { verifyUserSetPassword } from "@/lib/db/actions/token-actions";
import { useRouter } from "next/navigation";

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ChangePasswordForm({
  token,
  isReset = false,
}: {
  token?: string;
  isReset?: boolean;
}) {
  const router = useRouter();
  const form = useForm<PasswordFormData>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    // TODO: Set better error handling, the solution will probably be to create a ControllPasswordInput, so we can a have a show password toggle button as well
    if (data.password !== data.confirmPassword) {
      toast.custom((t) => (
        <Toast t={t} message="Passwords don't match" type="danger" />
      ));
      return;
    }

    if (token) {
      const result = await verifyUserSetPassword(token, data.password);

      if (result.success) {
        toast.custom((t) => (
          <Toast
            t={t}
            message={
              isReset
                ? "Your password was updated."
                : "Password created successfully."
            }
            type="success"
          />
        ));

        router.push("/login");
        return;
      }

      toast.custom((t) => (
        <Toast
          t={t}
          message={
            isReset
              ? "There was an error updating your password."
              : "There was an error creating your password."
          }
          type="danger"
        />
      ));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <ControlledTextInput
              label="Password"
              placeholder="Password"
              {...field}
              type="password"
              error={form.formState.errors.password}
            />
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <ControlledTextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              {...field}
              type="password"
              error={form.formState.errors.confirmPassword}
            />
          )}
        />
        <button
          type="submit"
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-sm text-cerulean-100 hover:bg-cerulean-700 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Save
        </button>
      </form>
    </Form>
  );
}
