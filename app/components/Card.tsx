import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { IoMdImages } from "react-icons/io";

interface Articles {
  title: string | null;
  description: string | null;
  imagePath: string | null;
  createdat: Date;
  id: string;
}

async function fetchAllArticles() {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article`, {
    cache: "no-store", //SSR
  });
  const data = await res.json();
  return data.articles;
}

function getImageUrl(path: string | null) {
  if (!path) {
    return null;
  } else {
    const supabase = createClient();
    const { data } = supabase.storage.from("porthouse").getPublicUrl(`${path}`);
    const url = data.publicUrl;
    return url;
  }
}

export const Card = async () => {
  const articles: Articles[] | null = await fetchAllArticles();

  if (articles) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-12 md:py-16 lg:py-20">
        {articles.map((article) => {
          const url = getImageUrl(article.imagePath);
          return (
            <div
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 "
              key={article.id}
            >
              <Link
                className="absolute inset-0 z-10"
                href={`/article/${article.id}`}
              >
                <span className="sr-only">View Artwork</span>
              </Link>
              {url ? (
                <Image
                  alt="Artwork 1"
                  className="object-cover h-60"
                  height={400}
                  src={url}
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width={600}
                />
              ) : (
                <div className="w-full h-60 flex flex-col justify-center items-center">
                  <IoMdImages className="text-8xl" />
                  <span className="text-lg pt-2  text-gray-500">No Image</span>
                </div>
              )}
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">{article.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By Jane Doe
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {article.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    );
  } else {
  }
};
