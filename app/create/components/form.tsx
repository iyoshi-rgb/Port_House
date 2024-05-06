"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Button, useToast } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { TfiPencil } from "react-icons/tfi";
import { FileInput } from "./form/file_input";
import { TextInput } from "./form/text_input";
import { TextAreaInput } from "./form/textarea_input";
import { SubmitButtons } from "./form/submit_button";
import { FaGithub, FaLink } from "react-icons/fa6";
import { FormData } from "@/types/formData";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Preview } from "./preview";

async function UploadFile(file: File, filepath: string) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("porthouse")
    .upload(filepath, file);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}

async function postArticle(
  data: FormData,
  user: string,
  imagePath: string | null,
  videoPath: string | null
) {
  const { title, description, contents, gitUrl, appUrl, published } = data;
  console.log(
    title,
    description,
    contents,
    gitUrl,
    appUrl,
    published,
    user,
    imagePath,
    videoPath
  );
  {
    const Url = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${Url}/api/article/`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        contents,
        gitUrl,
        appUrl,
        published,
        user,
        imagePath,
        videoPath,
      }),
      headers: {
        "Contnt-type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  }
}

interface Props {
  user: string;
}

export const Form: React.FC<Props> = ({ user }) => {
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [videoPath, setVideoPath] = useState<string | null>(null);

  const toast = useToast();
  const router = useRouter();

  const defaultValues: FormData = {
    image: null,
    video: null,
    title: null,
    description: null,
    contents: null,
    gitUrl: null,
    appUrl: null,
    published: false,
  };

  const {
    register,
    watch,

    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const formData = watch();

  const handleSwitchMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };
  //投稿
  const post_Form = async (data: FormData) => {
    const res = await postArticle(data, user, imagePath, videoPath);
    return res;
  };

  //写真保存
  const post_image = async (file: File, path: string) => {
    const res = await UploadFile(file, path);
    return res;
  };

  //動画保存
  const post_video = async (file: File, path: string) => {
    const res = await UploadFile(file, path);
    return res;
  };

  const onSubmit = async (data: FormData) => {
    if (data.image && data.image[0] && imagePath !== null) {
      const file = data.image[0];
      const image_postPromise = new Promise((resolve, reject) =>
        post_image(file, imagePath).then((res) => {
          if (res === true) {
            resolve("アップロード成功");
          } else {
            reject(new Error("アップロードできませんでした"));
          }
        })
      );
      toast.promise(image_postPromise, {
        success: {
          title: "アップロード成功",
          description: "写真をアップロードしました",
          position: "top",
        },
        error: {
          title: "アップロード失敗",
          description: "再度やり直してください",
          position: "top",
        },
        loading: {
          title: "アップロード中",
          description: "写真をアップロードしています",
          position: "top",
        },
      });
    }
    if (data.video && data.video[0] && videoPath !== null) {
      const file = data.video[0];
      const video_postPromise = new Promise((resolve, reject) =>
        post_video(file, videoPath).then((res) => {
          if (res === true) {
            resolve("アップロード成功");
          } else {
            reject(new Error("アップロードできませんでした"));
          }
        })
      );
      toast.promise(video_postPromise, {
        success: {
          title: "アップロード成功",
          description: "ビデオをアップロードしました",
          position: "top",
        },
        error: {
          title: "アップロード失敗",
          description: "再度やり直してください",
          position: "top",
        },
        loading: {
          title: "アップロード中",
          description: "ビデオをアップロードしています",
          position: "top",
        },
      });
    }

    const postPromise = new Promise((resolve, reject) =>
      post_Form(data).then((res) => {
        if (res === true) {
          resolve("作成成功");
        } else {
          reject(new Error("作成できませんでした"));
        }
      })
    );
    toast.promise(postPromise, {
      success: {
        title: "作成成功",
        description: "記事を作成しました",
        position: "top",
      },
      error: {
        title: "作成失敗",
        description: "再度やり直してください",
        position: "top",
      },
      loading: {
        title: "作成中",
        description: "投稿を作成しています",
        position: "top",
      },
    });

    postPromise
      .then(() => {
        router.replace(`/my_page/${user}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto  px-4 py-8 sm:px-6 lg:px-8">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <div className="flex justify-between items-center pb-5">
          <h1 className="text-3xl font-bold">Create New Content</h1>
          {isPreviewMode ? (
            <Button
              leftIcon={<TfiPencil />}
              colorScheme="blue"
              variant="ghost"
              onClick={handleSwitchMode}
            >
              編集
            </Button>
          ) : (
            <Button
              leftIcon={<IoMdSearch />}
              colorScheme="blue"
              variant="ghost"
              onClick={handleSwitchMode}
            >
              プレビュー
            </Button>
          )}
        </div>
      </div>
      {isPreviewMode ? (
        <Preview formData={formData} />
      ) : (
        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1 space-y-3">
            <FileInput
              label="PR VIDEO"
              id="video"
              accept="video/*"
              register={register}
              fileName={videoName}
              onFileChange={(e) => {
                setVideoName(e.target.files?.[0]?.name || null);
                setVideoPath(uuidv4());
              }}
            />
            <FileInput
              label="Logo"
              id="image"
              accept="image/*"
              register={register}
              fileName={imageName}
              onFileChange={(e) => {
                setImageName(e.target.files?.[0]?.name || null);
                setImagePath(uuidv4());
              }}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-5 pt-4">
            <div>
              <TextInput
                name="title"
                label="Title"
                placeholder="Title"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <TextAreaInput
                name="description"
                placeholder="Description"
                rows={5}
                register={register}
                errors={errors}
              />
            </div>
            <div className="space-y-4 py-5">
              <TextInput
                name="gitUrl"
                label="GitHub URL"
                placeholder="GitHub URL"
                register={register}
                errors={errors}
                icon={<FaGithub />}
              />
              <TextInput
                name="appUrl"
                label="App URL"
                placeholder="アプリ Link"
                register={register}
                errors={errors}
                icon={<FaLink />}
              />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-2">
            <TextAreaInput
              name="contents"
              placeholder="main content"
              rows={8}
              register={register}
              errors={errors}
            />
          </div>
          <SubmitButtons register={register} />
        </form>
      )}
    </div>
  );
};
