import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Login from "@/components/forms/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import LoginContainer from "@/components/forms/auth/login";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/app");
  }

  return (
    <AuthFormContainer>
      <Login />
    </AuthFormContainer>
  );
}
