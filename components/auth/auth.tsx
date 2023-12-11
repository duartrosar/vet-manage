"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      className="cursor-pointer rounded-xl border border-cerulean-100/25 px-5 py-2 text-white hover:opacity-90"
      onClick={() => signIn()}
    >
      Sign In
    </button>
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
