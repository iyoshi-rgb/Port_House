import React from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { SlNote } from "react-icons/sl";
import { getUser } from "@/server_actions/get_user";

interface User {
  id: string;
  image: string | null;
}

export const UserButton = async ({ id }: any) => {
  const user: User | null = await getUser(id);

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
