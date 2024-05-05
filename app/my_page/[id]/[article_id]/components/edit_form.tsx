"use client";
import { Button, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import { LuUpload } from "react-icons/lu";
import { Article } from "../page";

interface Props {
  article: Article;
}

interface edit_Article {
  title: string | null;
  description: string | null;
  contents: string | null;
  videoPath: string | null;
  imagePath: string | null;
  gitUrl: string | null;
  appUrl: string | null;
}

const EditForm: React.FC<Props> = ({ article }) => {
  console.log(article);

  const defaultValues: edit_Article = {
    imagePath: article.imagePath,
    videoPath: article.videoPath,
    title: article.title,
    description: article.description,
    contents: article.contents,
    gitUrl: article.gitUrl,
    appUrl: article.appUrl,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<edit_Article>({ defaultValues });
  const formData = watch();

  const submitHandler = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-md mx-auto my-12 space-y-6">
      <form onSubmit={handleSubmit(() => submitHandler)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="avatar"
          >
            Logo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <LuUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  htmlFor="avatar"
                >
                  <span>Upload a file</span>
                  <input
                    className="sr-only"
                    id="avatar"
                    name="avatar"
                    type="file"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="avatar"
          >
            Video
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <LuUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  htmlFor="avatar"
                >
                  <span>Upload a file</span>
                  <input
                    className="sr-only"
                    id="avatar"
                    name="avatar"
                    type="file"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="title">Title:</label>
          <Input id="title" placeholder="Enter title" {...register("title")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Description:</label>
          <Textarea
            id="description"
            placeholder="Enter description"
            {...register("description")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content">Content:</label>
          <Textarea
            id="content"
            placeholder="Enter content"
            {...register("contents")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gitUrl">GitHub URL:</label>
          <Input
            id="gitUrl"
            placeholder="Enter GitHub URL"
            {...register("gitUrl")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="appUrl">App URL:</label>
          <Input
            id="appUrl"
            placeholder="Enter App URL"
            {...register("appUrl")}
          />
        </div>
        <Button colorScheme="blue" className="w-full" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
