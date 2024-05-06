import React from "react";
import EditForm from "./components/edit_form";
import { Header } from "@/components/Header";

async function fetchArticle(id: string) {
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${Url}/api/article/${id}`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.article;
}

export interface Article {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
  contents: string | null;
  videoPath: string | null;
  imagePath: string | null;
  public: boolean;
  gitUrl: string | null;
  appUrl: string | null;
  createdat: Date;
}

const Page = async ({ params }: { params: { article_id: string } }) => {
  const id: string = params.article_id;
  const article: Article = await fetchArticle(id);

  return (
    <div>
      <Header />
      <EditForm article={article} />
    </div>
  );
};

export default Page;
