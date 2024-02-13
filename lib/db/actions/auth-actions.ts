"use server";

import { LoginProps } from "@/lib/types";
import { loginSchema } from "@/lib/zod/zodSchemas";
import { getUserByEmail } from "@/lib/db/actions/user-actions";
import { generateVerificationToken } from "./token-actions";
import { sendResetPassword, sendVerificationEmail } from "@/lib/mail";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signOut } from "next-auth/react";
import { compare } from "bcryptjs";
import { db } from "../prisma";

export async function login(data: LoginProps, callbackUrl?: string | null) {
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
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

export async function resetPassword(
  email: string,
): Promise<{ message: string; success: boolean }> {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.email || !user.password) {
      return { success: false, message: "Account does not exist" };
    }

    if (!user.emailVerified) {
      return {
        success: false,
        message: "Your account has not been confirmed.",
      };
    }

    const verificationToken = await generateVerificationToken(user.email);

    await sendResetPassword(verificationToken.email, verificationToken.token);

    return { success: true, message: "Password reset email sent successfully" };
  } catch (error) {
    return {
      success: false,
      message: "There was an error sending your confirmation email.",
    };
  }
}

export async function validatePassword(
  currentPasswordHash: string,
  currentPassword: string,
): Promise<boolean> {
  try {
    const isMatch = await compare(currentPassword, currentPasswordHash);
    return isMatch;
  } catch (error) {
    console.error("Error validating password:", error);
    return false;
  }
}
