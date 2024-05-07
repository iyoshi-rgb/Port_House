import React from "react";
import LoginButton from "./button";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;
  if (user) {
    redirect("/");
  } else {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="mx-4 w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">認証されていません</h1>
            <p className="text-gray-500 dark:text-gray-400">
              サインインしてください
            </p>
          </div>
          <LoginButton />
        </div>
      </div>
    );
  }
};

export default Page;
