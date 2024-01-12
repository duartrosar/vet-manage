// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

// import { UserRole } from "@prisma/client";
// import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT, DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       roles: UserRole[];
//     } & DefaultSession;
//   }

//   interface User extends DefaultUser {
//     id: string;
//     roles: UserRole[];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id: string;
//     roles: UserRole[];
//   }
// }
