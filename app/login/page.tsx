import { SignIn } from "@/components/session_button";
import React from "react";

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
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
