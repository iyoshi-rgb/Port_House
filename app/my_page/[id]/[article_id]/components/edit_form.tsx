"use client";
import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Article } from "../page";
import { IoMdSearch } from "react-icons/io";
import { FileInput } from "@/app/create/components/form/file_input";
import { TextInput } from "@/app/create/components/form/text_input";
import { TextAreaInput } from "@/app/create/components/form/textarea_input";
import { FaGithub, FaLink } from "react-icons/fa6";
import { SubmitButtons } from "@/app/create/components/form/submit_button";
import { FormData } from "@/types/formData";
import { TfiPencil } from "react-icons/tfi";
import { EditPreview } from "./edit_preview";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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

async function updateArticle(
  id: string,
  data: FormData,
  imagePath: string | null,
  videoPath: string | null
) {
  const { title, description, contents, gitUrl, appUrl, published } = data;
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article/`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
      description,
      contents,
      gitUrl,
      appUrl,
      published,
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

interface Props {
  article: Article;
}

const EditForm: React.FC<Props> = ({ article }) => {
  console.log(article);

  const [imageName, setImageName] = useState<string | null>(article.imagePath);
  const [videoName, setVideoName] = useState<string | null>(article.videoPath);
  const [imagePath, setImagePath] = useState<string | null>(article.imagePath);
  const [videoPath, setVideoPath] = useState<string | null>(article.videoPath);
  const [imageChande, setImageChange] = useState<boolean>(false);
  const [videoChande, setVideoChange] = useState<boolean>(false);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleSwitchMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const defaultValues: FormData = {
    image: null,
    video: null,
    title: article.title,
    description: article.description,
    contents: article.contents,
    gitUrl: article.gitUrl,
    appUrl: article.appUrl,
    published: article.public,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormData>({ defaultValues });
  const formData = watch();

  const update_Form = async (data: FormData) => {
    const res = await updateArticle(article.id, data, imagePath, videoPath);
    return res;
  };

  //写真保存
  const update_image = async (file: File, path: string) => {
    const res = await UploadFile(file, path);
    return res;
  };

  //動画保存
  const update_video = async (file: File, path: string) => {
    const res = await UploadFile(file, path);
    return res;
  };
  const onSubmit = async (data: FormData) => {
    console.log(data);

    if (
      data.image &&
      data.image[0] &&
      imagePath !== null &&
      imagePath !== article.imagePath
    ) {
      const file = data.image[0];
      const image_updatePromise = new Promise((resolve, reject) =>
        update_image(file, imagePath).then((res) => {
          if (res === true) {
            resolve("アップデート成功");
          } else {
            reject(new Error("アップデートできませんでした"));
          }
        })
      );
      toast.promise(image_updatePromise, {
        success: {
          title: "アップデート成功",
          description: "写真をアップデートしました",
          position: "top",
        },
        error: {
          title: "アップデート失敗",
          description: "再度やり直してください",
          position: "top",
        },
        loading: {
          title: "アップデート中",
          description: "写真をアップデートしています",
          position: "top",
        },
      });
    }
    if (
      data.video &&
      data.video[0] &&
      videoPath !== null &&
      videoPath !== article.videoPath
    ) {
      const file = data.video[0];
      const video_updatePromise = new Promise((resolve, reject) =>
        update_video(file, videoPath).then((res) => {
          if (res === true) {
            resolve("アップデート成功");
          } else {
            reject(new Error("アップデートできませんでした"));
          }
        })
      );
      toast.promise(video_updatePromise, {
        success: {
          title: "アップデート成功",
          description: "ビデオをアップデートしました",
          position: "top",
        },
        error: {
          title: "アップデート失敗",
          description: "再度やり直してください",
          position: "top",
        },
        loading: {
          title: "アップデート中",
          description: "ビデオをアップデートしています",
          position: "top",
        },
      });
    }

    const updatePromise = new Promise((resolve, reject) =>
      update_Form(data).then((res) => {
        if (res === true) {
          resolve("アップデート成功");
        } else {
          reject(new Error("アップデートできませんでした"));
        }
      })
    );
    toast.promise(updatePromise, {
      success: {
        title: "アップデート成功",
        description: "記事をアップデートしました",
        position: "top",
      },
      error: {
        title: "アップデート失敗",
        description: "再度やり直してください",
        position: "top",
      },
      loading: {
        title: "アップデート中",
        description: "投稿をアップデートしています",
        position: "top",
      },
    });

    updatePromise
      .then(() => {
        router.back();
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
        <EditPreview
          formData={formData}
          imagePath={imagePath}
          videoPath={videoPath}
          article_image={article.imagePath}
          article_video={article.videoPath}
        />
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
                setVideoName(e.target.files?.[0]?.name || "");
                setVideoPath(uuidv4());
                setVideoChange(true);
              }}
            />
            <FileInput
              label="Logo"
              id="image"
              accept="image/*"
              register={register}
              fileName={imageName}
              onFileChange={(e) => {
                setImageName(e.target.files?.[0]?.name || "");
                setImagePath(uuidv4());
                setImageChange(true);
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
          {(isDirty || imageChande || videoChande) && (
            <SubmitButtons register={register} isPublic={formData.published} />
          )}
        </form>
      )}
    </div>
  );
};

export default EditForm;
