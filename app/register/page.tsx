import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import Register from "@/components/forms/auth/register";
import RegisterForm from "@/components/forms/auth/register";
import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <AuthFormContainer>
      <Register />
    </AuthFormContainer>
  );
}
