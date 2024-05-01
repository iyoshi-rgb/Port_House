import { Avatar } from "@chakra-ui/react";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

async function fetchUserData(id: string) {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/my_page/${id}`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.user;
}

export const UserProfile = async (id: { id: string }) => {
  const user = await fetchUserData(id.id);
  console.log("my_page", user);
  return (
    <div className="flex justify-center py-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar size="2xl" name="プロフィール画像" src={user.image} />
        <span className="text-gray-400 text-3xl">{user.name}</span>
        <div className="flex items-center gap-5 text-4xl pt-3">
          <FaGithub />
          <BsTwitterX />
        </div>
      </div>
    </div>
  );
};
