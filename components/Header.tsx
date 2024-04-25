import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-4/5 mx-auto ">
      <div className="navbar rounded-box border">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            PortHouse
          </Link>
        </div>
        <div className="flex-none gap-2"></div>
      </div>
    </div>
  );
};
