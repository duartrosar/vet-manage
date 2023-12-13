import React from "react";
import RegisterForm from "./register-form";
import Link from "next/link";

export default function Register() {
  return (
    <div className="w-full max-w-2xl space-y-10 rounded-xl lg:border-2 lg:border-cerulean-500/10 lg:bg-cerulean-950 lg:px-10 lg:py-16 lg:shadow-2xl xl:px-20 2xl:py-32">
      <h1 className="mb-10 text-3xl font-bold text-cerulean-100">Register</h1>
      <RegisterForm />
      <div className="flex justify-center gap-1">
        <p className="text-sm text-white">Already have an account?</p>
        <Link className="text-center text-sm text-cerulean-400" href={"/login"}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
