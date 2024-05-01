"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignOut() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
}

export function SignIn() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <button onClick={() => signIn("github")}>GitHub</button>
      </>
    );
  }
}
