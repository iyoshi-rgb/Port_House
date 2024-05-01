import React from "react";
import ArticleForm from "./components/Form";
import { Header } from "@/components/Header";

const Page = () => {
  return (
    <>
      <Header />
      <div className="bg-slate-200">
        <ArticleForm />
      </div>
    </>
  );
};

export default Page;
