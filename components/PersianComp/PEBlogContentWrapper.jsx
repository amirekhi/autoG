"use client"

import { useGettingBlogs } from '@/hook/hooks';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import SpinningLoading from '../SpinningLoading';


const PEBlogContentWrapper = () => {

      const [ data , loading ] = useGettingBlogs()
    
        
     
    
      const gridHeight = `${Math.ceil(data.length / 3) * 600}px`;
  return (
    <section className="w-full  ">
    {loading == true ? (<div className='w-full h-[500px] col-span-3  text-4xl flex justify-center items-center font-bold'><SpinningLoading size={16}/></div>) 
    : ( <>
    <div className='flex justify-center items-center h-[300px] w-full'>
     <h2 className='text-5xl font-semibold text-shadow-3d-subtle  max-md:text-3xl text-center p-8' > اخبار به روز خودرو ها </h2>
    </div>
    
    <div className={`grid grid-cols-6 gap-[1px]  `}  style={{ height: gridHeight }} >
      {data.map((item, index) => {
        // Determine group and position within the group
        const groupIndex = Math.floor(index / 3); // Group index (0 for first 3, 1 for next 3, etc.)
        const positionInGroup = index % 3; // Position in the group (0, 1, or 2)

        // Determine layout styles
        let gridClasses;
        if (groupIndex % 3 === 0) {
          // Normal layout
          if (positionInGroup === 0) {
            gridClasses = 'col-span-4 row-span-2 max-md:col-span-6'; // Large item
          } else {
            gridClasses = 'col-span-2 row-span-1  max-md:col-span-3'; // Smaller items
          }
        } else if (groupIndex % 3 === 2) {
          // Reversed layout
          if (positionInGroup === 0) {
            gridClasses = 'col-span-2 row-span-1 max-md:col-span-3 '; // Smaller items first
          } else if (positionInGroup === 1) {
              gridClasses = 'col-span-4 row-span-2 max-md:col-span-6'; // Large item last
          } else {
            gridClasses = 'col-span-2 row-span-1 max-md:col-span-3'; // Smaller items first
          }
        }else {
          gridClasses = 'col-span-2 row-span-1 max-md:col-span-3'; // Smaller items first
        }

        return (
          <div
            key={index}
            className={`${gridClasses}  group flex items-start justify-end flex-col text-white text-lg font-bold relative  overflow-hidden  bg-black `}
          >
              <Image src={item.HeroImgUrl || '/bgimg.jpg'} className='w-full h-full object-cover  group-hover:opacity-30 z-20  duration-[3s] transition hover:scale-125' fill sizes='100%' alt={item.Headerdescribtion}/>
              <h5 className=' absolute top-[50px] left-[10%]   '>{item.Headerdescribtion}</h5>
              <div className='flex flex-col justify-around items-start p-8 max-md:p-4 z-50 max-md:w-[50%] '>
              <h4 className='text-3xl font-bold mb-1 group-hover:opacity-0  duration-[3s] transition'>{item.HeroTitle}</h4>
              <h4 className='text-lg font-semibold mb-12 group-hover:opacity-0 duration-[3s] transition '>{item.HeroParag}</h4>
            
            
            <Link href={`/blog/${item.Url}`} >
                <button className='w-[140px] h-[60px] border-white border-2 text-white flex justify-center items-center max-md:w-[80px] max-md:h-[40px] max-md:text-xs hover:scale-95 transition duration-200'> Show More</button>          
            </Link>
            
            </div>
          </div>
        );
      })}
    </div> 
    
    </>)}
      
   
   
  </section>
  )
}

export default PEBlogContentWrapper