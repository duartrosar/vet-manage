"use client";

import Logo from "@/components/logo";
import React, { Suspense } from "react";

export default function AuthFormContainer({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <Suspense>
      <div className="relative flex h-screen flex-col items-center bg-cerulean-950/50 from-pink-800/80 via-cerulean-900  to-cerulean-950 backdrop-blur-[2px] sm:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]">
        <div className=" items-center justify-center pb-6 pt-12">
          <Logo size="sm" orientation="row" />
        </div>

        <div className="w-full max-w-lg rounded-xl bg-cerulean-950 p-8 sm:border-2 sm:border-cerulean-500/10 sm:shadow-2xl">
          {children}
          {error && (
            <div
              className="mt-2
          text-center text-sm text-red-500"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
