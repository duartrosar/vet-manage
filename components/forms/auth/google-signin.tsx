"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export default function GoogleSignin({ text }: { text: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = () => {
    signIn("google", { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <button
      onClick={() => onClick()}
      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
    >
      <FcGoogle className="h-7 w-7" />
      {text}
    </button>
  );
}
