import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiGithubLogo } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { FormData } from "@/types/formData";
import { IoMdImages } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import { createClient } from "@/utils/supabase/client";

function getUrl(path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from("porthouse").getPublicUrl(`${path}`);
  const url = data.publicUrl;
  return url;
}

type Props = {
  formData: FormData;
  imagePath: string | null;
  videoPath: string | null;
  article_image: string | null;
  article_video: string | null;
};

export const EditPreview: React.FC<Props> = ({
  formData,
  imagePath,
  videoPath,
  article_image,
  article_video,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [videoUrl, setVideoUrl] = useState<string | undefined>();

  useEffect(() => {
    if (imagePath !== null && imagePath === article_image) {
      setImageUrl(getUrl(imagePath));
    }
    if (videoPath !== null && videoPath === article_video) {
      setVideoUrl(getUrl(videoPath));
    }
  }, []);

  useEffect(() => {
    if (formData.image && formData.image.length > 0) {
      const file = formData.image[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [formData.image]);

  useEffect(() => {
    if (formData.video && formData.video.length > 0) {
      const file = formData.video[0];
      const url = URL.createObjectURL(file);
      setVideoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [formData.video]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:flex-row lg:gap-12 lg:py-24">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          {imageUrl ? (
            <Avatar size="2xl" src={imageUrl} />
          ) : (
            <div className="flex flex-row items-center space-x-1">
              <IoMdImages className="h-16 w-16" />
              <span className="md:text-xl dark:text-gray-400 text-gray-500 ">
                No Video
              </span>
            </div>
          )}
          <div className="space-y-2 text-center lg:text-left">
            {formData.title ? (
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {formData.title}
              </h1>
            ) : (
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Please Title
              </h1>
            )}
            {formData.description ? (
              <p
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: formData.description.replace(/\n/g, "<br>"),
                }}
              ></p>
            ) : (
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Please Description
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {formData.gitUrl && (
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href={formData.gitUrl}
              >
                <PiGithubLogo className="h-5 w-5" />
                GitHub
              </Link>
            )}
            {formData.appUrl && (
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-gray-200  bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href={formData.appUrl}
              >
                <TbWorld className="h-5 w-5" />
                Go App
              </Link>
            )}
          </div>
        </div>
        <div className="w-full max-w-2xl aspect-video overflow-hidden rounded-lg px-3 flex items-center justify-center border">
          {videoUrl ? (
            <video controls src={videoUrl} />
          ) : (
            <div className="flex flex-col justify-center">
              <BsCameraVideo className="h-20 w-20" />
              <span className="md:text-xl dark:text-gray-400 text-gray-500 ">
                No Video
              </span>
            </div>
          )}
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">詳細</h3>
              {formData.contents ? (
                <p
                  className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: formData.contents.replace(/\n/g, "<br>"),
                  }}
                ></p>
              ) : (
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Please Content
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
