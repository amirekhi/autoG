"use client"

import React from 'react'
import { useGettingBlogs } from '@/hook/hooks'
import BlogsCard from './BlogsCard'
import SpinningLoading from '../SpinningLoading'

const DashBlogsWrapper = () => {

  const [ data , loading ] = useGettingBlogs()



  return (
       <div className='w-[90%] mx-auto min-h-[100vh] grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
          {loading == true ? (<div className='w-full h-full col-span-3  text-4xl flex justify-center items-center font-bold'> <SpinningLoading size={16} /> </div>) 
         : (data?.map((blog , index) => (
            <BlogsCard blog={blog}  key={index} />
         )))

         } 
        </div>
  )
}

export default DashBlogsWrapper