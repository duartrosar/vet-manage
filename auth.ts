import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db/prisma";
import { getUserById } from "@/lib/db/actions/user-actions";
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
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  events: {
    async createUser({ user }) {
      const name = user.name?.split(" ");

      await db.owner.create({
        data: {
          firstName: name && name[0] ? name[0] : "",
          lastName: name && name[1] ? name[1] : "",
          email: user.email ? user.email : "",
          userId: user.id,
          imageUrl: user.image ? user.image : "",
        },
      });
    },
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          roles: { create: { role: "OWNER" } },
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session, user }) {
      // console.log({ sessionToken: token, session });
      // console.log({ sessionToken: token, session });
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
