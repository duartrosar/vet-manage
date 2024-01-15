"use client";

import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Login from "@/components/forms/auth/login";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  /**
   * TODO: it might be better to do this lower down in the
   * Login component and pass down the error to the form,
   * this will make it easiern to integrate with other errors
   * Plus AuthFormContainer shouldn't really care if there are any
   * errors in their children
   * */
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
