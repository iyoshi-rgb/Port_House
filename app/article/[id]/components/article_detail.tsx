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
    cache: "no-store", //SSR
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
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              {article.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href={article.gitUrl}
            >
              GitHub
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href={article.appUrl}
            >
              Visit App
            </Link>
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
            {/*<div className="space-y-4">
              <h3 className="text-2xl font-bold">Key Features</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <IoMdCheckmark className="mt-1 h-5 w-5 flex-shrink-0 text-gray-900 dark:text-gray-50" />
                  <div>
                    <h4 className="text-lg font-medium">Responsive Design</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Acme Web App is designed to work seamlessly on any device,
                      from desktop to mobile.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <IoMdCheckmark className="mt-1 h-5 w-5 flex-shrink-0 text-gray-900 dark:text-gray-50" />
                  <div>
                    <h4 className="text-lg font-medium">Advanced Analytics</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Get detailed insights into your data with our powerful
                      analytics tools.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <IoMdCheckmark className="mt-1 h-5 w-5 flex-shrink-0 text-gray-900 dark:text-gray-50" />
                  <div>
                    <h4 className="text-lg font-medium">
                      Secure Authentication
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Protect your data with our robust authentication system.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <IoMdCheckmark className="mt-1 h-5 w-5 flex-shrink-0 text-gray-900 dark:text-gray-50" />
                  <div>
                    <h4 className="text-lg font-medium">
                      Scalable Infrastructure
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Acme Web App is built to scale with your growing needs.
                    </p>
                  </div>
                </li>
              </ul>
  </div>*/}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">詳細</h3>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {article.contents}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetail;
