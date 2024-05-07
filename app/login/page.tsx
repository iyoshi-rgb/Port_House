import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="mx-4 w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => signIn("github")}
        >
          <FaGithub className="mr-2 h-5 w-5" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Page;
