import React from 'react'
import { FiPhone } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { navLinks } from '@/constants';


const Footer = () => {
  return (
    <footer className='w-full h-[60vh] bg-blue-500 text-white relative  max-xl:h-auto py-16  ' >
        <div className='w-[85%] mx-auto grid grid-cols-3 max-xl:grid-cols-1 ' >
          
          <div className='h-[50vh]  flex justify-center  md:justify-start  items-start flex-col max-xl:items-center  max-xl:h-auto  max-xl:py-16 max-xl:border-b-4 max-xl:border-blue-900' >
            <h3 className='text-4xl font-semibold mb-8  max-xl:mb-4' >Pages</h3>
            {navLinks.map((nav)=> (
               <p className='text-[#acabab] text-xl list-disc mt-6 xl:mt-3 transition duration-200 hover:scale-110 hover:text-white' key={nav.path} >
               <Link href={nav.path} >{nav.title}</Link> 
            </p>
          
            ))}
           
          </div>
        
          <div className='h-[50vh]  flex justify-center xl:justify-start  items-start flex-col max-xl:items-center  max-xl:h-auto  max-xl:py-16 max-xl:border-b-4  max-xl:border-blue-900 ' >
            <h3 className='text-4xl font-semibold mb-8  max-md:mb-4' >Contact Us</h3>
            <p className='text-[#acabab] text-lg list-disc mt-6  flex items-center justify-start   gap-4 max-xl:justify-between w-full ' >
               <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center'><FiPhone/>  Phone Number :</span> 02636553823
            </p>
            <p className='text-[#acabab] text-lg list-disc mt-6  flex items-center justify-start  gap-4 max-xl:justify-between  w-full' >
               <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center'><FiPhone/>  Phone Number :</span> 02636553823
            </p>
            <p className='text-[#acabab] text-lg list-disc mt-6 flex items-center justify-start gap-4 max-xl:justify-between  w-full' >
                <span className='font-semibild text-xl text-white flex items-center gap-4 justify-center ' ><FiMapPin/>Location :</span > <span className='max-w-[50%]'>Karaj, Fardis, mallard blv ,51st</span>
            </p>
           
          </div>
        
          <div className='h-[50vh]  flex justify-center  xl:justify-start items-start flex-col  max-xl:items-center max-xl:h-auto max-xl:py-16 ' >
            <h3 className='text-4xl font-semibold mb-8 max-xl:mb-4 ' >Services</h3>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Cars'} >Buying Cars ?</Link> 
            </p>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Blogs'} >Reading News ?</Link> 
            </p>
            <p className='text-[#acabab] text-xl list-disc mt-6 transition duration-200 hover:scale-110 hover:text-white'  >
               <Link href={'/Cars/Hot'} >Best Deals ?</Link> 
            </p>
          </div>
        
         
        </div>
        <div className='absolute bottom-0 right-0 left-0 h-[60px] bg-blue-900 text-center p-6 ' > <span  >All rights Reserved copy &copy;</span> </div>

    </footer>
  )
}

export default Footer