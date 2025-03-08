'use client'

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import { DeleteBrand, GetBrands } from '@/app/(admin)/Dash/Brands/BrandActions';


import { AiOutlineClose } from 'react-icons/ai';


const DashBrands = () => {
    const [Brands , setBrands] = useState(null)

     const gettingBrands = async ( ) => {
       const brands = await GetBrands()
       setBrands(brands)
      }

     const handleClick = async  (ImageUrl) => {
     const res = await DeleteBrand(ImageUrl)
     if(res != true){
      alert('brand has been deleted')
      gettingBrands() 
     }
     }



    useEffect(() => {
       gettingBrands()

    }, [])


   

    var settings = {
       
        infinite: true,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
        responsive: [
         
          {
            breakpoint: 580, // screen width less than 480px
            settings: {
              slidesToShow: 1 ,// Show 1 slide
              slidesToScroll:1 
            }
          }
        ]
      };
  return (
    <div className="w-full h-[60vh] flex justify-center items-center flex-col ">
       <h3 className='text-4xl font-semibold  mb-12' >Business Partners</h3>
      <div className='w-[70vw]  mt-6'>
    <Slider {...settings}>
      {Brands?.map((brand , index) => (
        <div className=' p-1 relative' key={index}>
        <div className='w-[300px] h-[150px] max-md:w-[200px] max-md:h-[100px] overflow-hidden bg-gray-500 rounded-md relative mx-auto'>
              <Image src={brand.ImageUrl || '/bgimg.jpg'}  className='w-full h-full object-cover' fill sizes='100%' alt='brands logo'/>
              <button className='absolute top-1 right-1 w-4 h-4 hover:scale-90 duration-200 transition-transform' onClick={ () => { handleClick(brand.ImageUrl)}} ><AiOutlineClose/></button>    
        </div>
      </div>
      ))}
      
      
    </Slider>
    </div>
  </div>
  )
}

export default DashBrands