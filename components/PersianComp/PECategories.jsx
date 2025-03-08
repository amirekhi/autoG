'use client'
import React from 'react'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { useState , useEffect } from 'react';

import Image from 'next/image';
import { GetCategories } from '@/app/(admin)/Dash/Categories/CategoriesUpload';

const PECategories = () => {

      const [Categories , setCategories] = useState(null)
      
           const gettingBrands = async ( ) => {
             const Categories = await GetCategories()
             setCategories(Categories)
            }
    
      
      
      
          useEffect(() => {
             gettingBrands()
      
          }, [])

    var settings = {
        infinite: true,
        speed: 900,
        slidesToScroll: 5,
        slidesToShow: 5,
        autoplay: true, // Enable auto-scrolling
        autoplaySpeed: 3000, // Time in milliseconds between each scroll (3 seconds in this case)
        arrows: false,
        
        responsive: [
          {
            breakpoint: 1700, // Screen width less than 580px
            settings: {
              slidesToShow: 4, // Show 1 slide
              slidesToScroll: 4
            }
          },
          {
            breakpoint: 1600, // Screen width less than 580px
            settings: {
              slidesToShow: 3, // Show 1 slide
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 1550, // Screen width less than 580px
            settings: {
              slidesToShow: 2, // Show 1 slide
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 1250, // Screen width less than 580px
            settings: {
              slidesToShow:1 , // Show 1 slide
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <section className='h-[630px] max-md:h-auto bg-blue-500 w-full grid max-md:grid-cols-1 [grid-template-columns:_repeat(4,_1fr)] [direction:rtl]' >
       <div className='col-span-1  max-lg:pt-8 h-full text-white flex flex-col justify-center items-start p-4 pr-12  max-2xl:col-span-2'>
        <h3 className='text-4xl font-bold max-w-[85%] max-md:text-2xl text-right' >   دسته ها : </h3>
         <p className='text-xl max-md:text-sm  mt-4  max-w-[85%]' >با استفاده از دسته‌ بندی‌ ها، خودروهای مورد نظر خود را به راحتی پیدا کنید. ما انواع خودروها را بر اساس مدل، برند، نوع بدنه و ویژگی‌ های فنی دسته‌ بندی کرده‌ایم تا جستجوی شما سریع‌ تر و آسان‌ تر باشد. خودرو مورد علاقه خود را انتخاب کنید و برای یک قرار ملاقات رزرو کنید! </p>
        <Link href={'/Pe/Cars'} > <button className='w-[200px] h-[60px] max-md:w-[150px] max-md:h-[40px] mt-16 border-2 border-white hover:bg-white hover:text-black font-bold transition duration-200'  >دسته های بیشتر</button></Link>
       </div>

       <div className='col-span-3 px-8  h-full pt-8 max-md:grid-cols-1 max-md:mb-16 max-2xl:col-span-2'>
                <div className='w-full  '>
                    <Slider {...settings}>
                    {Categories?.map((Categorie , index) => (
                            <div className=' pb-12c relative' key={index}>
                            <div className='w-[260px] h-[350px] p-4 flex justify-center items-end  bg-black shadow-blue-900 group shadow-md overflow-hidden  relative mx-auto'>
                                <Image src={Categorie.CategorieImage || '/bgimg.jpg'}  className='w-full h-full object-cover transition duration-[3s] group-hover:scale-125 group-hover:opacity-30  ' fill sizes='100%' alt='brands logo'/>
                                <p className='text-white font-semibold z-30 w-full text-right ' >{Categorie.PersianDescribtion || ''}</p>
                            </div>
                        </div>
                        ))}
                    </Slider>
                </div>
         </div>
    </section>
  )
}

export default PECategories