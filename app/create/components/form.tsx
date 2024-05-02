"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Preview } from "@/app/create/components/preview";
import {
  InputGroup,
  InputLeftAddon,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaGithub, FaLink, FaRegSave } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TfiPencil } from "react-icons/tfi";
import { FaArrowRight } from "react-icons/fa6";

export type FormData = {
  image: FileList | null;
  video: FileList | null;
  title: string;
  content: string;
  gitUrl: string;
  appUrl: string | null;
};

const defaultValues: FormData = {
  image: null,
  video: null,
  title: "",
  content: "",
  gitUrl: "",
  appUrl: "",
};

export default function Form() {
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const [imageName, setImageName] = useState<string>("");
  const [videoName, setVideoName] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const formData = watch();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageName(file.name); // Accessing the 'name' property of the File object
      console.log("File Name:", file.name); // Output the file name to console
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setVideoName(file.name); // Accessing the 'name' property of the File object
      console.log("File Name:", file.name); // Output the file name to console
    }
  };

  const handleSwitchMode = () => {
    setIsPreviewMode(!isPreviewMode);
    console.log(isPreviewMode);
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold">PR VIDEO</span>
              </div>
              <input
                type="file"
                {...register("video")}
                accept="video/*"
                id="video"
                onChange={handleVideoChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
            {videoName && (
              <span className="label-text-alt text-slate-600 font-bold">
                {videoName}
              </span>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold">Logo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
            {imageName && (
              <span className="label-text-alt text-slate-600 font-bold">
                {imageName}
              </span>
            )}
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-4 ">
            <div>
              <Input
                {...register("title", {
                  required: "Titleを入力してください",
                })}
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Input id="description" placeholder="Description" type="text" />
            </div>
            <div className="space-y-4">
              <InputGroup size="sm">
                <InputLeftAddon>
                  <FaGithub />
                </InputLeftAddon>
                <Input
                  {...register("gitUrl")}
                  placeholder="GitHub URL"
                  variant={"outline"}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon>
                  <FaLink />
                </InputLeftAddon>
                <Input
                  {...register("appUrl")}
                  placeholder="アプリ Link"
                  variant={"outline"}
                />
              </InputGroup>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <div>
              <Textarea id="content" placeholder="main content" rows={8} />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 ">
            <Button
              type="submit"
              leftIcon={<FaRegSave />}
              colorScheme="teal"
              variant="solid"
            >
              下書き保存
            </Button>
            <Button
              type="submit"
              rightIcon={<FaArrowRight />}
              colorScheme="teal"
              variant="outline"
            >
              公開する
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
