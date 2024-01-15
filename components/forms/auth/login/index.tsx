"use client";

import Link from "next/link";
import LoginForm from "./login-form";
import GoogleSignin from "../google-signin";
import Separator from "../separator";

export default function Login() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-cerulean-100 ">Welcome back!</h1>
      <LoginForm />
      <Separator />
      <GoogleSignin text="Sign in with Google" />
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
    </div>
  );
}
