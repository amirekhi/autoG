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
    <section className="w-full">
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
              {/* Background Image */}
              <Image
                src={item.HeroImgUrl || "/bgimg.jpg"}
                alt={item.HeroTitle || "Blog image"}
                fill
                sizes="100%"
                priority={index < 3}
                className="
                  object-cover w-full h-full absolute top-0 left-0
                  transition-transform duration-700 ease-in-out
                  group-hover:scale-110
                "
              />

              {/* Dark Gradient Overlay */}
              <div
                className="
                  absolute inset-0 bg-gradient-to-t
                  from-black/80 via-black/40 to-transparent
                  transition-opacity duration-700
                  group-hover:from-black/60 group-hover:via-black/20
                "
              />

              {/* Content */}
              <div
                className="
                  relative z-10 p-8 max-md:p-4 flex flex-col gap-3
                  translate-y-4 group-hover:translate-y-0
                  transition-transform duration-500
                "
              >
                <h5 className="text-sm max-md:text-xs text-gray-300 tracking-wide">
                  {item.Headerdescribtion}
                </h5>

                <h4
                  className="
                    text-3xl max-md:text-lg font-extrabold leading-tight
                    drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]
                  "
                >
                  {item.HeroTitle}
                </h4>

                <p
                  className="
                    text-lg max-md:text-sm font-medium text-gray-200 line-clamp-2
                  "
                >
                  {item.HeroParag}
                </p>

                <Link href={`/blog/${item.Url}`} className="mt-6">
                  <button
                    className="
                      px-5 py-2.5 bg-white/10 border border-white/40
                      text-white rounded-lg backdrop-blur-sm
                      hover:bg-white hover:text-black
                      transition-all duration-300
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
