import React from "react";
import { UserProfile } from "../components/user_profile";
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const id: string = params.id;
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  if (user) {
    return (
      <div>
        <Header />
        <UserProfile id={id} />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default Page;
