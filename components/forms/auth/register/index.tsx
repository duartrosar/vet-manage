import React from "react";
import RegisterForm from "./register-form";
import Link from "next/link";
import GoogleSignin from "../google-signin";
import Separator from "../separator";

export default function Register() {
  return (
    <>
      <h1 className="text-xl font-bold text-cerulean-100">Register</h1>
      <RegisterForm />
      <Separator />
      <GoogleSignin text="Register with Google" />
      <div className="flex justify-center gap-1">
        <p className="text-sm text-white">Already have an account?</p>
        <Link className="text-center text-sm text-cerulean-400" href={"/login"}>
          Sign In
        </Link>
      </div>
    </>
  );
}
