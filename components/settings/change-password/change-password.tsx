"use client";

import { Form, FormField } from "@/components/ui/form";
import { changeCurrentPasswordSchema } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledTextInput from "@/components/forms/inputs/controlled-text-input";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";
import { verifyUserSetPassword } from "@/lib/db/actions/token-actions";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { getPasswordHash, setNewPassword } from "@/lib/db/actions/user-actions";
import { validatePassword } from "@/lib/db/actions/auth-actions";

interface PasswordFormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export default function ChangePasswordForm({ user }: { user: User }) {
  const form = useForm<PasswordFormData>({
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
    resolver: zodResolver(changeCurrentPasswordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    console.log({ data });

    const { hash } = await getPasswordHash(user.id);

    if (!hash) {
      renderToast("danger", "No user was found");
      return;
    }

    const isPasswordValid = await validatePassword(hash, data.currentPassword);

    if (!isPasswordValid) {
      // const error = ErrorOption
      form.setError("currentPassword", {
        type: "min",
        message: "Your password is not correct",
      });
      return;
    }

    // TODO: Set better error handling, the solution will probably be to create a ControllPasswordInput, so we can a have a show password toggle button as well
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "min",
        message: "Passwords don't match",
      });
      return;
    }

    if (data.currentPassword === data.password) {
      form.setError("password", {
        type: "min",
        message: "You must choose a different password",
      });
      return;
    }

    const { success } = await setNewPassword(user.id, data.password);

    if (!success) {
      renderToast("danger", "There was an error updating your password");
      return;
    }

    renderToast("success", "Password updated sucessfully");
  };

  function renderToast(type: "danger" | "success", message: string) {
    toast.custom((t) => <Toast t={t} message={message} type={type} />);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          name="currentPassword"
          control={form.control}
          render={({ field }) => (
            <ControlledTextInput
              label="Current"
              placeholder="Current Password"
              {...field}
              type="password"
              error={form.formState.errors.currentPassword}
            />
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <ControlledTextInput
              label="New Password"
              placeholder="New Password"
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
