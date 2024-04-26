import React from "react";

async function fetchAllArticles() {
  const res = await fetch("http://localhost:3000/api/article", {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.articles;
}

export const Card = async () => {
  const articles = await fetchAllArticles();

  console.log(articles);

  return <div>Card</div>;
};
