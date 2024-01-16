"use server";

import { LoginProps } from "@/lib/types";
import { loginSchema } from "@/lib/zod/zodSchemas";
import { getUserByEmail } from "@/lib/db/actions/user-actions";
import { generateVerificationToken } from "./token-actions";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signOut } from "next-auth/react";

export async function login(data: LoginProps) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Account does not exist" };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      user.password ? true : false,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}

export async function logout() {
  await signOut();
}
