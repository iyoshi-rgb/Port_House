"use client";
import { Button } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

export default function SignOut() {
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

export function SignIn() {
  return (
    <>
      <Button
        colorScheme={"blackAlpha"}
        leftIcon={<FaGithub />}
        onClick={() => signIn("github")}
      >
        LogIn
      </Button>
    </>
  );
}
