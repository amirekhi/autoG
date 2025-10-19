import Link from 'next/link'
import React from 'react'

import { contactItems } from '@/constants'





const ContactHero = ( ) => {
  return (
    <div className=" max-md:pb-10  w-[80vw] mx-auto relative mb-20 max-md:h-auto  ">

    

 

       
       

   <div className="  flex justify-center items-center max-md:gap-0 max-md:h-auto h-96  mt-[150px] max-md:mt-[50px] light:text-[#3B3B3B] text-white relative">
          <div className=" w-[50%] max-md:h-96 max-md:w-[95%] h-full">
           <ul className='h-full flex justify-around items-start flex-col w-full '>
                      {contactItems.map((item, index) => (
                        <Link href={item.href} target="_blank" rel="noopener noreferrer" key={index} className='block w-full'>
                        <li  className="flex justify-between  w-full dark:text-[#1c2645] light:text-white bg-[#94b4e6] items-center hover:bg-gradient-to-r from-blue-400 to-blue-600 transition duration-200   hover:shadow-2xl shadow-purple-200 p-4 rounded-2xl ">
                        <span className='font-semibold'>{item.label} : {item.value}</span>
                        <item.icon size={34}   className='text-[#1c2645] '/>
                        </li>
                        </Link>
                      ))}
           </ul>
            
          </div>

        </div>
  </div>
  )
}

export default ContactHero