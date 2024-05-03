import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiGithubLogo } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { FormData } from "@/types/formData";

type Props = {
  formData: FormData;
};

export const Preview: React.FC<Props> = ({ formData }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [videoUrl, setVideoUrl] = useState<string | undefined>();

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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {imageUrl && <Avatar size="2xl" name="Logo" src={imageUrl} />}

              {formData.title ? (
                <h1 className="text-3xl font-bold">{formData.title}</h1>
              ) : (
                <h1 className="text-3xl font-bold text-gray-400">
                  Please Title
                </h1>
              )}
            </div>

            {formData.description ? (
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {formData.description}
              </p>
            ) : (
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Please Description
              </p>
            )}

            {formData.content ? (
              <p>{formData.content}</p>
            ) : (
              <p>Please write Content</p>
            )}

            <div className="flex items-center gap-4">
              {formData.gitUrl && (
                <Link
                  className="inline-flex items-center gap-2 text-gray-900 hover:underline dark:text-gray-50"
                  href={formData.gitUrl}
                >
                  <PiGithubLogo className="w-5 h-5" />
                  GitHub
                </Link>
              )}

              {formData.appUrl && (
                <Link
                  className="inline-flex items-center gap-2 text-gray-900 hover:underline dark:text-gray-50"
                  href={formData.appUrl}
                >
                  <TbWorld className="w-5 h-5" />
                  Launch App
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side  */}
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative w-full aspect-video">
            <span className="w-full h-full object-cover rounded-md bg-muted" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center">
              {videoUrl && <video controls src={videoUrl}></video>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
