"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Preview } from "@/app/create/components/preview";
import { InputGroup, InputLeftAddon, Textarea, Input } from "@chakra-ui/react";
import { FaGithub, FaLink } from "react-icons/fa";

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

const ArticleForm = () => {
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
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-5">
      <button
        onClick={handleSwitchMode}
        className="btn btn-primary px-4 py-2 text-sm"
      >
        {isPreviewMode ? "編集" : "プレビュー"}
      </button>

      <div className="flex flex-col space-y-4 w-3/5 px-4 mt-4">
        {isPreviewMode ? (
          <Preview formData={formData} />
        ) : (
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold text-lg">Image</span>
                </div>
              </label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                id="image"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-auto max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt text-gray-500 font-bold">
                  *50MB以下である必要があります
                </span>
              </div>
              {imageName && (
                <span className="label-text-alt text-slate-600 font-bold">
                  {imageName}
                </span>
              )}
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold text-lg">PR VIDEO</span>
                </div>
              </label>
              <input
                type="file"
                {...register("video")}
                accept="video/*"
                id="video"
                onChange={handleVideoChange}
                className="file-input file-input-bordered w-auto max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt text-gray-500 font-bold">
                  *50MB以下である必要があります
                </span>
              </div>
              {videoName && (
                <span className="label-text-alt text-slate-600 font-bold">
                  {videoName}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("title", {
                  required: "アプリ名を入力してください",
                })}
                placeholder="アプリ名"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Textarea {...register("content")} placeholder="概要" />
            </div>
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
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ArticleForm;
