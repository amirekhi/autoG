import React from 'react'
import Image from 'next/image'


const PECHero = () => {
  return (
    <section className="w-full h-[60vh] max-md:h-[50vh] flex md:justify-end md:pr-14 items-center relative mt-2 justidy-center z-0 ">
      <div className="absolute inset-0 bg-black -z-10 opacity-50" />
      <Image 
        src={'/Contact.jpg'} 
        fill 
        sizes="100%" 
        className="absolute inset-0 object-cover -z-20" 
        alt="bg image" 
      />
      <div className="text-white relative z-10 w-[500px] text-7xl font-semibold max-md:text-center flex justify-end items-center max-md:justify-center  max-md:w-full max-md:text-5xl">
      بگیرید  <span className='text-blue-500' >&nbsp; تماس &nbsp;</span >  با ما 
      </div>
      
  </section>
  
  )
}

export default PECHero