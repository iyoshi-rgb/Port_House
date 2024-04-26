import React from "react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";

async function fetchUserData(id: any) {
  const res = await fetch(`http://localhost:3000/api/my_page/${id}`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.user;
}

export const UserButton = async ({ id }: any) => {
  const user = await fetchUserData(id);

  console.log(user);

  return (
    <div>
      <Link href={`/my_page/${id}`}>
        <Wrap>
          <WrapItem>
            <Avatar size="md" name="Segun Adebayo" src={user.image} />
          </WrapItem>
        </Wrap>
      </Link>
    </div>
  );
};
