import React, { cache } from "react";
import { Header } from "@/components/Header";
import { Form } from "./components/form";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);

  const user = session?.user;

  if (user) {
    return (
      <>
        <Header />

        <Form user={user.id} />
      </>
    );
  } else {
    redirect("/login");
  }
};

export default Page;
