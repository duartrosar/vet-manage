import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Login from "@/components/forms/auth/login";
import React from "react";

export default async function LoginPage() {
  return (
    <AuthFormContainer>
      <Login />
    </AuthFormContainer>
  );
}
