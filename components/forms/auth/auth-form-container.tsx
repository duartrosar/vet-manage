import Logo from "@/components/logo";
import React from "react";

export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cerulean-950/50 backdrop-blur-[2px]">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-lg bg-pink-700/25 blur-2xl"></div>
        <div className="relative flex h-full flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]  from-pink-800/80 via-cerulean-900 to-cerulean-950 shadow-2xl lg:flex-row ">
          <div className="flex items-center justify-center bg-cerulean-950/25 px-6 py-8 backdrop-blur-2xl sm:px-8 sm:py-16 lg:w-1/2 ">
            <Logo size="lg" orientation="col" />
          </div>
          <div className="flex items-center justify-center bg-cerulean-950/25 px-6 py-8 backdrop-blur-2xl sm:px-8 sm:py-16 lg:w-1/2 lg:justify-start">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
