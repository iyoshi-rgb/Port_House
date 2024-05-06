import React from "react";
import ArticleDetail from "./components/article_detail";
import { Header } from "@/components/Header";

const Page = ({ params }: { params: { id: string } }) => {
  const id: string = params.id;
  return (
    <div>
      <Header />
      <ArticleDetail id={id} />
    </div>
  );
};

export default Page;
