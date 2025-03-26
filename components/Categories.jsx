'use client'
import React from 'react'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

import { useState , useEffect } from 'react';

import Image from 'next/image';
import { GetCategories } from '@/app/(admin)/Dash/Categories/CategoriesUpload';

const Categories = () => {

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
        slidesToScroll: 4,
        slidesToShow: 4,
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
    <section className='h-[630px] max-lg:h-auto bg-blue-500 w-full grid grid-cols-4 max-md:grid-cols-1' >
       <div className='col-span-1  max-lg:pt-8 h-full text-white flex flex-col justify-center items-start p-4 pl-12 max-2xl:col-span-2'>
        <h3 className='text-4xl font-bold max-w-[85%] max-md:text-2xl 2xl:text-2xl' >The Categories : from BMWs to Porches :</h3>
         <p className='text-xl mt-4 2xl:text-md max-md:text-sm max-w-[85%]' >Browse our cars by category! Whether you’re looking for a luxury sedan, sports car, SUV, or an electric vehicle, we’ve got something for everyone. With our easy-to-use filtering system, you can find the car that suits your preferences in terms of model, year, manufacturer, and fuel type. Explore a variety of categories and find the perfect car for you.</p>
        <Link href={'/Cars'} > <button className='w-[200px] h-[60px] max-md:w-[150px] max-md:h-[40px] mt-16 border-2 border-white hover:bg-white hover:text-black font-bold transition duration-200'  >See More Now</button></Link>
       </div>

       <div className='col-span-3 px-8  h-full pt-8 max-md:grid-cols-1 max-2xl:col-span-2 max-lg:mb-16'>
                <div className='w-full  '>
                    <Slider {...settings}>
                    {Categories?.map((Categorie , index) => (
                            <div className=' pb-12c relative' key={index}>
                            <div className='w-[260px] h-[350px] p-4 flex justify-center items-end  bg-black shadow-blue-900 group shadow-md overflow-hidden  relative mx-auto'>
                                <Image src={Categorie.CategorieImage || '/bgimg.jpg'}  className='w-full h-full object-cover transition duration-[3s] group-hover:scale-125 group-hover:opacity-30  ' fill sizes='100%' alt='brands logo'/>
                                <p className='text-white font-semibold z-30 w-full text-left ' >{Categorie.Describtion}</p>
                            </div>
                        </div>
                        ))}
                    </Slider>
                </div>
         </div>
    </section>
  )
}

export default Categories