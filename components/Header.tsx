import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { UserButton } from "./Header/user_button";
import SignOut, { SignIn } from "./session_button";

export const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <div className="w-4/5 mx-auto">
      <div className="navbar rounded-box border bg-white">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            PortHouse
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-5">
            <UserButton id={user.id} />

            <SignOut />
          </div>
        ) : (
          <>
            <SignIn />
          </>
        )}
        <div className="flex-none gap-2"></div>
      </div>
    </div>
  );
};
