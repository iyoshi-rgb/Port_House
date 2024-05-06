"use client";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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

interface Props {
  article: Article;
}

const EditForm: React.FC<Props> = ({ article }) => {
  console.log(article);

  const [imageName, setImageName] = useState<string | null>(article.imagePath);
  const [videoName, setVideoName] = useState<string | null>(article.videoPath);
  const [imagePath, setImagePath] = useState<string | null>(article.imagePath);
  const [videoPath, setVideoPath] = useState<string | null>(article.videoPath);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [formChanged, setFormChanged] = useState(false);

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

  const onSubmit = (data: FormData) => {
    console.log(data);
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
          {!isDirty && <SubmitButtons register={register} />}
        </form>
      )}
    </div>
  );
};

export default EditForm;
