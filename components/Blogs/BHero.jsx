import React from 'react'
import Image from 'next/image'

const BHero = () => {
  return (
    <section className="w-full h-[60vh] max-md:h-[50vh] flex justify-start items-center relative mt-2  z-0">
    <div className="absolute inset-0 bg-black -z-10 opacity-50" />
    <Image 
      src={'/Blogs.jpg'} 
      fill 
      sizes="100%" 
      className="absolute inset-0 object-cover -z-20" 
      alt="bg image" 
    />
    <div className="text-white relative z-10 lg:ml-12 w-[40vw] font-semibold max-md:text-center max-md:w-full px-8 ">
      <h1 className='text-6xl  max-md:text-4xl text-shadow-3d-subtle'> <span className='text-blue-500'>Blog </span> Section:</h1>
      <p className='text-2xl mt-12 max-md:text-lg  max-w-[500px]'> In the news <span className='text-blue-500'>blog </span> section, we post the most important and hot car news daily. From introducing the latest luxury car models to market analysis, new technologies, new laws, and everything that matters to you as a car enthusiast.</p>
    </div>
  
  </section>
  
  )
}

export default BHero