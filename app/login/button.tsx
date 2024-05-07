"use client";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa6";

const LoginButton = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => signIn("github")}
    >
      <FaGithub className="mr-2 h-5 w-5" />
      Sign in with GitHub
    </Button>
  );
};

export default LoginButton;
