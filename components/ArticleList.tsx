import React from "react";
import IArticle from "../models/IArticle";
import Article from "./Article";

interface Props {
  articles: IArticle[];
}

export default function ArticleList({ articles }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 mt-20 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {articles.map((article) => {
        return <Article key={article.id} details={article} />;
      })}
    </div>
  );
}
