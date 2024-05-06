import React from "react";
import Noarticle from "@/components/no_article";
import { CardGetUser } from "@/server_actions/get_user";
import CardList from "./cardList";

export interface Articles {
  title: string | null;
  description: string | null;
  imagePath: string | null;
  createdat: Date;
  id: string;
  userId: string;
}

async function fetchAllArticles() {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article`, {
    cache: "no-store", //SSR
  });
  const data = await res.json();
  return data.articles;
}

export const Card = async () => {
  const articles: Articles[] | null = await fetchAllArticles();
  console.log("articles", articles);

  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Noarticle />
      </div>
    );
  } else {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-12 md:py-16 lg:py-20">
        {articles.map((article) => {
          return <CardList data={article} key={article.id} />;
        })}
        ;
      </section>
    );
  }
};
