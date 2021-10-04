import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IArticle from "../../models/IArticle";
import IUserInfo from "../../models/IUserInfo";
import { fetcher, getImage, getUserInfo } from "../../utils/externelSources";

interface Props {
  article: IArticle;
}

export default function ArticlePage({ article }: Props) {
  const { status, date_created, text, user_created, title, image, id } =
    article;
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    first_name: "",
    last_name: "",
    avatar: "",
  });

  useEffect(() => {
    fetcher(getUserInfo(user_created)).then((data) => {
      setUserInfo(data.data);
    });
  }, []);

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <Link href="/blog">
        <a className="flex items-center self-start space-x-2 mb-9 font-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <div>Zurück</div>
        </a>
      </Link>
      <img className="object-cover w-full h-[500px]" src={getImage(image)} />
      <div className="flex items-start justify-between my-14">
        <div className="mt-8 text-5xl font-bold text-gray-900 font-title">
          {title}
        </div>
        <div className="flex items-center mt-8 space-x-2">
          {userInfo.avatar && (
            <div className="w-12 h-12 border-2 rounded-full border-gray-50">
              <img
                className="object-cover w-full h-full border rounded-full"
                src={getImage(userInfo.avatar)}
                alt="Avatar"
              />{" "}
            </div>
          )}

          <div className="">
            <div className="font-bold text-gray-900">
              {userInfo.first_name} {userInfo.last_name}
            </div>
            <div className="flex-shrink-0 text-xs font-semibold text-blue-400">
              {new Date(date_created).toDateString()}
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-12 font-medium leading-8 text-gray-600"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/articles`);
  const articles: IArticle[] = await res.json();
  const paths = articles.data.map((article) => ({
    params: { id: article.id.toString() },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/articles`);
  const articles: IArticle[] = await res.json();
  let article = articles.data.find((x) => x.id == params.id);
  return {
    props: {
      article,
    },
  };
};
