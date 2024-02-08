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
import { z } from "zod";
import { resetPassword } from "@/lib/db/actions/auth-actions";

interface SendResetFormData {
  email: string;
}

const resetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "You must enter an email" })
    .max(50, "Max length is 50 characters"),
});

export default function SendResetEmailForm() {
  const form = useForm<SendResetFormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: SendResetFormData) => {
    const { success, message } = await resetPassword(data.email);

    if (!success) {
      toast.custom((t) => <Toast t={t} message={message} type="danger" />);
      return;
    }

    toast.custom((t) => <Toast t={t} message={message} type="success" />);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <ControlledTextInput
              label="Email"
              placeholder="Email"
              {...field}
              type="email"
              error={form.formState.errors.email}
            />
          )}
        />
        <button
          type="submit"
          className="w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-800 px-6 py-2 text-sm text-cerulean-100 hover:bg-cerulean-700 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        >
          Send Reset Link
        </button>
      </form>
    </Form>
  );
}
