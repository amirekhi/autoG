import React from 'react'
import { FiPhone } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { PEnavLinks } from '@/constants';


const PEFooter = () => {
  return (
    <footer className='w-full h-[60vh] bg-blue-500 text-white relative  max-xl:h-auto py-16  ' >
        <div className='w-[85%] mx-auto grid grid-cols-3 max-xl:grid-cols-1 ' >
          
          <div className='h-[50vh]  flex justify-center  xl:justify-start  items-end flex-col max-xl:items-center  max-xl:h-auto  max-xl:py-16 max-xl:border-b-4 max-xl:border-blue-900' >
            <h3 className='text-4xl font-semibold mb-8  max-xl:mb-4' >صفحات</h3>
            {PEnavLinks.map((nav)=> (
               <p className='text-[#acabab] text-xl list-disc mt-6 xl:mt-3 transition duration-200 hover:scale-110 hover:text-white' key={nav.path} >
               <Link href={nav.path} >{nav.title}</Link> 
            </p>
          
            ))}
           
          </div>
        
          <div className='h-[50vh]  flex justify-center xl:justify-start  items-end flex-col max-xl:items-center  max-xl:h-auto  max-xl:py-16 max-xl:border-b-4  max-xl:border-blue-900 ' >
            <h3 className='text-4xl font-semibold mb-8  max-xl:mb-4' >با ما تماس بگیرید</h3>
            <p className='text-[#acabab] text-lg list-disc mt-6  flex items-center justify-start  flex-row-reverse  max-xl:justify-between gap-6 w-full ' >
               <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center'> : شماره تماس <FiPhone/> </span> 02636553823
            </p>
            <p className='text-[#acabab] text-lg list-disc mt-6  flex items-center justify-start  flex-row-reverse max-xl:justify-between  gap-6 w-full' >
               <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center'>: شماره تماس <FiPhone/>  </span> 02636553823
            </p>
            <p className='text-[#acabab] text-lg list-disc mt-6 flex items-center justify-start flex-row-reverse max-xl:justify-between  gap-6 w-full' >
                <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center ' > : ادرس نمایشگاه <FiMapPin/></span > <span className='max-w-[50%]'>استان البرز  ,  فردیس  ,  جاده ملارد ,  خیابان 51</span>
            </p>
           
          </div>
        
          <div className='h-[50vh]  flex justify-center   xl:justify-start items-end flex-col  max-xl:items-center max-xl:h-auto max-xl:py-16 ' >
            <h3 className='text-4xl font-semibold mb-8 max-md:mb-4 ' >خدمات</h3>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Cars'} >خرید ماشین ؟</Link> 
            </p>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Blogs'} > سوال اداری و حقوقی ؟</Link> 
            </p>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Cars/Hot'} >بهترین ماشین ها ؟</Link> 
            </p>
          </div>
        
         
        </div>
        <div className='absolute bottom-0 right-0 left-0 h-[60px] bg-blue-900 text-center p-6 ' > <span  >All rights Reserved copy &copy;</span> </div>

    </footer>
  )
}

export default PEFooter