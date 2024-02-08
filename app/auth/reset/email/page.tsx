import SendResetEmailForm from "@/components/forms/auth/reset-password/send-reset-form";
import React from "react";

export default function SendResetPasswordEmailPage() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-cerulean-100 ">
          Reset your password
        </h1>
        <SendResetEmailForm />
      </div>
    </>
  );
}
