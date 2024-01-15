"use client";

import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Login from "@/components/forms/auth/login";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Please sign in with the same method you registered."
      : "";

  return (
    <AuthFormContainer error={error}>
      <Login />
    </AuthFormContainer>
  );
}
