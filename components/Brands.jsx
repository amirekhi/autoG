'use client'

import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GetBrands } from '@/app/(admin)/Dash/Brands/BrandActions';
import { useState , useEffect } from 'react';

import Image from 'next/image';

const Brands = () => {
  const [Brands , setBrands] = useState(null)
  
       const gettingBrands = async ( ) => {
         const brands = await GetBrands()
         setBrands(brands)
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
        responsive: [
          {
            breakpoint: 980, // Screen width less than 580px
            settings: {
              slidesToShow: 1, // Show 1 slide
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1490, // Screen width less than 580px
            settings: {
              slidesToShow: 2, // Show 1 slide
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 1780, // Screen width less than 580px
            settings: {
              slidesToShow: 3, // Show 1 slide
              slidesToScroll: 3
            }
          }
        ]
      };
  return (
    <div className="w-full max-md:rounded-xl max-md:w-[95%] mx-auto h-[40vh] flex justify-center my-16 mb-32 items-center flex-col bg-blue-500 ">
       
      <div className='w-[70vw]  py-4'>
    <Slider {...settings}>
      {Brands?.map((brand , index) => (
             <div className=' p-1 relative' key={index}>
             <div className='w-[300px] h-[150px] max-md:w-[250px]  max-md:h-[240px] shadow-blue-900 shadow-md overflow-hidden rounded-md relative mx-auto'>
                   <Image src={brand.ImageUrl || '/bgimg.jpg'}  className='w-full h-full object-cover' fill sizes='100%' alt='brands logo'/>
             </div>
           </div>
           ))}
    </Slider>
    </div>
  </div>
  )
}

export default Brands