import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function fetchAllArticles() {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.articles;
}

export const Card = async () => {
  const articles = await fetchAllArticles();

  const supabase = createClient();

  const { data } = supabase.storage
    .from("porthouse")
    .getPublicUrl("image/IMG_4242.png");
  const url = data.publicUrl;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-12">
      <div className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-900">
        <Image
          src={url}
          alt="Article Thumbnail"
          width={600}
          height={400}
          className="w-full h-48"
        />

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold">Mastering React Hooks</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Dive deep into the power of React Hooks and learn how to build
            complex, dynamic applications with ease.
          </p>
          <Link
            className="inline-flex items-center font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            href="#"
          >
            Read More
            <FaArrowRightLong className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
