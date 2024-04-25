import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { UserButton } from "./Header/user_button";

export const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  console.log(user?.email);

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
          <>
            <Link href={"/api/auth/signin"}>
              <span className="transition-transform duration-300 group-hover:scale-110">
                ログイン
              </span>
            </Link>
          </>
        )}
        {user && (
          <Link href={"/api/auth/signout?callbackUrl=/"}>
            <span className="transition-transform duration-300 group-hover:scale-110">
              ログアウト
            </span>
          </Link>
        )}
        <div className="flex-none gap-2"></div>
      </div>
    </div>
  );
};
