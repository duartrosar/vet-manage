import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import RegisterForm from "@/components/forms/auth/register";
import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <AuthFormContainer>
      <RegisterForm />
      <div className="flex gap-1">
        <p className="text-sm text-white">Already have an account?</p>
        <Link className="text-center text-sm text-cerulean-400" href={"/login"}>
          Sign In
        </Link>
      </div>
    </AuthFormContainer>
  );
}
