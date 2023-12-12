import AuthFormContainer from "@/components/forms/auth/auth-form-container";
import LoginForm from "@/components/forms/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/app");
  }

  return (
    <AuthFormContainer>
      <LoginForm />
      <div className="flex w-full flex-col items-center gap-2">
        <Link
          className="text-center text-sm text-cerulean-400"
          href={"/reset-password"}
        >
          Forgot your password?
        </Link>
        <div className="flex gap-1">
          <p className="text-sm text-white">Don't have an Account? </p>
          <Link
            className="text-center text-sm text-cerulean-400"
            href={"/register"}
          >
            Create One
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
}
