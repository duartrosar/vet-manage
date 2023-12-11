import { LoginButton } from "@/components/auth/auth";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-3 rounded-lg border border-cerulean-800 bg-cerulean-950 p-16 shadow-lg">
        <LoginButton />
        <Link
          href="/app"
          className="text-3xl text-cerulean-500 hover:scale-110 hover:opacity-80"
        >
          GO TO APP
        </Link>
      </div>
    </div>
  );
}
