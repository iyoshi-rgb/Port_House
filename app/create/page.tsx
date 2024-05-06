import React from "react";
import { Header } from "@/components/Header";
import { Form } from "./components/form";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";

async function getUserId() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;
  return user?.id;
}

const Page = async () => {
  const user = await getUserId();

  if (user) {
    return (
      <>
        <Header />

        <Form user={user} />
      </>
    );
  } else {
    return <div>No page</div>;
  }
};

export default Page;
