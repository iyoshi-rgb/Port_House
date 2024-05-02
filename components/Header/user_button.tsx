import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { SlNote } from "react-icons/sl";

async function fetchUserData(id: any) {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/my_page/${id}`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.user;
}

export const UserButton = async ({ id }: any) => {
  const user = await fetchUserData(id);

  if (user) {
    return (
      <Menu>
        <MenuButton>
          <WrapItem>
            {user.image ? (
              <Avatar size="md" name="userプロフィール画像" src={user.image} />
            ) : (
              <Avatar
                size="md"
                name="userプロフィールデフォルト画像"
                src="https://bit.ly/broken-lin"
              />
            )}
          </WrapItem>
        </MenuButton>
        <MenuList>
          <Link href={`/my_page/${id}`}>
            <MenuItem icon={<GoPerson />}>My page</MenuItem>
          </Link>
          <Link href={"/create"}>
            <MenuItem icon={<SlNote />}>投稿作成</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <Avatar
        size="md"
        name="userプロフィールデフォルト画像"
        src="https://bit.ly/broken-lin"
      />
    );
  }
};
