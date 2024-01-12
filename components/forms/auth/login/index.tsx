"use client";

import Link from "next/link";
import LoginForm from "./login-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Login() {
  const onClick = () => {
    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="w-full max-w-2xl space-y-10 rounded-xl lg:border-2 lg:border-cerulean-500/10 lg:bg-cerulean-950 lg:px-20 lg:py-32 lg:shadow-2xl">
      <h1 className="mb-10 text-3xl font-bold text-cerulean-100">
        Welcome back!
      </h1>
      <LoginForm />
      <div className="w-full border-b-2 border-cerulean-700/25"></div>
      <button
        onClick={() => onClick()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      >
        <FcGoogle className="h-7 w-7" />
        Sign in with Google
      </button>
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
