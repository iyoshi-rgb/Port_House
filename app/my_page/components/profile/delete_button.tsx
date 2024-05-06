"use client";
import { IconButton, useToast } from "@chakra-ui/react";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const delete_article = async (id: string) => {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article/${id}`, {
    method: "DELETE",
    headers: {
      "Contnt-type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

interface Props {
  id: string;
}

const DeleteButton: React.FC<Props> = ({ id }) => {
  const toast = useToast();

  const handleDelete = async (id: string) => {
    console.log(id);
    const res = await delete_article(id);
    return res;
  };

  function onClick() {
    const deletePromise = new Promise((resolve, reject) =>
      handleDelete(id).then((res) => {
        if (res === true) {
          resolve("削除成功");
        } else {
          reject(new Error("削除できませんでした"));
        }
      })
    );
    toast.promise(deletePromise, {
      success: {
        title: "削除成功",
        description: "投稿を削除しました",
        position: "top",
      },
      error: {
        title: "削除失敗",
        description: "もう一度やり直してください",
        position: "top",
      },
      loading: {
        title: "削除中",
        description: "投稿を削除しています",
        position: "top",
      },
    });

    deletePromise
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IconButton
      icon={<RiDeleteBin5Line />}
      variant={"ghost"}
      aria-label="Delete"
      fontSize={"25px"}
      colorScheme="red"
      onClick={onClick}
    />
  );
};

export default DeleteButton;
