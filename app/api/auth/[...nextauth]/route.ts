import { nextAuthOptions } from "@/auth";
import NextAuth from "next-auth";
const handler = NextAuth(nextAuthOptions);

// https://next-auth.js.org/configuration/initialization#route-handlers-app
export { handler as GET, handler as POST };

