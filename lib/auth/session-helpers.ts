import { auth } from "@/auth";
import { User } from "next-auth";

export async function getSessionUser(): Promise<User | null> {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = session.user;

  if (!user) {
    return null;
  }

  return user;
}

export async function getSessionRoles(): Promise<
  ("ADMIN" | "OWNER" | "VET")[] | null
> {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = session.user;

  if (!user) {
    return null;
  }

  const roles = user.roles.flatMap((role) => role.role);

  return roles;
}

export function checkRoles(
  rolesAllowed: string[],
  rolesToCheck: string[],
): boolean {
  return rolesToCheck.some((role) => rolesAllowed.includes(role));
}
