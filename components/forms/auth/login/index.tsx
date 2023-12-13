"use client";

import Link from "next/link";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="w-full max-w-2xl space-y-10 rounded-xl lg:border-2 lg:border-cerulean-500/10 lg:bg-cerulean-950 lg:px-20 lg:py-32 lg:shadow-2xl">
      <h1 className="mb-10 text-3xl font-bold text-cerulean-100">
        Welcome back!
      </h1>
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
    </div>
  );
}
