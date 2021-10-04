import { GetStaticProps } from "next";
import React from "react";
import ArticleList from "../../components/ArticleList";
import IArticle from "../../models/IArticle";

interface Props {
  articles: IArticle[];
}

export default function Blog({ articles }: Props) {
  return (
    <div>
      <div className="text-2xl font-bold">Blog</div>
      <ArticleList articles={articles} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/articles`);
  const articles = await res.json();
  return {
    props: {
      articles: articles.data,
    },
  };
};
