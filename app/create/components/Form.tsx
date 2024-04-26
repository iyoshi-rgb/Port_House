"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import { Preview } from "@/app/create/components/preview";
import Link from "next/link";
import { InputGroup, InputLeftAddon, Textarea } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FaGithub, FaLink } from "react-icons/fa";

export type FormData = {
  video: FileList | null;
  title: string;
  content: string;
  gitUrl: string;
  appUrl: string | null;
};

const defaultValues: FormData = {
  video: null,
  title: "",
  content: "",
  gitUrl: "",
  appUrl: "",
};

const ArticleForm = () => {
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({ defaultValues });

  const formData = watch();

  const handleSwitchMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > 52428800) {
      // 50MB file size limit check
      setFileError("ファイルサイズは50MB以下にしてください。");
      event.target.value = ""; // Reset the value of the input
    } else {
      setFileError(null);
      clearErrors("video");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-5">
      <div className="w-3/5 sticky top-0 z-10">
        <div className="flex justify-between items-center pb-5">
          <div className="flex justify-start items-center space-x-4">
            <Link href={"/"}>
              <IoArrowBackOutline />
            </Link>

            <button
              onClick={handleSwitchMode}
              className="btn btn-primary px-4 py-2 text-sm"
            >
              {isPreviewMode ? "編集" : "プレビュー"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-3/5 px-4 mt-4">
        {isPreviewMode ? (
          <Preview formData={formData} />
        ) : (
          <form className="flex flex-col space-y-4">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold text-lg">PR VIDEO</span>
                </div>
              </label>
              <input
                type="file"
                {...register("video", { required: false })}
                accept="video/*"
                id="video"
                className="file-input file-input-bordered w-auto max-w-xs"
                onChange={handleFileChange}
              />
              <div className="label">
                <span className="label-text-alt text-gray-500 font-bold">
                  *50MB以下である必要があります
                </span>
              </div>
              {fileError && <p className="text-red-500">{fileError}</p>}
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
              <Textarea
                {...register("content", { required: "概要を入力してください" })}
                placeholder="概要"
              />

              {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>

            <InputGroup size="sm">
              <InputLeftAddon>
                <FaGithub />
              </InputLeftAddon>
              <Input
                {...register("gitUrl", {
                  required: "gitUrlを入力してください",
                })}
                placeholder="GitHub url"
                variant={"outline"}
              />
            </InputGroup>

            <InputGroup size="sm">
              <InputLeftAddon>
                <FaLink />
              </InputLeftAddon>
              <Input
                {...register("appUrl", {
                  required: false,
                })}
                placeholder="アプリ Link"
                variant={"outline"}
              />
            </InputGroup>
          </form>
        )}
      </div>
    </div>
  );
};

export default ArticleForm;
