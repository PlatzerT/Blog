import { GetStaticProps } from "next";
import React from "react";
import ArticleList from "../../components/ArticleList";
import IArticle from "../../models/IArticle";
import Link from "next/link";

interface Props {
  articles: IArticle[];
}

export default function Blog({ articles }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mt-5">
        <div>
          <div className="text-2xl font-bold text-gray-900">Blog</div>
          <div className="w-8 h-1 mt-1 bg-blue-600 rounded-full"></div>
        </div>
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 transform cursor-pointer hover:text-blue-600 focus:bg-blue-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </div>

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
