import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Register from "@/components/forms/auth/register";
import React from "react";

export default function RegisterPage() {
  return (
    <AuthFormContainer>
      <Register />
    </AuthFormContainer>
  );
}
