import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import ConfirmEmail from "@/components/forms/auth/confirm-email.tsx";
import React from "react";

export default function ConfirmEmailPage() {
  return (
    <AuthFormContainer>
      <ConfirmEmail />
    </AuthFormContainer>
  );
}
