"use client";
import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export default function SignOut() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
        <Button
          colorScheme="blue"
          leftIcon={<IoLogOutOutline />}
          onClick={() => signOut()}
        >
          LogOut
        </Button>
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
