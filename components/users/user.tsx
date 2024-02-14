"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return <div className="text-white">{JSON.stringify(session)}</div>;
};
