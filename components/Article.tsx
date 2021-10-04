import React, { useEffect, useState } from "react";
import IArticle from "../models/IArticle";
import Link from "next/link";
import IUserInfo from "../models/IUserInfo";
import { fetcher, getImage, getUserInfo } from "../utils/externelSources";

interface Props {
  details: IArticle;
}

export default function Article({ details }: Props) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const { status, date_created, user_created, introduction, title, image, id } =
    details;

  useEffect(() => {
    fetcher(getUserInfo(user_created)).then((data) => {
      setUserInfo(data.data);
    });
  }, []);

  return (
    <Link href={`/blog/${id}`}>
      <button className="relative text-left transition-all border-transparent cursor-pointer group">
        <img
          className="object-cover w-full h-[230px]"
          src={getImage(image)}
          alt="Article image"
        />
        <div className="my-5">
          <div className="text-xl font-bold text-gray-900 font-title">
            {title}
          </div>
          <div className="mt-4 overflow-hidden text-gray-500 intro-text overflow-ellipsis">
            {introduction}
          </div>
          <div className="flex items-center mt-8 space-x-2">
            {userInfo.avatar && (
              <div className="border-2 rounded-full border-blue-50 w-9 h-9">
                <img
                  className="object-cover w-full h-full border rounded-full"
                  src={getImage(userInfo.avatar)}
                  alt="Avatar"
                />{" "}
              </div>
            )}

            <div className="">
              <div className="text-sm font-bold text-gray-900">
                {userInfo.first_name} {userInfo.last_name}
              </div>
              <div className="flex-shrink-0 text-xs font-semibold text-blue-400">
                {new Date(date_created).toDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-0 h-1 transition-all duration-300 ease-in-out bg-blue-600 group-hover:w-full group-focus:bg-blue-300 group-focus:w-full group-focus:flex group-hover:flex"></div>
        <style jsx>{`
          .intro-text {
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box !important;
          }
        `}</style>
      </button>
    </Link>
  );
}
