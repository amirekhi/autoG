"use client";

import { useGettingBlogs } from "@/hook/hooks";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SpinningLoading from "../SpinningLoading";

const BlogContentWrapper = () => {
  const [data, loading] = useGettingBlogs();

  const layoutPatterns = [
    ["col-span-4 row-span-2", "col-span-2 row-span-1", "col-span-2 row-span-1"],
    ["col-span-2 row-span-1", "col-span-2 row-span-1", "col-span-2 row-span-1"],
    ["col-span-2 row-span-1", "col-span-4 row-span-2", "col-span-2 row-span-1"],
  ];

  if (loading) {
    return (
      <section className="w-full min-h-[60vh] flex justify-center items-center">
        <SpinningLoading size={16} />
      </section>
    );
  }

  return (
    <section className="w-full ">
      <div
        className="
          grid grid-cols-6 auto-rows-[minmax(300px,_1fr)] gap-[1px]
          max-md:grid-cols-3 max-md:auto-rows-[minmax(200px,_1fr)]
        "
      >
        {data.map((item, index) => {
          const groupIndex = Math.floor(index / 3);
          const positionInGroup = index % 3;
          const pattern = layoutPatterns[groupIndex % layoutPatterns.length];
          const gridClasses = `${pattern[positionInGroup]} max-md:col-span-3`;

          return (
            <div
              key={index}
              className={`
                ${gridClasses} group relative flex flex-col justify-end
                text-white font-bold overflow-hidden bg-black
                hover:cursor-pointer transition-all duration-700
              `}
            >
              <Image
                src={item.HeroImgUrl || "/bgimg.jpg"}
                alt={item.HeroTitle || "Blog image"}
                fill
                sizes="100%"
                priority={index < 3}
                className="
                  object-cover w-full h-full absolute top-0 left-0
                  transition-transform duration-700 ease-in-out
                  group-hover:scale-110 group-hover:opacity-40
                "
              />

              <div
                className="
                  relative z-10 p-8 max-md:p-4 flex flex-col gap-2
                  backdrop-blur-[1px]
                "
              >
                <h5 className="text-base max-md:text-sm text-gray-200">
                  {item.Headerdescribtion}
                </h5>

                <h4
                  className="
                    text-3xl max-md:text-xl font-extrabold
                    group-hover:opacity-0 transition-opacity duration-500
                  "
                >
                  {item.HeroTitle}
                </h4>

                <p
                  className="
                    text-lg max-md:text-sm font-medium
                    group-hover:opacity-0 transition-opacity duration-500
                  "
                >
                  {item.HeroParag}
                </p>

                <Link href={`/blog/${item.Url}`} className="mt-6">
                  <button
                    className="
                      px-6 py-3 border-2 border-white text-white
                      hover:bg-white hover:text-black
                      transition-all duration-300 rounded-xl
                      max-md:px-3 max-md:py-2 max-md:text-xs
                    "
                  >
                    Show More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogContentWrapper;
