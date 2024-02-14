"use client";

import React, { useState } from "react";
import ChangePasswordForm from "@/components/forms/auth/change-password/change-password-form";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { verifyUser } from "@/lib/db/actions/token-actions";
import { toast } from "sonner";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isPasswordSet = searchParams.get("is-password-set");

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const onSubmit = useCallback(async () => {
    if (!token) return;

    if (isPasswordSet === "1") {
      const { error, user } = await verifyUser(token);

      if (error) return;

      setIsEmailConfirmed(true);

      return;
    }

    // TODO:
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  // TODO: Modify this layout it's a bit too weird
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-cerulean-100 ">Confirm Email</h1>
      {isPasswordSet === "1" ? (
        <p className="text-sm text-cerulean-100">
          {isEmailConfirmed
            ? "Email confirmed, you may now login"
            : "Please wait a second whilst we confirm your email."}
        </p>
      ) : (
        <>
          <p className="text-sm text-cerulean-100">
            You must create a password to confirm your email
          </p>
          <div>
            <ChangePasswordForm isReset={false} token={token ? token : ""} />
          </div>
        </>
      )}
    </div>
  );
}
