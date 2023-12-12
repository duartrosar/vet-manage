import Logo from "@/components/logo";
import React from "react";

export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cerulean-950/50 backdrop-blur-[2px]">
      <div className="relative w-4/5 max-w-md">
        <div className="absolute inset-0 rounded-lg bg-pink-700/25 blur-2xl"></div>
        <div className="relative flex w-full flex-col items-center gap-10 rounded-xl border-2 border-cerulean-500/25 bg-gradient-to-tr from-cerulean-900 via-cerulean-950 to-cerulean-900 px-6 py-8 shadow-2xl sm:px-8 sm:py-16">
          <Logo />
          {children}
        </div>
      </div>
    </div>
  );
}
