import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthFormContainer>{children}</AuthFormContainer>;
}
