"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="cursor-pointer rounded-xl border border-cerulean-100/25 px-5 py-2 text-center text-white hover:opacity-90"
    >
      Sign In
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="cursor-pointer rounded-xl border border-cerulean-100/25 px-5 py-2 text-white hover:opacity-90"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};
