"use client"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";


import Image from "next/image";
import Link from "next/link";


import  {  FreeMode, Pagination , Autoplay } from "swiper/modules";
import { useGettingHotCars } from "@/hook/hooks";

import { RxArrowTopRight } from "react-icons/rx";
import SpinningLoading from "./SpinningLoading";


const CardSlider = () => {
  const [Data , loading] = useGettingHotCars()


 
    
    
  return (<>
    {loading ? (<div className="text-3xl w-full h-full flex justify-center items-center"><SpinningLoading size={16}/></div>) 
    : (<div className="flex items-center w-full justify-center  max-md:mt-12 flex-col h-full max-md:h-[400px]  ">
       <Swiper
         breakpoints={{
         
          1500: {
            slidesPerView: 3, // Show 4 slides at a time
            slidesPerGroup: 3, // Group slides into sets of 4 for pagination
            loop: true,
          }, 
          700: {
            slidesPerView: 2, // Show 4 slides at a time
            slidesPerGroup: 2, // Group slides into sets of 4 for pagination
            loop: true,
          },
          0: {
            slidesPerView: 1, // Show 1 slide at a time on smaller screens
            slidesPerGroup: 1, // Group slides individually
            
            loop: true,
          },
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        spaceBetween={15}
        pagination={{
          clickable: true, // Discs will navigate groups of slides
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-[90%] "
      >
        {Data?.map((item ,index) => (
          <SwiperSlide key={index}>
            <Link href={`/Reservation?_id=${item._id}`}>
                <div className="flex flex-col gap-6 mb-20 group relative shadow-xl shadow-blue-400 ml-auto mr-auto text-white rounded-xl px-6 py-8 h-[350px] w-[315px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer ">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                  >
                    <Image src={item.ImageUrls[0]} className='w-full h-full object-cover'  alt={item.EN.model || 'model'}  fill sizes="100%"/>
                    </div>
                  <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                  <div className="relative flex flex-col gap-3">
                    {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
                    <h1 className="text-xl lg:text-2xl">{item.EN.model} </h1>
                    <p className="lg:text-[18px]">{item.describtion} </p>
                  </div>
                  <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper> 
    </div>) }
    </>
  )
}

export default CardSlider