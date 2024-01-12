import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db/prisma";
import { getUserById } from "@/lib/db/utils";
import { UserRole } from "@prisma/client";
// import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "@auth/core/types" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface Session {
    user: {
      roles: UserRole[];
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    roles: UserRole[];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          roles: { create: { role: "CUSTOMER" } },
        },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.isActive) {
    //     return false;
    //   }

    //   return true;
    // },
    async session({ token, session, user }) {
      // console.log({ sessionToken: token, session });
      console.log({ sessionToken: token, session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.roles && session.user) {
        session.user.roles = token.roles;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.roles = existingUser.roles;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
