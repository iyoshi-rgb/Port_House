import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { UserButton } from "./Header/user_button";
import Component, { SignIn } from "./session_button";

export const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <div className="w-4/5 mx-auto ">
      <div className="navbar rounded-box border">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            PortHouse
          </Link>
        </div>
        {user ? (
          <>
            <UserButton />
          </>
        ) : (
          <></>
        )}
        <SignIn />
        <div className="flex-none gap-2"></div>
      </div>
    </div>
  );
};
