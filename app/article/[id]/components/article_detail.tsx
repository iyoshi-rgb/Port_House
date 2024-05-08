import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { PiGithubLogo } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  id: string;
}

interface Article {
  id: string;
  userId: string;
  title: string;
  description: string;
  contents: string;
  videoPath: string | null;
  imagePath: string | null;
  public: true;
  gitUrl: string;
  appUrl: string;
  createdat: Date;
}

async function fetchArticle(id: any) {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article/${id}`, {
    cache: "force-cache", //SSG
  });

  const data = await res.json();

  return data.article;
}

function getUrl(path: string | null) {
  if (!path) {
    return null;
  } else {
    const supabase = createClient();
    const { data } = supabase.storage.from("porthouse").getPublicUrl(`${path}`);
    const url = data.publicUrl;
    return url;
  }
}

const ArticleDetail: React.FC<Props> = async ({ id }) => {
  const article: Article = await fetchArticle(id);
  const videoUrl = getUrl(article.videoPath);
  const imageUrl = getUrl(article.imagePath);

  console.log(article);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:flex-row lg:gap-12 lg:py-24">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          {imageUrl && <Avatar size="2xl" src={imageUrl} />}
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            {article.description && (
              <p
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: article.description.replace(/\n/g, "<br>"),
                }}
              ></p>
            )}
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {article.gitUrl && (
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href={article.gitUrl}
              >
                <PiGithubLogo className="h-5 w-5" />
                GitHub
              </Link>
            )}
            {article.appUrl && (
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-gray-200  bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href={article.appUrl}
              >
                <TbWorld className="h-5 w-5" />
                Visit App
              </Link>
            )}
          </div>
        </div>
        <div className="w-full max-w-2xl aspect-video overflow-hidden rounded-lg">
          <span className="w-full rounded-md bg-muted" />
          {videoUrl && <video controls src={videoUrl} />}
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">詳細</h3>
              {article.contents && (
                <p
                  className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: article.contents.replace(/\n/g, "<br>"),
                  }}
                ></p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetail;
