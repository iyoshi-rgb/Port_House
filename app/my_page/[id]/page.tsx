import React from "react";
import { UserProfile } from "../components/user_profile";
import { Header } from "@/components/Header";

const Page = async ({ params }: { params: { id: string } }) => {
  const id: string = params.id;

  return (
    <div>
      <Header />
      <UserProfile id={id} />
    </div>
  );
};

export default Page;
