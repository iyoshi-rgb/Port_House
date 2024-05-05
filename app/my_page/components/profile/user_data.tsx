import { Avatar, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { TfiPencil } from "react-icons/tfi";

type Props = {
  id: string;
};

async function fetchUserData(id: string) {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/my_page/${id}`, {
    cache: "no-store", //SSR
  });
  const data = await res.json();
  return data.user;
}

type UserData = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  gitAccount: string | null;
  xAccount: string | null;
};

export const UserData: React.FC<Props> = async ({ id }) => {
  const user: UserData = await fetchUserData(id);
  console.log(user);

  return (
    <div className="flex flex-col items-center gap-4 md:items-start">
      {user.image && (
        <Avatar size="2xl" name="プロフィール画像" src={user.image} />
      )}
      <div className="grid gap-1 text-center md:text-left">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
      <div className="flex gap-4 ">
        <Link href="#">
          <LuGithub className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
        </Link>
        <Link href="#">
          <FaXTwitter className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
        </Link>
      </div>
      <div>
        <Button rightIcon={<TfiPencil />} colorScheme="teal" variant="ghost">
          編集
        </Button>
      </div>
    </div>
  );
};
