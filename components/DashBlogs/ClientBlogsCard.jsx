"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa';


const ClientBlogsCard = ({blog}) => {


  return (
    <div className='rounded-lg w-[70%] h-[350px] max-lg:w-[90%] mt-20 mx-auto shadow-xl shadow-blue-400  border-2 text-[#696969]  border-gray-400 hover:scale-105 duration-200 transition flex justify-start items-start gap-2 flex-col'>
      <Link href={`/blog/${blog.Url}`} className='block w-full h-[50%]  relative '>
          
                <Image src={  blog.HeroImgUrl || '/bgimg.jpg'} className='w-full h-full object-cover' fill sizes='100%' alt={blog.HeroTitle}/>
            
        </Link> 
        <div className='w-full h-[50%]  relative' >  
            <h2 className='ml-2' ><span className='text-xl font-semibold text-black'>Title : </span>{blog.HeaderTitle}</h2>
            <p className='ml-2 ' >
            <span className="text-xl font-semibold text-black">Description: </span>
            <span className="line-clamp-2 mx-2">{blog.Headerdescribtion}...</span>
            </p>
            <p className='ml-2' ><span className='text-xl font-semibold text-black'>Date : </span>{blog.HeaderPublishedDate}</p>
       <div className='ml-auto w-11 px-4'><FaArrowRight/>  </div>
       </div>  
    </div>
  )
}

export default ClientBlogsCard