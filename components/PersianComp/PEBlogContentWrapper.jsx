"use client";

import { useGettingBlogs } from "@/hook/hooks";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import SpinningLoading from "../SpinningLoading";

const PEBlogContentWrapper = () => {
  const [data, loading] = useGettingBlogs();

  if (loading)
    return (
      <div className="w-full h-[500px] flex justify-center items-center text-4xl font-bold">
        <SpinningLoading size={16} />
      </div>
    );

  return (
    <section className="w-full ">
      <div
        className={`grid grid-cols-6 gap-[1px] auto-rows-[300px] max-md:grid-cols-2 max-md:auto-rows-[220px]`}
      >
        {data.map((item, index) => {
          // layout pattern: big-small-small, small-small-big
          const pattern = index % 6;
          let gridClasses = "col-span-2";

          if (pattern === 0) gridClasses = "col-span-4 row-span-2";
          else if (pattern === 5) gridClasses = "col-span-4 row-span-2";

          return (
            <div
              key={index}
              className={`${gridClasses} relative overflow-hidden group flex flex-col justify-end text-white bg-black`}
            >
              <Image
                src={item.HeroImgUrl || "/bgimg.jpg"}
                alt={item.Headerdescribtion}
                fill
                sizes="100%"
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20"></div>

              <div className="relative z-30 p-8 max-md:p-4">
                <h3 className="text-3xl font-bold mb-2 max-md:text-xl">
                  {item.HeroTitle}
                </h3>
                <p className="text-base font-medium mb-6 max-md:text-sm line-clamp-2">
                  {item.HeroParag}
                </p>
                <Link href={`/blog/${item.Url}`}>
                  <button className="border border-white text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                    Read More
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

export default PEBlogContentWrapper;
