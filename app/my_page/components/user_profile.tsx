import { Avatar, Button, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { TfiPencil } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";

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

const draftSample = [
  {
    title: "Blog Post 1",
    date: "Last updated 2 days ago",
  },
  {
    title: "Blog Post 2",
    date: "Last updated 2 days ago",
  },
];

const publishSample = [
  {
    title: "Blog Post 3",
    date: "Last updated 2 days ago",
  },
  {
    title: "Blog Post 4",
    date: "Last updated 2 days ago",
  },
];

export const UserProfile = async (id: { id: string }) => {
  const user: UserData = await fetchUserData(id.id);
  console.log(user);
  return (
    <div className="flex flex-1 justify-center flex-col items-center gap-6 py-8 px-4 sm:px-6 md:flex-row md:items-start md:gap-8 lg:px-8">
      <div className="flex flex-col items-center gap-4 md:items-start">
        {user.image && (
          <Avatar size="2xl" name="プロフィール画像" src={user.image} />
        )}
        <div className="grid gap-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#">
            <LuGithub className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
          </Link>
          <Link href="#">
            <FaXTwitter className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md space-y-6">
        <div>
          <h3 className="text-lg font-medium">Drafts</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-1">
                <p className="text-sm font-medium">Blog Post 1</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated 2 days ago
                </p>
              </div>
              <div className="flex gap-3">
                <Link href={"#"}>
                  <TfiPencil className="h-6 w-6 " />
                </Link>
                <Link href={"#"}>
                  <RiDeleteBin5Line className="h-6 w-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-50" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-1">
                <p className="text-sm font-medium">Blog Post 2</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated 5 days ago
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <DeleteIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Published</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-1">
                <p className="text-sm font-medium">Blog Post 3</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published 2 weeks ago
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <DeleteIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-1">
                <p className="text-sm font-medium">Blog Post 4</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published 1 month ago
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <DeleteIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DeleteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}
