"use client";
import { IconButton, useToast } from "@chakra-ui/react";
import React from "react";
import { TbWorld, TbWorldOff } from "react-icons/tb";

const published_article = async (id: string, published: boolean) => {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({ published }),
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

const PublishButton: React.FC<Props> = ({ id }) => {
  const toast = useToast();

  const handlePublish = async (id: string) => {
    console.log(id);
    const res = await published_article(id, true);
    return res;
  };

  function onClick() {
    const deletePromise = new Promise((resolve, reject) =>
      handlePublish(id).then((res) => {
        if (res === true) {
          resolve("公開成功");
        } else {
          reject(new Error("公開できませんでした"));
        }
      })
    );
    toast.promise(deletePromise, {
      success: {
        title: "公開成功",
        description: "投稿を公開しました",
        position: "top",
      },
      error: {
        title: "公開失敗",
        description: "再度やり直してください",
        position: "top",
      },
      loading: {
        title: "公開中",
        description: "投稿を公開しています",
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
      icon={<TbWorld />}
      variant={"ghost"}
      aria-label="Delete"
      fontSize={"25px"}
      colorScheme="blue"
      onClick={onClick}
    />
  );
};

export default PublishButton;

export const DraftButton: React.FC<Props> = ({ id }) => {
  const toast = useToast();

  const handleDraft = async (id: string) => {
    console.log(id);
    const res = await published_article(id, false);
    return res;
  };

  function onClick() {
    const deletePromise = new Promise((resolve, reject) =>
      handleDraft(id).then((res) => {
        if (res === true) {
          resolve("変更成功");
        } else {
          reject(new Error("変更できませんでした"));
        }
      })
    );
    toast.promise(deletePromise, {
      success: {
        title: "変更成功",
        description: "投稿を下書きに変更しました",
        position: "top",
      },
      error: {
        title: "変更失敗",
        description: "再度やり直してください",
        position: "top",
      },
      loading: {
        title: "変更中",
        description: "投稿を下書きに変更しています",
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
      icon={<TbWorldOff />}
      variant={"ghost"}
      aria-label="Delete"
      fontSize={"25px"}
      colorScheme="blue"
      onClick={onClick}
    />
  );
};
