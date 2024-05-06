import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { UserButton } from "./Header/user_button";
import SignOut, { SignIn } from "./session_button";
import { Button } from "@chakra-ui/react";

export const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <header className=" top-0 z-50 w-4/5 mx-auto bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="text-xl">
            <Button colorScheme="gray" variant="ghost" size={"lg"}>
              PortHouse
            </Button>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <UserButton id={user.id} />

            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
};
