"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Preview } from "@/app/create/components/preview";
import { Button } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { TfiPencil } from "react-icons/tfi";
import { FileInput } from "./form/file_input";
import { TextInput } from "./form/text_input";
import { TextAreaInput } from "./form/textarea_input";
import { SubmitButtons } from "./form/submit_button";
import { FaGithub, FaLink } from "react-icons/fa6";
import { FormData } from "@/types/formData";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loadng";

const defaultValues: FormData = {
  image: null,
  video: null,
  title: null,
  description: null,
  content: null,
  gitUrl: null,
  appUrl: null,
  public: false,
};

export const Form = () => {
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");
  const [videoName, setVideoName] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const formData = watch();

  const handleSwitchMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const formReset = () => {
    setIsLoading(true);

    setTimeout(() => {
      reset();
      setImageName("");
      setVideoName("");
      setIsLoading(false);
    }, 10000);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto  px-4 py-8 sm:px-6 lg:px-8">
      {isloading && <Loading />}
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
              onFileChange={(e) =>
                setVideoName(e.target.files?.[0]?.name || "")
              }
            />
            <FileInput
              label="Logo"
              id="image"
              accept="image/*"
              register={register}
              fileName={imageName}
              onFileChange={(e) =>
                setImageName(e.target.files?.[0]?.name || "")
              }
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
              name="content"
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
